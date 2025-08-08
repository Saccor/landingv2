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
  fallbackOnly?: boolean; // If true, render only the provided src (no <source> variants)
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
  fallbackOnly = false,
}: OptimizedImageProps) {
  // Remove any existing extension from src
  const baseSrc = src.replace(/\.(png|jpg|jpeg)$/i, '');

  const wrapperStyle: React.CSSProperties | undefined = fill
    ? { position: 'relative', display: 'block', width: '100%', height: '100%', ...style }
    : style;

  if (fallbackOnly) {
    return (
      <Image
        src={`${baseSrc}.png`}
        alt={alt}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        fill={fill}
        className={className}
        sizes={sizes}
        priority={priority}
        quality={quality}
        style={fill ? { objectFit: 'cover', ...style } : style}
      />
    );
  }

  return (
    <picture style={wrapperStyle}>
      <source srcSet={`${baseSrc}.avif`} type="image/avif" />
      <source srcSet={`${baseSrc}.webp`} type="image/webp" />
      <Image
        src={`${baseSrc}.png`}
        alt={alt}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        fill={fill}
        className={className}
        sizes={sizes}
        priority={priority}
        quality={quality}
        style={fill ? { objectFit: 'cover', ...style } : style}
      />
    </picture>
  );
} 