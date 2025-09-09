"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { PlusIcon } from "@heroicons/react/24/solid";
import { toast } from "react-hot-toast"; 

const API_URL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

// Homepage Hero  Carousel Componnet 

export default function HomeCarousel() {
  const router = useRouter();
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(1);
  const trackRef = useRef(null);
  const startX = useRef(0);
  const isDragging = useRef(false);

  // Fetch slides
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        const movieSlides = (data.results || [])
          .slice(0, 7)
          .map((movie) => ({
            id: movie.id,
            title: movie.title,
            poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            backdrop: IMAGE_BASE + movie.backdrop_path,
            rating: movie.vote_average,
            overview: movie.overview,
            runtime: movie.runtime || 120,
            genre: movie.genre_ids || [],
          }));
        setSlides(movieSlides);

        // Preload images
        movieSlides.forEach((slide) => {
          const img = new Image();
          img.src = slide.backdrop;
        });
      } catch (err) {
        console.error("Error fetching slides:", err);
      }
    };
    fetchSlides();
  }, []);

  // Auto-slide
  useEffect(() => {
    if (!slides.length) return;
    const interval = setInterval(() => setCurrent((prev) => prev + 1), 5000);
    return () => clearInterval(interval);
  }, [slides]);

  // Infinite loop handling
  useEffect(() => {
    if (!slides.length) return;
    const handleTransitionEnd = () => {
      if (!trackRef.current) return;
      if (current === 0) {
        trackRef.current.style.transition = "none";
        setCurrent(slides.length);
        setTimeout(() => (trackRef.current.style.transition = "transform 0.5s ease-in-out"), 50);
      } else if (current === slides.length + 1) {
        trackRef.current.style.transition = "none";
        setCurrent(1);
        setTimeout(() => (trackRef.current.style.transition = "transform 0.5s ease-in-out"), 50);
      }
    };
    const trackNode = trackRef.current;
    trackNode.addEventListener("transitionend", handleTransitionEnd);
    return () => trackNode.removeEventListener("transitionend", handleTransitionEnd);
  }, [current, slides]);

  const nextSlide = () => setCurrent((prev) => prev + 1);
  const prevSlide = () => setCurrent((prev) => prev - 1);

  const handleStart = (clientX) => {
    startX.current = clientX;
    isDragging.current = true;
  };

  const handleEnd = (clientX) => {
    if (!isDragging.current) return;
    const diff = clientX - startX.current;
    if (diff > 50) prevSlide();
    else if (diff < -50) nextSlide();
    isDragging.current = false;
  };

  const handleClick = (movie) => {
    router.push(`/movie/${movie.id}`);
  };

  const addToList = (movie) => {
    const existing = JSON.parse(localStorage.getItem("myList")) || [];
    if (existing.some((m) => m.id === movie.id)) {
      toast.error(`${movie.title} is already in your list!`);
      return;
    }
    const newList = [...existing, { id: movie.id, title: movie.title, poster: movie.poster }];
    localStorage.setItem("myList", JSON.stringify(newList));
    toast.success(`${movie.title} added to your list!`);
  };

  const allSlides = slides.length ? [slides[slides.length - 1], ...slides, slides[0]] : [];

  return (
    <section
      className="carousel-container"
      onMouseDown={(e) => handleStart(e.clientX)}
      onMouseUp={(e) => handleEnd(e.clientX)}
      onTouchStart={(e) => handleStart(e.touches[0].clientX)}
      onTouchEnd={(e) => handleEnd(e.changedTouches[0].clientX)}
    >
      {!slides.length ? (
        <div className="loading">Loading...</div>
      ) : (
        <div
          className="carousel-track"
          ref={trackRef}
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {allSlides.map((slide, index) => (
            <div key={index} className="carousel-slide" onClick={() => handleClick(slide)}>
              <img src={slide.backdrop} alt={slide.title} className="carousel-img" />
              <div className="carousel-overlay">
                <h2 className="carousel-title">{slide.title}</h2>
                <p className="carousel-info">
                  ⭐ {slide.rating} • {slide.runtime} min • {slide.genre.join(", ")}
                </p>
                <p className="carousel-overview">{slide.overview}</p>
                <div className="carousel-buttons">
                  <button
                    className="btn-view"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClick(slide);
                    }}
                  >
                    View Details
                  </button>
                  <button
                    className="btn-list"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToList(slide);
                    }}
                  >
                    <PlusIcon className="icon" /> List
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
