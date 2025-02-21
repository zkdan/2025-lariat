import { months, allYears } from "./calendar"

export default async function constructImageUrls(){

  const images = allYears().map( (year:number) => {

    const imageObjects =  months.map( (month, index) => {
        const indexAsString = index < 9 ? `0${index+1}` : index+1
        const miniUrl = `https://storage.googleapis.com/lariat-images/${year}/${indexAsString}-${year}-mini.JPG`
        // const img = await getImage(miniUrl)
        return {
        miniUrl,
        // c:img,
        medUrl:`https://storage.googleapis.com/lariat-images/${year}/${indexAsString}-${year}-thumb.JPG`,
        name: month,
        year:year,
        id: `${indexAsString}-${year}`
        // blurUrl: makeBlurUrl(`https://storage.googleapis.com/lariat-images/${year}/${indexAsString}-${year}-mini.JPG`)
      }
    })
    
    imageObjects.unshift({
      miniUrl: `https://storage.googleapis.com/lariat-images/${year}/cover-${year}-mini.JPG`,
      medUrl:`https://storage.googleapis.com/lariat-images/${year}/cover-${year}-thumb.JPG`,
      name: 'cover',
      year: year,
      id: `cover-${year}`
    })
    return imageObjects
  })

  return images
}
export const imageUrls = await constructImageUrls()

export async function getCovers(){
  const thisYear = 2023 
  // || new Date().getFullYear();
  const allYears = [];

  for(let i = 2015; i <= thisYear; i++){
    allYears.push(i)
  }
  const covers = allYears.map( (year) =>  {
  
    return {
      miniUrl: `https://storage.googleapis.com/lariat-images/${year}/cover-${year}-mini.JPG`,
      medUrl:`https://storage.googleapis.com/lariat-images/${year}/cover-${year}-thumb.JPG`,
      name: 'cover',
      year: year,
      id: `cover-${year}`
    }
  })
  return covers
}

export const blurDataURL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQrJyEkKzQ2MC4wNjAwMDYwMDA2MDAwMDAwMDAwMDAwMDAwMDAwMDAwMDA/2wBDAR0XFyAeIBohHiAgJDIlHiUyMiUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSX/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=';
