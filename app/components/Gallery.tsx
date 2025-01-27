import Image from "next/image";
import Link from "next/link";
import { imageUrls } from "../utils/constructImageUrls";

export default function Gallery({filter}:{filter:string}) {
  const data =  imageUrls.flat().filter(img => img.year === parseInt(filter) || img.name === filter)
  
  return (
    <ul className="flex flex-wrap">
        {data.map(img =>{
        return <Link
        key={img.id}
        href={`/?id=${img.id}`}
        shallow
        className="
        cursor-zoom-in
        basis-1/4
        "
      >
        <p>{`${img.name} ${img.year}`}</p>
        <Image
          alt={`Calendar image for ${img.name} ${img.year}`}
          className="transform  brightness-90 transition will-change-auto group-hover:brightness-110 "
          style={{ transform: "translate3d(0, 0, 0)" }}
          placeholder="blur"
          blurDataURL={'data:image/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='}
          src={img.miniUrl}
          width={379}
          height={293}
          sizes="(max-width: 640px) 100vw,
                (max-width: 1280px) 50vw,
                (max-width: 1536px) 33vw,
                25vw"
        />
      </Link>
        })}

      </ul>
  )
}