'use client'
import Image from "next/image";
import Link from "next/link";
import { imageUrls } from "../utils/constructImageUrls";
import { motion } from "framer-motion";
import { ArrowsPointingOutIcon } from "@heroicons/react/16/solid";
import { useLastFilterPage } from "../utils/useLastViewedPhoto";

export default function Gallery({ filter }: { filter: string }) {
  const [lastFilter, setLastFilter] = useLastFilterPage();

  const data = imageUrls.flat().filter(img => img.year === parseInt(filter) || img.name === filter)


  return (
    <ul
      className="flex flex-wrap mx-10 md:mx-20 mt-5"

    >
      {data.map((img, index) => {
        return <motion.li key={img.id} className="mb-10  w-[100%] sm:w-[50%] md:w-[25%] group focus:outline-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <p className="capitalize text-gray-600  p-1">{`${img.name} ${img.year}`}</p>
          <Link
            href={`/p/${img.id}`}
            shallow
            className="w-full focus:outline-none relative group"
            onClick={() => {
              setLastFilter(filter)
            }}
          >
            <Image
              alt={`Calendar image for ${img.name} ${img.year}`}
              className="cursor-zoom-in w-full pr-2 focus:outline-none group-focus:grayscale group-hover:grayscale group-focus:brightness-50 group-hover:brightness-50"
              style={{ transform: "translate3d(0, 0, 0)" }}
              src={img.miniUrl}
              width={379}
              height={293}
              sizes="(max-width: 640px) 100vw,
                (max-width: 1280px) 50vw,
                (max-width: 1536px) 33vw,
                25vw"
              loading={index < 5 ? "eager" : "lazy"}
            />
            <ArrowsPointingOutIcon className="group absolute top-0 invisible group-focus:visible " height={30} fill='white' />
          </Link>
        </motion.li>
      })}
    </ul>
  )
}