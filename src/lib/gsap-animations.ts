import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// Track if animations have been initialized to prevent re-initialization
let isInitialized = false;
let isResizing = false;

// Initialize GSAP scroll animations
export const initGSAPScrollAnimations = () => {
    if (typeof window === 'undefined') return () => { };

    try {
        // Prevent multiple initializations
        if (isInitialized) {
            return () => { };
        }

        // Create animations for elements with data-gsap attributes
        const animateElements = () => {
            try {
                // Detect mobile for different settings
                const isMobile = window.innerWidth < 768;
                const startPosition = isMobile ? 'top 100%' : 'top 85%';

                // Query elements once and reuse the arrays
                const fadeInUpElements = gsap.utils.toArray('[data-gsap="fade-in-up"]');
                const fadeInLeftElements = gsap.utils.toArray('[data-gsap="fade-in-left"]');
                const fadeInRightElements = gsap.utils.toArray('[data-gsap="fade-in-right"]');
                const scaleInElements = gsap.utils.toArray('[data-gsap="scale-in"]');

                // Fade in from bottom animation
                (fadeInUpElements as Element[]).forEach((element) => {
                    // Set initial state
                    gsap.set(element, {
                        opacity: 0,
                        y: 50
                    });

                    gsap.to(element, {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: element,
                            start: startPosition,
                            toggleActions: 'play none none none',
                            once: false,
                            fastScrollEnd: true,
                            preventOverlaps: true
                        }
                    });
                });

                // Fade in from left animation
                (fadeInLeftElements as Element[]).forEach((element) => {
                    gsap.set(element, {
                        opacity: 0,
                        x: -50
                    });

                    gsap.to(element, {
                        opacity: 1,
                        x: 0,
                        duration: 0.8,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: element,
                            start: startPosition,
                            toggleActions: 'play none none none',
                            once: false,
                            fastScrollEnd: true,
                            preventOverlaps: true
                        }
                    });
                });

                // Fade in from right animation
                (fadeInRightElements as Element[]).forEach((element) => {
                    gsap.set(element, {
                        opacity: 0,
                        x: 50
                    });

                    gsap.to(element, {
                        opacity: 1,
                        x: 0,
                        duration: 0.8,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: element,
                            start: startPosition,
                            toggleActions: 'play none none none',
                            once: false,
                            fastScrollEnd: true,
                            preventOverlaps: true
                        }
                    });
                });

                // Scale in animation
                (scaleInElements as Element[]).forEach((element) => {
                    gsap.set(element, {
                        opacity: 0,
                        scale: 0.8
                    });

                    gsap.to(element, {
                        opacity: 1,
                        scale: 1,
                        duration: 0.8,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: element,
                            start: startPosition,
                            toggleActions: 'play none none none',
                            once: false,
                            fastScrollEnd: true,
                            preventOverlaps: true
                        }
                    });
                });

                // Mark as initialized
                isInitialized = true;

                // Refresh ScrollTrigger after setup
                ScrollTrigger.refresh();
            } catch (error) {
                console.error('Error animating elements:', error);
            }
        };

        // Initialize animations on load
        animateElements();

        // Optimized resize handler with debouncing
        let resizeTimeout: NodeJS.Timeout;
        const handleResize = () => {
            // Set resizing flag to pause ScrollTrigger updates
            if (!isResizing) {
                isResizing = true;
            }

            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                // Only refresh positions, don't re-animate
                ScrollTrigger.refresh();
                isResizing = false;
            }, 250); // Increased debounce time for smoother resize
        };

        // Listen for resize events
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', handleResize, { passive: true });
        }

        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('resize', handleResize);
                clearTimeout(resizeTimeout);
            }
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            isInitialized = false;
        };
    } catch (error) {
        console.error('Error initializing GSAP:', error);
        return () => { };
    }
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

    // Show content immediately - removed opacity hiding to fix mobile white screen issue
    const showContent = () => {
        document.documentElement.classList.add('loaded');
        document.body.classList.add('loaded');
    };

    // Ensure content is visible immediately
    showContent();

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', showContent);
    } else {
        // Small delay to ensure everything is rendered
        setTimeout(showContent, 50);
    }
};
