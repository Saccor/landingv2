'use client';

import { useEffect } from 'react';
import { initGSAPScrollAnimations, preventFlash } from '@/lib/gsap-animations';

export default function GSAPInitializer() {
    useEffect(() => {
        // Prevent flash during page transitions
        preventFlash();

        // Initialize GSAP scroll animations
        const cleanup = initGSAPScrollAnimations();

        return cleanup;
    }, []);

    return null;
}
