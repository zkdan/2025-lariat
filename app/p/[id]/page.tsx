'use client'
import { notFound, usePathname } from "next/navigation"
import Image from "next/image";
import { allYears, months } from "@/app/utils/calendar";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { OptimizedImage } from "@/app/utils/imageOptimization";

export default function SinglePhoto() {
  const path = usePathname()
  const fileName = path.match(/\/[^/]+\/(.+)/)?.[1];

  const isCover = fileName?.startsWith('cover-');
  let year: string;
  let monthName: string;

  if (isCover) {
    year = fileName?.split('-')[1] || '';
    monthName = 'cover';
  } else {
    year = fileName?.split('-')[1] || '';
    const month = fileName?.split("-")[0] || '';
    monthName = months[parseInt(month) - 1];
  }

  const [imageData, setImageData] = useState<OptimizedImage | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  if (!allYears().includes(parseInt(year, 10)) || (!isCover && !months.includes(monthName))) {
    notFound()
  }

  useEffect(() => {
    const loadImageData = async () => {
      try {
        const imageUrl = `https://storage.googleapis.com/lariat-images/${year}/${fileName}-thumb.JPG`;

        setImageData({
          id: fileName || '',
          name: monthName,
          year: parseInt(year, 10),
          miniUrl: `https://storage.googleapis.com/lariat-images/${year}/${fileName}-mini.JPG`,
          medUrl: imageUrl,
          fullUrl: imageUrl,
          width: 600,
          height: 400,
        });
      } catch (error) {
        console.error('Failed to load image data:', error);
      }
    };

    if (year && fileName) {
      loadImageData();
    }
  }, [year, fileName, monthName]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className=" flex justify-center max-h-screen-minus-nav h-screen-minus-nav"
    >
      {imageData ? (
        <div className="relative inline-block max-h-screen-minus-nav h-screen-minus-nav">
          <div className={`absolute md:w-[600px] md:h-[463px]  bg-gray-200 animate-pulse transition-opacity duration-500 ease-in-out ${imageLoaded ? 'opacity-0' : 'opacity-100'}`}>

          </div>
          <Image
            src={imageData.fullUrl}
            width={imageData.width}
            height={imageData.height}
            alt={`Calendar image for ${imageData.name} ${imageData.year}`}
            className={`md:drop-shadow-[25px_25px_35px_rgba(0,0,0,0.5)] transition-opacity duration-500 ease-in-out ${imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            style={{ transform: "translate3d(0, 0, 0)" }}
            priority
            quality={95}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
            onLoad={() => setImageLoaded(true)}
          />
        </div>
      ) : (
        <div className="w-full h-full bg-gray-50 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300">
          <p className="text-gray-500 text-lg text-center">
            There is no image for {monthName}, {year}
          </p>
        </div>
      )}
    </motion.div>
  )
}