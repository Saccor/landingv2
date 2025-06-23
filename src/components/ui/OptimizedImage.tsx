'use client';

import React from 'react';
import Image from 'next/image';

interface OptimizedImageProps {
  src: string; // Base path without extension (e.g., '/heroimg')
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  quality?: number;
  fill?: boolean;
  style?: React.CSSProperties;
}

/**
 * OptimizedImage component that automatically serves the best image format
 * supported by the browser (AVIF > WebP > original PNG/JPG)
 */
export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  sizes,
  priority = false,
  quality = 85,
  fill = false,
  style,
}: OptimizedImageProps) {
  // Remove any existing extension from src
  const baseSrc = src.replace(/\.(png|jpg|jpeg)$/i, '');

  return (
    <picture>
      {/* AVIF - Best compression, modern browsers */}
      <source srcSet={`${baseSrc}.avif`} type="image/avif" />
      
      {/* WebP - Great compression, wide browser support */}
      <source srcSet={`${baseSrc}.webp`} type="image/webp" />
      
      {/* Fallback to original format */}
      <Image
        src={`${baseSrc}.png`} // Default to PNG fallback
        alt={alt}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        fill={fill}
        className={className}
        sizes={sizes}
        priority={priority}
        quality={quality}
        style={style}
      />
    </picture>
  );
} 