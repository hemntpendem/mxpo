"use client";

import { useParams } from "next/navigation";
import MovieDetail from "@/app/components/MovieDetail";

export default function GenreMovieDetailPage() {
  const { movieId } = useParams(); // grabs movieId from URL

  return <MovieDetail movieId={movieId} />;
}
