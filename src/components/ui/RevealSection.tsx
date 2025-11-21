'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type GSAPTween = gsap.core.Tween;

interface GSAPAnimationProps {
  opacity: number;
  y?: number;
  x?: number;
  scale?: number;
}

// Register ScrollTrigger if not already registered
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function RevealSection({
  children,
  className,
  animationType = 'fade-in-up',
  delay = 0
}: {
  children: React.ReactNode;
  className?: string;
  animationType?: 'fade-in-up' | 'fade-in-left' | 'fade-in-right' | 'scale-in';
  delay?: number;
}) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element || typeof window === 'undefined') return;

    let animation: GSAPTween | null = null;
    let fallbackTimeout: NodeJS.Timeout | null = null;

    const createAnimation = () => {
      try {
        // Kill any existing ScrollTrigger for this element
        ScrollTrigger.getAll().forEach(trigger => {
          if (trigger.vars.trigger === element) {
            trigger.kill();
          }
        });

        // Set initial state
        const initialProps: GSAPAnimationProps = { opacity: 0 };

        switch (animationType) {
          case 'fade-in-up':
            initialProps.y = 50;
            break;
          case 'fade-in-left':
            initialProps.x = -50;
            break;
          case 'fade-in-right':
            initialProps.x = 50;
            break;
          case 'scale-in':
            initialProps.scale = 0.8;
            break;
        }

        gsap.set(element, initialProps);

        // Detect mobile devices for different scroll trigger settings
        const isMobile = window.innerWidth < 768;

        // Create scroll trigger animation
        animation = gsap.to(element, {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          duration: 0.8,
          delay,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: element,
            start: isMobile ? 'top 100%' : 'top 85%',
            toggleActions: 'play none none reverse',
            // Add these for better mobile support
            invalidateOnRefresh: true,
            refreshPriority: 0
          }
        });

        // Fallback: Ensure content becomes visible after 3 seconds even if ScrollTrigger fails
        fallbackTimeout = setTimeout(() => {
          if (element && getComputedStyle(element).opacity === '0') {
            gsap.to(element, {
              opacity: 1,
              y: 0,
              x: 0,
              scale: 1,
              duration: 0.5,
              ease: 'power2.out'
            });
          }
        }, 3000);
      } catch (error) {
        // If GSAP fails, ensure content is still visible
        console.error('GSAP animation error:', error);
        if (element) {
          element.style.opacity = '1';
          element.style.transform = 'none';
        }
      }
    };

    createAnimation();

    // Handle window resize to update animation trigger
    const handleResize = () => {
      if (animation) {
        if (animation.scrollTrigger) {
          animation.scrollTrigger.kill();
        }
        animation.kill();
      }
      if (fallbackTimeout) {
        clearTimeout(fallbackTimeout);
      }
      createAnimation();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (fallbackTimeout) {
        clearTimeout(fallbackTimeout);
      }
      if (animation) {
        if (animation.scrollTrigger) {
          animation.scrollTrigger.kill();
        }
        animation.kill();
      }
    };
  }, [animationType, delay]);

  return (
    <section ref={sectionRef} className={className}>
      {children}
    </section>
  );
} 