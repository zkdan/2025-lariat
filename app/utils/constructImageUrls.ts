import { getPlaiceholder } from "plaiceholder";
import { months, allYears } from "./calendar"

async function getImage(url:string){
try {
  const src = url;
 
  const buffer = await fetch(src).then(async (res) =>
    Buffer.from(await res.arrayBuffer())
  );
 
  const { base64 } = await getPlaiceholder(buffer);
 
  return base64
} catch (err) {
  console.error(err)
  return null
}
}

export default async function constructImageUrls(){
  const dataUrlPromises:Promise<string | null>[] = [];

  const images = allYears().map((year:number) => {
    const coverDataPromise = getImage(`https://storage.googleapis.com/lariat-images/${year}/cover-${year}-mini.JPG`);
    dataUrlPromises.push(coverDataPromise)

    const imageObjects =  months.map((month, index) => {
        const indexAsString = index < 9 ? `0${index+1}` : index+1
        const miniUrl = `https://storage.googleapis.com/lariat-images/${year}/${indexAsString}-${year}-mini.JPG`
        dataUrlPromises.push(getImage(miniUrl))
       
        return {
        miniUrl,
        medUrl:`https://storage.googleapis.com/lariat-images/${year}/${indexAsString}-${year}-thumb.JPG`,
        name: month,
        year:year,
        id: `${indexAsString}-${year}`,
      }
    })
    
    imageObjects.push({
      miniUrl: `https://storage.googleapis.com/lariat-images/${year}/cover-${year}-mini.JPG`,
      medUrl:`https://storage.googleapis.com/lariat-images/${year}/cover-${year}-thumb.JPG`,
      name: 'cover',
      year: year,
      id: `cover-${year}`
    })
    return imageObjects
  })
  await Promise.all(dataUrlPromises)
  // console.log(dataUrlPromises)
  // here, go through the resolved promises and stick them into each object in the images array where they go
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