'use client'
import { useEffect, useRef, useState } from 'react';
import { createIntersectionObserver } from '../utils/imageOptimization';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  blurDataURL: string;
  className?: string;
  priority?: boolean;
  quality?: number;
  sizes?: string;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  blurDataURL,
  className,
  priority = false,
  quality = 85,
  sizes,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority) return;

    const observer = createIntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer?.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '100px' }
    );

    if (imgRef.current && observer) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current && observer) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [priority]);

  return (
    <div ref={imgRef} className={`relative ${className}`}>
      {isInView && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          onLoad={() => setIsLoaded(true)}
          className={`transition-opacity duration-300 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'} ${isLoaded ? '' : 'blur-[10px]'}`}
        />
      )}
      {!isLoaded && (
        <div
          className="absolute inset-0 bg-cover bg-center blur-[10px]"
          style={{
            width,
            height,
            backgroundImage: `url(${blurDataURL})`,
          }}
        />
      )}
    </div>
  );
}
