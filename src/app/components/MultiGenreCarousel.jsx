"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast"; 

// 5 main genres
const GENRES = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 35, name: "Comedy" },
  { id: 18, name: "Drama" },
  { id: 878, name: "Science Fiction" },
];

export default function MultiGenreCarousel() {
  const [genreItems, setGenreItems] = useState({});
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        // Fetching all 5 genres in parallel - only 5 requests
        const results = await Promise.all(
          GENRES.map(async (genre) => {
            const res = await fetch(
              `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genre.id}&language=en-US&page=1`
            );
            const data = await res.json();
            return { id: genre.id, items: (data.results || []).slice(0, 15) };
          })
        );

        // Build dictionary of genreId → movies
        const mapped = {};
        results.forEach(({ id, items }) => {
          mapped[id] = items;
        });
        setGenreItems(mapped);
      } catch (err) {
        console.error("Genre fetch error:", err);
      }
    };

    fetchGenres();
  }, [API_KEY]);

  return (
    <div className="multi-genre-carousel">
      {GENRES.map((genre) => (
        <GenreRow
          key={genre.id}
          genreName={genre.name}
          genreId={genre.id}
          items={genreItems[genre.id] || []}
        />
      ))}
    </div>
  );
}

function GenreRow({ genreName, genreId, items }) {
  const router = useRouter();

  const handleMovieClick = (movie) => {
    router.push(`/movie/${movie.id}`);
  };

  const addToList = (movie) => {
    const existing = JSON.parse(localStorage.getItem("myList")) || [];
    if (existing.some((m) => m.id === movie.id)) {
      toast.error(`${movie.title || movie.name} is already in your list!`);
      return;
    }
    const newList = [
      ...existing,
      { id: movie.id, title: movie.title || movie.name, poster: movie.poster_path },
    ];
    localStorage.setItem("myList", JSON.stringify(newList));
    toast.success(`${movie.title || movie.name} added to your list!`);
  };

  return (
    <div className="genre-section">
      <h2 className="genre-title">{genreName}</h2>
      <div className="genre-scroll-container">
      {/* Mapping Movie posters and Details thru Tmdb API */}
        {items.length > 0 ? (
          items.map((movie, index) => (
            <div key={index} className="genre-movie-card">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title || movie.name}
                className="genre-movie-poster"
                onClick={() => handleMovieClick(movie)}
              />
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
          ))
        ) : (
          
          <div className="loading-text">Loading...</div> 
        )}
      </div>
    </div>
  );
}
