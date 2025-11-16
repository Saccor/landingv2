'use client';

import React from 'react';
import Image from 'next/image';

interface OptimizedImageProps {
  src: string; // full or base path (e.g., '/heroimg' or '/image.png')
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  quality?: number;
  fill?: boolean;
  style?: React.CSSProperties;
  fallbackOnly?: boolean;
}

/**
 * Simplified OptimizedImage: uses only the provided file (no AVIF/WebP sources)
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

  return (
    <Image
      src={src} // direct path like '/socialmediademopic.png'
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
