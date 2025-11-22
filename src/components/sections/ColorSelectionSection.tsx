'use client';

import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import RevealSection from '@/components/ui/RevealSection';
import OptimizedImage from '@/components/ui/OptimizedImage';

const colorImages = {
    black: [
        '/images/Earbud2Black.webp',
        '/images/BlackCaseOption1.webp',
        '/images/Earbud1Black.webp'
    ],
    white: [
        '/images/Earbud2White.webp',
        '/images/WhiteCaseOption1.webp',
        '/images/Earbud1White.webp'
    ]
};

const ColorSelectionSection: React.FC = () => {
    const [selectedColor, setSelectedColor] = useState<'black' | 'white'>('black');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [displayedImage1, setDisplayedImage1] = useState<string>('');
    const [displayedImage2, setDisplayedImage2] = useState<string>('');
    const imageRef1 = useRef<HTMLDivElement>(null);
    const imageRef2 = useRef<HTMLDivElement>(null);
    const prevImageIndexRef = useRef<number>(0);
    const isInitialMountRef = useRef<boolean>(true);
    const activeLayerRef = useRef<1 | 2>(1);
    const autoPlayIntervalRef = useRef<NodeJS.Timeout | null>(null);

    const currentImages = colorImages[selectedColor];

    // Initialize images when color changes
    useEffect(() => {
        const images = colorImages[selectedColor];
        setDisplayedImage1(images[0]);
        setDisplayedImage2(images[1] || images[0]);
        activeLayerRef.current = 1;
        setCurrentImageIndex(0);
        prevImageIndexRef.current = 0;
        isInitialMountRef.current = true;

        // Fade in first image
        if (imageRef1.current) {
            gsap.set(imageRef1.current, { opacity: 1 });
        }
        if (imageRef2.current) {
            gsap.set(imageRef2.current, { opacity: 0 });
        }
    }, [selectedColor]);

    // Smooth fade transition between images
    useEffect(() => {
        const images = colorImages[selectedColor];
        if (images.length <= 1) return;

        // Skip if image index hasn't actually changed or on initial mount
        if (currentImageIndex === prevImageIndexRef.current && !isInitialMountRef.current) {
            return;
        }

        if (isInitialMountRef.current) {
            isInitialMountRef.current = false;
            prevImageIndexRef.current = currentImageIndex;
            return;
        }

        const currentLayer = activeLayerRef.current;
        const nextLayer = currentLayer === 1 ? 2 : 1;
        const currentRef = currentLayer === 1 ? imageRef1 : imageRef2;
        const nextRef = nextLayer === 1 ? imageRef1 : imageRef2;

        if (!currentRef.current || !nextRef.current) return;

        // Update the next layer's image
        const nextImage = images[currentImageIndex];
        if (nextLayer === 1) {
            setDisplayedImage1(nextImage);
        } else {
            setDisplayedImage2(nextImage);
        }

        // Start with next layer invisible
        gsap.set(nextRef.current, { opacity: 0 });

        // Fade out current layer and fade in next layer simultaneously
        const tl = gsap.timeline({
            onComplete: () => {
                activeLayerRef.current = nextLayer;
            }
        });

        tl.to(currentRef.current, {
            opacity: 0,
            duration: 1.2,
            ease: "power2.inOut"
        })
            .to(nextRef.current, {
                opacity: 1,
                duration: 1.2,
                ease: "power2.inOut"
            }, 0); // Start both animations at the same time

        prevImageIndexRef.current = currentImageIndex;
    }, [currentImageIndex, selectedColor]);

    const handleColorSelect = (color: 'black' | 'white') => {
        setSelectedColor(color);
        setCurrentImageIndex(0); // Reset to first image when changing color
    };

    // Navigation functions
    const goToNext = () => {
        const images = colorImages[selectedColor];
        setCurrentImageIndex((prev) => (prev + 1) % images.length);

        // Pause auto-play temporarily after manual navigation
        if (autoPlayIntervalRef.current) {
            clearInterval(autoPlayIntervalRef.current);
            setTimeout(() => {
                if (autoPlayIntervalRef.current) {
                    clearInterval(autoPlayIntervalRef.current);
                }
                const interval = setInterval(() => {
                    setCurrentImageIndex((prev) => (prev + 1) % images.length);
                }, 4000);
                autoPlayIntervalRef.current = interval;
            }, 8000); // Resume auto-play after 8 seconds
        }
    };

    const goToPrevious = () => {
        const images = colorImages[selectedColor];
        setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

        // Pause auto-play temporarily after manual navigation
        if (autoPlayIntervalRef.current) {
            clearInterval(autoPlayIntervalRef.current);
            setTimeout(() => {
                if (autoPlayIntervalRef.current) {
                    clearInterval(autoPlayIntervalRef.current);
                }
                const interval = setInterval(() => {
                    setCurrentImageIndex((prev) => (prev + 1) % images.length);
                }, 4000);
                autoPlayIntervalRef.current = interval;
            }, 8000); // Resume auto-play after 8 seconds
        }
    };

    // Auto-play carousel - change image every 4 seconds
    useEffect(() => {
        // Reset to first image when color changes
        setCurrentImageIndex(0);

        const images = colorImages[selectedColor];
        if (images.length <= 1) return; // Don't auto-play if only one image

        // Clear any existing interval
        if (autoPlayIntervalRef.current) {
            clearInterval(autoPlayIntervalRef.current);
        }

        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % images.length);
        }, 4000); // Change image every 4 seconds

        autoPlayIntervalRef.current = interval;

        return () => {
            clearInterval(interval);
            autoPlayIntervalRef.current = null;
        };
    }, [selectedColor]); // Reset when color changes

    return (
        <RevealSection className="relative w-full flex justify-center bg-gray-50 overflow-hidden">
            <div className="w-full max-w-[1440px] 3xl:max-w-[1920px] 4xl:max-w-[2560px] px-5 md:px-20 lg:px-[124px] 3xl:px-[160px] 4xl:px-[200px] py-[50px] 3xl:py-[60px] 4xl:py-[80px] flex flex-col items-center gap-[50px] 3xl:gap-[60px] 4xl:gap-[80px] mx-auto">
                {/* Main content container */}
                <div className="w-full max-w-[1192px] 3xl:max-w-[1600px] 4xl:max-w-[2160px] flex flex-col md:flex-row items-stretch gap-[40px] md:gap-[60px] 3xl:gap-[80px] 4xl:gap-[100px]">
                    {/* Left side - Image carousel */}
                    <div className="flex-1 rounded-[30px] overflow-hidden relative group" style={{ backgroundColor: '#F6F6F6' }}>
                        {/* Navigation Buttons */}
                        {currentImages.length > 1 && (
                            <>
                                {/* Previous Button */}
                                <button
                                    onClick={goToPrevious}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110 z-10"
                                    aria-label="Previous image"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>

                                {/* Next Button */}
                                <button
                                    onClick={goToNext}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110 z-10"
                                    aria-label="Next image"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </>
                        )}

                        <div className="relative w-full aspect-[719/404]">
                            {/* First image layer */}
                            {displayedImage1 && (
                                <div ref={imageRef1} className="absolute inset-0 opacity-0">
                                    <OptimizedImage
                                        key={`layer1-${displayedImage1}`}
                                        src={displayedImage1}
                                        alt={`${selectedColor} Legacy 1 modular design`}
                                        fill
                                        className="object-contain rounded-[30px]"
                                        sizes="(max-width: 768px) 100vw, 66vw"
                                    />
                                </div>
                            )}
                            {/* Second image layer */}
                            {displayedImage2 && (
                                <div ref={imageRef2} className="absolute inset-0 opacity-0">
                                    <OptimizedImage
                                        key={`layer2-${displayedImage2}`}
                                        src={displayedImage2}
                                        alt={`${selectedColor} Legacy 1 modular design`}
                                        fill
                                        className="object-contain rounded-[30px]"
                                        sizes="(max-width: 768px) 100vw, 66vw"
                                    />
                                </div>
                            )}

                            {/* Visual Dots Indicator (non-interactive) */}
                            {currentImages.length > 1 && (
                                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                                    {currentImages.map((_, index) => (
                                        <div
                                            key={index}
                                            className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${index === currentImageIndex
                                                ? 'bg-white/90'
                                                : 'bg-white/40'
                                                }`}
                                            aria-label={`Image ${index + 1} of ${currentImages.length}`}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right side - Text content */}
                    <div className="flex-1 flex flex-col items-start justify-between">
                        {/* Title */}
                        <div className="w-full flex flex-col items-start gap-[15px]">
                            <h2 className="font-montserrat font-semibold text-[24px] md:text-[30px] lg:text-[36px] 3xl:text-[42px] 4xl:text-[48px] leading-[32px] md:leading-[38px] lg:leading-[44px] 3xl:leading-[52px] 4xl:leading-[60px] text-[#1A1A1A]">
                                Choose Your Color
                            </h2>
                            <p className="font-montserrat font-normal text-[16px] 3xl:text-[18px] 4xl:text-[20px] leading-[24px] 3xl:leading-[28px] 4xl:leading-[30px] text-[#1A1A1A]">
                                Personalize your style. Choose your color and finishes to create earbuds as unique as your sound.
                            </p>
                        </div>

                        {/* Color Selection - positioned at bottom with selected label */}
                        <div className="w-full flex flex-col items-start gap-[12px] mt-8">
                            {/* Selected Version Label */}
                            <div className="flex items-center">
                                <span className="font-montserrat font-normal text-[14px] leading-[20px] text-[#1A1A1A] capitalize">
                                    {selectedColor} version
                                </span>
                            </div>

                            {/* Color Selection Dots */}
                            <div className="flex items-center gap-[12px]">
                                {/* Black Color Dot */}
                                <button
                                    onClick={() => handleColorSelect('black')}
                                    className={`relative w-[33px] h-[34px] rounded-full border transition-all duration-200 ${selectedColor === 'black'
                                        ? 'border-[#1A1A1A] ring-1 ring-[#1A1A1A]/20'
                                        : 'border-gray-300 hover:border-gray-400'
                                        }`}
                                    aria-label="Select black color"
                                >
                                    <div className="w-full h-full rounded-full bg-black"></div>
                                    {selectedColor === 'black' && (
                                        <div className="absolute inset-0 rounded-full border border-white flex items-center justify-center">
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                                                <path d="M20 6L9 17l-5-5" />
                                            </svg>
                                        </div>
                                    )}
                                </button>

                                {/* White Color Dot */}
                                <button
                                    onClick={() => handleColorSelect('white')}
                                    className={`relative w-[33px] h-[34px] rounded-full border transition-all duration-200 ${selectedColor === 'white'
                                        ? 'border-[#1A1A1A] ring-1 ring-[#1A1A1A]/20'
                                        : 'border-gray-300 hover:border-gray-400'
                                        }`}
                                    aria-label="Select white color"
                                >
                                    <div className="w-full h-full rounded-full bg-white border border-gray-200"></div>
                                    {selectedColor === 'white' && (
                                        <div className="absolute inset-0 rounded-full border border-[#1A1A1A] flex items-center justify-center">
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2">
                                                <path d="M20 6L9 17l-5-5" />
                                            </svg>
                                        </div>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </RevealSection>
    );
};

export default ColorSelectionSection;
