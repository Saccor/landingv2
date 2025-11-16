import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// Initialize GSAP scroll animations
export const initGSAPScrollAnimations = () => {
    if (typeof window === 'undefined') return;

    // Create animations for elements with data-gsap attributes
    const animateElements = () => {
        // Query elements once and reuse the arrays
        const fadeInUpElements = gsap.utils.toArray('[data-gsap="fade-in-up"]');
        const fadeInLeftElements = gsap.utils.toArray('[data-gsap="fade-in-left"]');
        const fadeInRightElements = gsap.utils.toArray('[data-gsap="fade-in-right"]');
        const scaleInElements = gsap.utils.toArray('[data-gsap="scale-in"]');

        // Set default properties only if elements exist
        if (fadeInUpElements.length > 0) {
            gsap.set(fadeInUpElements, {
                opacity: 0,
                y: 50
            });
        }

        if (fadeInLeftElements.length > 0) {
            gsap.set(fadeInLeftElements, {
                opacity: 0,
                x: -50
            });
        }

        if (fadeInRightElements.length > 0) {
            gsap.set(fadeInRightElements, {
                opacity: 0,
                x: 50
            });
        }

        if (scaleInElements.length > 0) {
            gsap.set(scaleInElements, {
                opacity: 0,
                scale: 0.8
            });
        }

        // Fade in from bottom animation
        fadeInUpElements.forEach((element: any) => {
            gsap.to(element, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: element,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        // Fade in from left animation
        fadeInLeftElements.forEach((element: any) => {
            gsap.to(element, {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: element,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        // Fade in from right animation
        fadeInRightElements.forEach((element: any) => {
            gsap.to(element, {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: element,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        // Scale in animation
        scaleInElements.forEach((element: any) => {
            gsap.to(element, {
                opacity: 1,
                scale: 1,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: element,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            });
        });
    };

    // Initialize animations on load
    animateElements();

    // Re-initialize on route changes (for SPA navigation)
    const handleRouteChange = () => {
        // Small delay to ensure DOM is updated
        setTimeout(() => {
            animateElements();
        }, 100);
    };

    // Listen for route changes (Next.js specific)
    if (typeof window !== 'undefined') {
        window.addEventListener('popstate', handleRouteChange);
    }

    return () => {
        if (typeof window !== 'undefined') {
            window.removeEventListener('popstate', handleRouteChange);
        }
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
};

// Utility function to create staggered animations
export const createStaggeredAnimation = (
    elements: string | Element[],
    options: {
        duration?: number;
        stagger?: number;
        delay?: number;
        ease?: string;
    } = {}
) => {
    const {
        duration = 0.8,
        stagger = 0.1,
        delay = 0,
        ease = 'power2.out'
    } = options;

    return gsap.fromTo(
        elements,
        {
            opacity: 0,
            y: 30
        },
        {
            opacity: 1,
            y: 0,
            duration,
            stagger,
            delay,
            ease,
            scrollTrigger: {
                trigger: typeof elements === 'string' ? elements : elements[0],
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        }
    );
};

// Utility function for simple fade-in animations
export const fadeInUp = (element: Element, delay: number = 0) => {
    return gsap.fromTo(
        element,
        {
            opacity: 0,
            y: 50
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay,
            ease: 'power2.out'
        }
    );
};

// Page transition utilities to prevent flash
export const preventFlash = () => {
    if (typeof window === 'undefined') return;

    // Add CSS to prevent flash
    const style = document.createElement('style');
    style.textContent = `
    html {
      opacity: 0;
      transition: opacity 0.2s ease-out;
    }
    html.loaded {
      opacity: 1 !important;
    }
    body {
      opacity: 0;
      transition: opacity 0.2s ease-out;
    }
    body.loaded {
      opacity: 1 !important;
    }
  `;
    document.head.appendChild(style);

    // Show content after a short delay and after DOM is ready
    const showContent = () => {
        document.documentElement.classList.add('loaded');
        document.body.classList.add('loaded');
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', showContent);
    } else {
        // Small delay to ensure everything is rendered
        setTimeout(showContent, 100);
    }
};
