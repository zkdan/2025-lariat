import { months, allYears } from "./calendar";


export async function getBase64(url:string){
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch image: ${response.statusText}`);
  }
  const buffer = await response.arrayBuffer(); 
  const base64 = Buffer.from(buffer).toString('base64'); 

  const mimeType = response.headers.get('Content-Type') || 'image/jpeg';
  return `data:${mimeType};base64,${base64}`;
}

export default async function constructImageUrls() {
  const images = allYears().map( (year: number) => {
    const imageObjects = months.map( (month, index) => {
      const indexAsString = index < 9 ? `0${index + 1}` : index + 1;
      const miniUrl = `https://storage.googleapis.com/lariat-images/${year}/${indexAsString}-${year}-mini.JPG`;
      // const img = await getImage(miniUrl)
      return {
        miniUrl,
        // c:img,
        medUrl: `https://storage.googleapis.com/lariat-images/${year}/${indexAsString}-${year}-thumb.JPG`,
        name: month,
        year: year,
        id: `${indexAsString}-${year}`,
        // dataUrl:getBase64(`https://storage.googleapis.com/lariat-images/${year}/${indexAsString}-${year}-mini.JPG`)
      };
    });

    imageObjects.unshift({
      miniUrl: `https://storage.googleapis.com/lariat-images/${year}/cover-${year}-mini.JPG`,
      medUrl: `https://storage.googleapis.com/lariat-images/${year}/cover-${year}-thumb.JPG`,
      name: "cover",
      year: year,
      id: `cover-${year}`,
      // dataUrl: await getBase64(`https://storage.googleapis.com/lariat-images/${year}/cover-${year}-mini.JPG`)
    });
    return imageObjects;
  });

  return images;
}
export const imageUrls = await constructImageUrls();

export async function getCovers() {
  const thisYear = 2023;
  // || new Date().getFullYear();
  const allYears = [];

  for (let i = 2015; i <= thisYear; i++) {
    allYears.push(i);
  }
  const covers = allYears.map((year) => {
    return {
      miniUrl: `https://storage.googleapis.com/lariat-images/${year}/cover-${year}-mini.JPG`,
      medUrl: `https://storage.googleapis.com/lariat-images/${year}/cover-${year}-thumb.JPG`,
      name: "cover",
      year: year,
      id: `cover-${year}`,
      // dataUrl:getBase64(`https://storage.googleapis.com/lariat-images/${year}/cover-${year}-mini.JPG`)
    };
  });
  return covers;
}
