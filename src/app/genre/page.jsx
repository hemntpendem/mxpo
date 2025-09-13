"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import dynamic from "next/dynamic";
import Image from "next/image";

// 🔹 Lazy load GenreList
const GenreList = dynamic(() => import("@/app/components/GenreList"), {
  ssr: false, 
  loading: () => <p style={{ color: "#fff" }}>Loading genre...</p>, 
});

const GENRES = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 18, name: "Drama" },
  { id: 14, name: "Fantasy" },
  { id: 27, name: "Horror" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
];

export default function GenrePage() {
  const router = useRouter();
  const [movies, setMovies] = useState({});
  const [loadingGenres, setLoadingGenres] = useState({});
  const [error, setError] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);

  const goToMovie = (genreId, movie) => {
    if (!movie?.id) return;
    const movieSlug = encodeURIComponent(
      (movie.title || movie.name || "untitled").replace(/\s+/g, "-")
    );
    router.push(`/genre/${genreId}/${movieSlug}/${movie.id}`);
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

  useEffect(() => {
    const cached = sessionStorage.getItem("genreMovies");
    if (cached) {
      setMovies(JSON.parse(cached));
      return;
    }

    const fetchAllGenres = async () => {
      const updatedMovies = {};
      await Promise.all(
        GENRES.map(async (genre) => {
          setLoadingGenres((prev) => ({ ...prev, [genre.name]: true }));
          try {
            const res = await fetch(
              `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=${genre.id}&sort_by=popularity.desc&page=1`
            );
            const data = await res.json();
            updatedMovies[genre.name] = data.results ? data.results.slice(0, 10) : [];
          } catch (err) {
            console.error(`Error loading ${genre.name}:`, err);
            setError("Failed to load movies. Please try again later.");
          } finally {
            setLoadingGenres((prev) => ({ ...prev, [genre.name]: false }));
          }
        })
      );
      setMovies(updatedMovies);
      sessionStorage.setItem("genreMovies", JSON.stringify(updatedMovies));
    };

    fetchAllGenres();
  }, []);

  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="genre-page">
      {/* Dropdown UI */}
      <div
        className="genre-header"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        <h1 className="page-title" style={{ color: "#fff" }}>Genres</h1>
        <select
          value={selectedGenre || ""}
          onChange={(e) => setSelectedGenre(e.target.value)}
          style={{
            padding: "10px 40px 10px 14px",
            border: "1px solid #444",
            borderRadius: "8px",
            backgroundColor: "#1f1f1f",
            color: "#fff",
            fontSize: "15px",
            fontWeight: "500",
            cursor: "pointer",
            outline: "none",
            boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
            transition: "all 0.2s ease",
            appearance: "none",
            backgroundImage: `url("data:image/svg+xml;utf8,<svg fill='%23fff' height='12' viewBox='0 0 24 24' width='12' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 12px center",
            backgroundSize: "12px",
          }}
        >
          <option value="">All</option>
          {GENRES.map((genre) => (
            <option key={genre.id} value={genre.name}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      {/* Render either a single GenreList (filtered) or all genres */}
      {selectedGenre ? (
        <GenreList
          genre={GENRES.find((g) => g.name === selectedGenre)}
          movies={movies[selectedGenre]}
          addToList={addToList}
          goToMovie={goToMovie}
        />
      ) : (
        GENRES.map((genre) => {
          const isLoading = loadingGenres[genre.name] || !movies[genre.name];
          return (
            <div key={genre.id} className="genre-section">
              <h2 className="genre-title">{genre.name}</h2>
              <div className="genre-scroll-container">
                {isLoading
                  ? Array.from({ length: 10 }).map((_, i) => (
                      <div key={i} className="genre-movie-card skeleton-card">
                        <div className="skeleton-img" />
                        <div className="skeleton-text" />
                      </div>
                    ))
                  : movies[genre.name].map((movie) => (
                      <div key={movie.id} className="genre-movie-card">
                        <Image
                          src={
                            movie.poster_path
                              ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                              : "/placeholder.jpg"
                          }
                          onClick={() => goToMovie(genre.id, movie)}
                          alt={movie.title || "Untitled"}
                          className="genre-movie-poster"
                          loading="lazy"
                          fill
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
                    ))}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
