"use client";

import { useParams } from "next/navigation";
import MovieDetail from "@/app/components/MovieDetail";


export default function SearchMoviePage() {
  const { movieId } = useParams(); // get movieId from URL
  return <MovieDetail movieId={movieId} />; // reuse the component
}
