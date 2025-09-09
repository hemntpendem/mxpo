"use client";

import { useState, useEffect } from "react";
import Carousel from "./components/Carousel";
import VerticalGrid from "./components/MultiGenreCarousel"; // adjust path if needed
import ProfileSetupPopup from "@/app/components/ProfileSetupPopup";

export default function HomePage() {
  const [showPopup, setShowPopup] = useState(false);

  // Show popup only if user has not set profile before
  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem("myProfile"));
    if (!savedProfile) {
      setShowPopup(true);
    }
  }, []);

  const handleProfileSubmit = (data) => {
    // Save profile to localStorage
    localStorage.setItem("myProfile", JSON.stringify(data));
    setShowPopup(false);
  };

  return (
    <main className="homepage">
      {showPopup && <ProfileSetupPopup onSubmit={handleProfileSubmit} />}
      <Carousel />
      <VerticalGrid />
    </main>
  );
}
