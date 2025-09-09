"use client";

import Image from "next/image";

export default function GenreList({ genre, movies, addToList, goToMovie }) {
  if (!movies || movies.length === 0) {
    return <p>No movies found for {genre.name}</p>;
  }

  return (
    <div className="genrelist-page">
      <h2 className="genre-title">{genre.name}</h2>

      <div className="list-grid">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="list-card"
            onClick={() => goToMovie(genre.id, movie)}
          >
            <Image
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                  : "/placeholder.jpg"
              }
              alt={movie.title || "Untitled"}
              className="list-img"
              fill
            />
            <h3 className="list-title">{movie.title || movie.name}</h3>
            <button
              className="genre-add-btn"
              onClick={(e) => {
                e.stopPropagation();
                addToList(movie);
              }}
            >
              + List
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
