'use client'
import { usePathname } from "next/navigation"
import Image from "next/image";
import { months } from "@/app/utils/calendar";

export default function SinglePhoto() {
  const path = usePathname()
  const fileName = path.match(/\/[^/]+\/(.+)/)?.[1];
  const year = path.split('-')[1]
  const month = path.split("-")[0].slice(-2);
  const monthName = months[parseInt(month) - 1]

  const data = `https://storage.googleapis.com/lariat-images/${year}/${fileName}-thumb.JPG`
  return (<div className="m-10">
    {year && fileName ?
      <Image
        src={data}
        width={700}
        height={400}
        alt={`Calendar image for ${monthName} ${year}`}
        className=" w-full drop-shadow-[35px_35px_35px_rgba(0,0,0,0.5)]"
        style={{ transform: "translate3d(0, 0, 0)" }}
        placeholder="blur"
        blurDataURL={'data:image/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='}
      />
      :
      null
    }
  </div>)
}