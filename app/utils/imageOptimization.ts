import { months, allYears } from "./calendar";

export interface OptimizedImage {
  id: string;
  name: string;
  year: number;
  miniUrl: string;
  medUrl: string;
  fullUrl: string;
  width: number;
  height: number;
}

// Get filtered images without blur placeholders for fast initial load
export function getFilteredImagesFast(filter: string): OptimizedImage[] {
  const images: OptimizedImage[] = [];
  
  if (filter === 'cover') {
    // Show all cover images
    for (const year of allYears()) {
      images.push({
        id: `cover-${year}`,
        name: 'cover',
        year: year,
        miniUrl: `https://storage.googleapis.com/lariat-images/${year}/cover-${year}-mini.JPG`,
        medUrl: `https://storage.googleapis.com/lariat-images/${year}/cover-${year}-thumb.JPG`,
        fullUrl: `https://storage.googleapis.com/lariat-images/${year}/cover-${year}-thumb.JPG`,
        width: 300,
        height: 200,
      });
    }
  } else if (months.includes(filter)) {
    // Show specific month across all years
    const monthIndex = months.indexOf(filter);
    const indexAsString = String(monthIndex + 1).padStart(2, '0');
    
    for (const year of allYears()) {
      images.push({
        id: `${indexAsString}-${year}`,
        name: filter,
        year: year,
        miniUrl: `https://storage.googleapis.com/lariat-images/${year}/${indexAsString}-${year}-mini.JPG`,
        medUrl: `https://storage.googleapis.com/lariat-images/${year}/${indexAsString}-${year}-thumb.JPG`,
        fullUrl: `https://storage.googleapis.com/lariat-images/${year}/${indexAsString}-${year}-thumb.JPG`,
        width: 300,
        height: 200,
      });
    }
  } else {
    // Show specific year
    const year = parseInt(filter, 10);
    if (allYears().includes(year)) {
      // Add cover image
      images.push({
        id: `cover-${year}`,
        name: 'cover',
        year: year,
        miniUrl: `https://storage.googleapis.com/lariat-images/${year}/cover-${year}-mini.JPG`,
        medUrl: `https://storage.googleapis.com/lariat-images/${year}/cover-${year}-thumb.JPG`,
        fullUrl: `https://storage.googleapis.com/lariat-images/${year}/cover-${year}-thumb.JPG`,
        width: 300,
        height: 200,
      });

      // Add monthly images
      for (let monthIndex = 0; monthIndex < months.length; monthIndex++) {
        const month = months[monthIndex];
        const indexAsString = String(monthIndex + 1).padStart(2, '0');
        
        images.push({
          id: `${indexAsString}-${year}`,
          name: month,
          year: year,
          miniUrl: `https://storage.googleapis.com/lariat-images/${year}/${indexAsString}-${year}-mini.JPG`,
          medUrl: `https://storage.googleapis.com/lariat-images/${year}/${indexAsString}-${year}-thumb.JPG`,
          fullUrl: `https://storage.googleapis.com/lariat-images/${year}/${indexAsString}-${year}-thumb.JPG`,
          width: 300,
          height: 200,
        });
      }
    }
  }
  
  return images;
}

// Background preload function for non-filtered images
export function preloadOtherImages(currentFilter: string): void {
  // Get all possible images
  const allImages: OptimizedImage[] = [];
  
  // Add all years
  for (const year of allYears()) {
    if (String(year) !== currentFilter) {
      // Cover images
      allImages.push({
        id: `cover-${year}`,
        name: 'cover',
        year: year,
        miniUrl: `https://storage.googleapis.com/lariat-images/${year}/cover-${year}-mini.JPG`,
        medUrl: `https://storage.googleapis.com/lariat-images/${year}/cover-${year}-thumb.JPG`,
        fullUrl: `https://storage.googleapis.com/lariat-images/${year}/cover-${year}-thumb.JPG`,
        width: 300,
        height: 200,
      });
      
      // Monthly images
      for (let monthIndex = 0; monthIndex < months.length; monthIndex++) {
        const month = months[monthIndex];
        const indexAsString = String(monthIndex + 1).padStart(2, '0');
        
        allImages.push({
          id: `${indexAsString}-${year}`,
          name: month,
          year: year,
          miniUrl: `https://storage.googleapis.com/lariat-images/${year}/${indexAsString}-${year}-mini.JPG`,
          medUrl: `https://storage.googleapis.com/lariat-images/${year}/${indexAsString}-${year}-thumb.JPG`,
          fullUrl: `https://storage.googleapis.com/lariat-images/${year}/${indexAsString}-${year}-thumb.JPG`,
          width: 300,
          height: 200,
        });
      }
    }
  }
  
  // Add month filters if not current filter
  if (currentFilter !== 'cover') {
    for (const month of months) {
      if (month !== currentFilter) {
        const monthImages = getFilteredImagesFast(month);
        allImages.push(...monthImages);
      }
    }
  }
  
  // Preload images in batches
  const batchSize = 5;
  for (let i = 0; i < allImages.length; i += batchSize) {
    setTimeout(() => {
      const batch = allImages.slice(i, i + batchSize);
      batch.forEach(img => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = img.miniUrl;
        document.head.appendChild(link);
      });
    }, i * 100); // Stagger the batches
  }
}

// Generate responsive image URLs for different screen sizes
export function getResponsiveImageUrls(baseUrl: string): {
  mobile: string;
  tablet: string;
  desktop: string;
  full: string;
} {
  const basePath = baseUrl.replace('-mini.JPG', '').replace('-thumb.JPG', '');
  
  return {
    mobile: `${basePath}-mini.JPG`, // Smallest for mobile
    tablet: `${basePath}-thumb.JPG`, // Medium for tablet
    desktop: `${basePath}-thumb.JPG`, // Same as tablet for desktop grid
    full: `${basePath}-thumb.JPG`, // Full resolution for lightbox
  };
}

// Get images filtered by year or month (legacy function - kept for compatibility)
export function getFilteredImages(images: OptimizedImage[], filter: string): OptimizedImage[] {
  const yearFilter = allYears().map(year => year.toString()).includes(filter);
  const monthFilter = months.includes(filter);
  const coverFilter = filter === 'cover';

  if (!images || images.length === 0)  {
    return [];
  }

  if (yearFilter) {
    return images.filter(img => img.year === parseInt(filter));
  } else if (monthFilter) {
    return images.filter(img => img.name === filter);
  } else if (coverFilter) {
    return images.filter(img => img.name === 'cover');
  }

  return images;
}

// Preload images for better performance
export function preloadImages(imageUrls: string[]): void {
  if (typeof window === 'undefined') return;
  
  imageUrls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;
    document.head.appendChild(link);
  });
}

// Get priority images for preloading (first 3-5 images)
export function getPriorityImages(images: OptimizedImage[], count: number = 5): OptimizedImage[] {
  return images.slice(0, count);
}

// Intersection Observer for lazy loading optimization
export function createIntersectionObserver(
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit = {}
): IntersectionObserver | null {
  if (typeof window === 'undefined') return null;
  
  return new IntersectionObserver(callback, {
    rootMargin: '50px',
    threshold: 0.1,
    ...options,
  });
}