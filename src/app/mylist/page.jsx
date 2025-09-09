"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

// ✅ Dynamically import Next/Image
const Image = dynamic(() => import("next/image"), { ssr: false });

export default function MyListPage() {
  const [myList, setMyList] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const storedList = JSON.parse(localStorage.getItem("myList")) || [];
      setMyList(storedList);
    } catch (err) {
      console.error("Failed to load list from localStorage:", err);
      setMyList([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const goToMovie = (movie) => {
    if (!movie?.id) return;
    const movieSlug = encodeURIComponent(
      (movie.title || movie.name || "untitled").replace(/\s+/g, "-")
    );
    router.push(`/mylist/${movieSlug}/${movie.id}`);
  };

  const removeFromList = (id) => {
    const updatedList = myList.filter((m) => m.id !== id);
    localStorage.setItem("myList", JSON.stringify(updatedList));
    setMyList(updatedList);
  };

  if (loading) return <p className="empty-text">Loading your list...</p>;
  if (!myList.length) return <p className="empty-text">Your list is empty. Add some movies!</p>;

  return (
    <div className="my-list-page">
      <h1 className="page-title">My List</h1>
      <div className="list-grid">
        {myList.map((movie) => {
          const posterUrl = movie.poster
            ? `https://image.tmdb.org/t/p/w300${movie.poster}`
            : "/placeholder.jpg";

          return (
            <div key={movie.id} className="list-card" onClick={() => goToMovie(movie)}>
              
  {posterUrl && (
    <Image
      src={posterUrl}
      alt={movie.title || "Untitled"}
      className="list-img"
      fill  // ✅ let the external CSS handle size
    />
  )}


              <h3 className="list-title">{movie.title || "Untitled"}</h3>
              <button
                className="remove-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromList(movie.id);
                }}
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
