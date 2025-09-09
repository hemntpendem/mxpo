"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

// ✅ Dynamically import Next/Image
const Image = dynamic(() => import("next/image"), { ssr: false });

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Restore previous search from sessionStorage
  useEffect(() => {
    try {
      const savedQuery = sessionStorage.getItem("searchQuery") || "";
      const savedResults = JSON.parse(
        sessionStorage.getItem("searchResults") || "[]"
      );
      if (savedQuery) setQuery(savedQuery);
      if (savedResults.length) setResults(savedResults);
    } catch (err) {
      console.error("Failed to restore search:", err);
    }
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${
          process.env.NEXT_PUBLIC_TMDB_API_KEY
        }&language=en-US&query=${encodeURIComponent(
          query.trim()
        )}&page=1&include_adult=false`
      );

      if (!res.ok) throw new Error("Failed to fetch results");

      const data = await res.json();
      const newResults = data.results || [];
      setResults(newResults);

      sessionStorage.setItem("searchQuery", query.trim());
      sessionStorage.setItem("searchResults", JSON.stringify(newResults));
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  const goToMovieDetail = (movie) => {
    if (!movie?.id) return;
    const movieSlug = encodeURIComponent(
      (movie.title || "untitled").toLowerCase().replace(/\s+/g, "-")
    );
    router.push(`/search/${movieSlug}/${movie.id}`);
  };

  return (
    <div className="search-page">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies..."
          className="search-input"
        />
        <button type="submit" className="search-button" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {!loading && results.length === 0 && query && (
        <p className="no-results">No movies found for "{query}"</p>
      )}

      <div className="list-grid">
        {results.map((movie) => {
          const posterUrl = movie.poster_path
            ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
            : "";

          return (
            <div
              key={movie.id}
              className="list-card"
              onClick={() => goToMovieDetail(movie)}
            >
              
  {posterUrl && (
    <Image
      src={posterUrl}
      alt={movie.title || "Untitled"}
      className="searchmovie-poster"
      fill
    />
  )}

              <h3 className="list-title">{movie.title || "Untitled"}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}
