'use client'
import { useParams, redirect } from "next/navigation"
import { months, allYears } from '@/app/utils/calendar'
import Gallery from "../components/Gallery"

export default function FilteredImages() {
  const params: { filter: string } = useParams()
  const { filter } = params;
  
  const isYear = allYears().includes(parseInt(filter))
  const isMonth = months.includes(filter)
  const isCover = filter === 'cover'

  if (!isYear && !isMonth && !isCover) {
    redirect('/')
  }

  return <Gallery filter={filter} />
}