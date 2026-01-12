'use client'
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowsPointingOutIcon } from "@heroicons/react/24/solid";
import { useLastFilterPage } from "../utils/useLastViewedPhoto";
import { useEffect, useState } from "react";
import { OptimizedImage, getFilteredImagesFast, preloadOtherImages } from "../utils/imageOptimization";

interface GalleryProps {
  filter: string;
  images: OptimizedImage[];
}

export default function Gallery({ filter }: GalleryProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setLastFilter] = useLastFilterPage();
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [missingImages, setMissingImages] = useState<Set<string>>(new Set());
  const filteredImages = getFilteredImagesFast(filter);

  useEffect(() => {
    const timer = setTimeout(() => {
      preloadOtherImages(filter);
    }, 1000);
    return () => clearTimeout(timer);
  }, [filter]);

  const handleImageLoad = (imageId: string) => {
    setLoadedImages(prev => new Set(prev).add(imageId));
  };

  const handleImageError = (imageId: string) => {
    setMissingImages(prev => new Set(prev).add(imageId));
  };

  return (
    <ul className="flex flex-wrap mx-10 md:mx-20 mt-5">
      {filteredImages.map((img, index) => {
        const isPriority = index < 5;

        return (
          <motion.li
            key={img.id}
            className="mb-10 w-[100%] sm:w-[50%] md:w-[25%] group focus:outline-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <p className="capitalize text-gray-600 p-1">{`${img.name} ${img.year}`}</p>
            {missingImages.has(img.id) ? (
              <div className="w-full focus:outline-none relative group cursor-default">
                <div className="image-container relative">
                  <div className="w-full h-full bg-gray-50 flex items-center justify-center ">
                    <p className="text-gray-500 rounded-sm text-sm text-center px-2 border-2 border-dotted border-gray-300 h-full w-full flex items-center justify-center m-2 flex-col">
                      there is no image for
                      <span className="font-bold w-full">{img.name} {img.year}</span>
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                href={`/p/${img.id}`}
                shallow
                className="w-full focus:outline-none relative group"
                onClick={() => {
                  setLastFilter(filter);
                }}
              >
                <div className="image-container relative">
                  <Image
                    alt={`Calendar image for ${img.name.toUpperCase()} ${img.year}`}
                    className={`cursor-zoom-in w-full h-full object-cover focus:outline-none group-focus:grayscale group-hover:grayscale group-focus:brightness-50 group-hover:brightness-50 ${loadedImages.has(img.id) ? 'loaded' : ''
                      }`}
                    style={{ transform: "translate3d(0, 0, 0)" }}
                    src={img.miniUrl}
                    // sizes="(max-width: 640px) 100vw,
                    //   (max-width: 1280px) 50vw,
                    //   (max-width: 1536px) 33vw,
                    //   25vw"
                    loading={isPriority ? "eager" : "lazy"}
                    priority={isPriority}
                    quality={85}
                    fill
                    onLoad={() => handleImageLoad(img.id)}
                    onError={() => handleImageError(img.id)}
                  />
                </div>
                <ArrowsPointingOutIcon
                  className="group absolute top-0 invisible group-focus:visible"
                  height={30}
                  fill='white'
                />
              </Link>
            )}
          </motion.li>
        );
      })}
    </ul>
  )
}