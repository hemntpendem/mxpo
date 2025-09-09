"use client";

import { useEffect, useState } from "react";
import { PlayIcon, PlusIcon, ShareIcon } from "@heroicons/react/24/solid";
import { toast } from "react-hot-toast"; 
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export default function MovieDetail({ movieId }) {
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [certification, setCertification] = useState("");
  const [trailerKey, setTrailerKey] = useState("");
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    if (!movieId) return;

    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      try {
        const [movieRes, castRes, certRes, trailerRes] = await Promise.all([
          fetch(
            `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`,
            { signal }
          ),
          fetch(
            `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`,
            { signal }
          ),
          fetch(
            `https://api.themoviedb.org/3/movie/${movieId}/release_dates?api_key=${API_KEY}`,
            { signal }
          ),
          fetch(
            `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`,
            { signal }
          ),
        ]);

        const [movieData, castData, certData, trailerData] = await Promise.all([
          movieRes.json(),
          castRes.json(),
          certRes.json(),
          trailerRes.json(),
        ]);

        setMovie(movieData);
        setCast((castData?.cast || []).slice(0, 5));

        const indiaRelease = certData?.results?.find((r) => r.iso_3166_1 === "IN");
        if (indiaRelease && indiaRelease.release_dates?.length > 0) {
          setCertification(indiaRelease.release_dates[0].certification);
        }

        const trailer = (trailerData?.results || []).find(
          (v) => v.type === "Trailer" && v.site === "YouTube"
        );
        if (trailer) setTrailerKey(trailer.key);
      } catch (err) {
        if (err.name !== "AbortError") console.error("Fetch error:", err);
      }
    };

    fetchData();
    return () => controller.abort();
  }, [movieId]);

  const handleAddToList = () => {
    const existingList = JSON.parse(localStorage.getItem("myList")) || [];
    if (!existingList.find((m) => m.id === movie.id)) {
      existingList.push({
        id: movie.id,
        title: movie.title,
        poster: movie.poster_path,
      });
      localStorage.setItem("myList", JSON.stringify(existingList));
      toast.success(`${movie.title} added to My List!`);
    } else {
      toast.error(`${movie.title} is already in your list.`);
    }
  };

  const handlePlayTrailer = () => {
    if (!trailerKey) {
      toast.error("Trailer not available.");
      return;
    }
    setShowTrailer(true);
  };

  const handleShare = async () => {
    const movieUrl = window.location.href;
    const movieTitle = movie?.title || "Movie";

    if (navigator.share) {
      try {
        await navigator.share({ title: movieTitle, url: movieUrl });
      } catch (err) {
        console.error("Share failed:", err);
      }
    } else {
      navigator.clipboard.writeText(movieUrl);
      toast.success("Link copied to clipboard!");
    }
  };

  if (!movie) return <div className="loading">Loading...</div>;

  return (
    <div className="movie-page">
      {/* Backdrop */}
      <div
        className="movie-backdrop"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie?.backdrop_path || ""})`,
        }}
      >
        <img
          src={`https://image.tmdb.org/t/p/w1280${movie?.backdrop_path || ""}`}
          alt={movie?.title || ""}
          style={{ display: "none" }}
          fill
        />
      </div>

      {/* Poster and buttons */}
      <div className="poster-container">
        <img
          src={
            movie?.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "/placeholder.jpg"
          }
          alt={movie?.title || ""}
          className="movie-poster"
          priority={true}
        />
        <div className="poster-buttons">
          <button className="btn trailer-btn" onClick={handlePlayTrailer}>
            <PlayIcon className="icon" /> Trailer
          </button>
          <button className="btn add-btn" onClick={handleAddToList}>
            <PlusIcon className="icon" /> List
          </button>
          <button className="btn share-btn" onClick={handleShare}>
            <ShareIcon className="icon" /> Share
          </button>
        </div>
      </div>

      {/* Movie info */}
      <div className="movie-content">
        <h1 className="movie-title">{movie.title}</h1>
        <p className="movie-overview">{movie.overview || "No overview available."}</p>
        <p className="movie-info">
          <strong>Release Date:</strong> {movie.release_date || "N/A"} •{" "}
          <strong>Certification:</strong> {certification || "N/A"}
        </p>
        <p className="movie-info">
          <strong>Rating:</strong> {movie.vote_average ?? "N/A"}⭐
        </p>
        <p className="movie-info">
          <strong>Genres:</strong> {movie.genres?.map((g) => g.name).join(", ") || "N/A"}
        </p>
        <p className="movie-info">
          <strong>Top Cast:</strong> {cast?.map((c) => c.name).join(", ") || "N/A"}
        </p>
      </div>

      {/* Trailer modal */}
      {showTrailer && (
        <div className="trailer-modal">
          <div className="trailer-overlay" onClick={() => setShowTrailer(false)}></div>
          <iframe
            width="800"
            height="450"
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
            title="Trailer"
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="trailer-iframe"
          ></iframe>
        </div>
      )}
    </div>
  );
}
