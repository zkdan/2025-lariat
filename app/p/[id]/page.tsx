'use client'
import { usePathname } from "next/navigation"
import Image from "next/image";
import { months } from "@/app/utils/calendar";
import { motion } from "framer-motion";

export default function SinglePhoto() {
  const path = usePathname()
  const fileName = path.match(/\/[^/]+\/(.+)/)?.[1];
  const year = path.split('-')[1]
  const month = path.split("-")[0].slice(-2);
  const monthName = months[parseInt(month) - 1]

  const data = `https://storage.googleapis.com/lariat-images/${year}/${fileName}-thumb.JPG`

  return (<div className="m-10">
    {year && fileName ?
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Image
          src={data}
          width={758}
          height={379}
          alt={`Calendar image for ${monthName} ${year}`}
          className="w-full drop-shadow-[35px_35px_35px_rgba(0,0,0,0.5)]"
          style={{ transform: "translate3d(0, 0, 0)" }}
        />
      </motion.div>
      :
      null
    }
  </div>)
}