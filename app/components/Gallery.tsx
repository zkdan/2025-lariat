import Image from "next/image";
import Link from "next/link";
import { imageUrls } from "../utils/constructImageUrls";
import Nav from "./Nav";
export default function Gallery({ filter }: { filter: string }) {
  const data = imageUrls.flat().filter(img => img.year === parseInt(filter) || img.name === filter)

  return (
    <>
      <Nav />
      <ul className="flex flex-wrap mx-10 md:mx-20 mt-5 ">
        {data.map(img => {
          return <div key={img.id} className="mb-10  w-[100%] sm:w-[50%] md:w-[25%] ">
            <p className="capitalize text-gray-600  p-1">{`${img.name} ${img.year}`}</p>
            <Link
              href={`/p/${img.id}`}
              shallow
              className="w-full"
            >
              <Image
                alt={`Calendar image for ${img.name} ${img.year}`}
                className="cursor-zoom-in
          w-full"
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
          </div>
        })}

      </ul>
    </>
  )
}