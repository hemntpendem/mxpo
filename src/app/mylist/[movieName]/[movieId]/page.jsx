"use client";

import { useParams } from "next/navigation";
import MovieDetail from "@/app/components/MovieDetail";

export default function MyListMovieDetailPage() {
  const { movieId } = useParams();

  return <MovieDetail movieId={movieId} />;
}
