"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useSession, signIn } from "next-auth/react";
import ProfileSetupPopup from "@/app/components/ProfileSetupPopup";
import VerticalGrid from "./components/MultiGenreCarousel"; // adjust path

// ✅ Dynamic import for HomeCarousel (no SSR)
const HomeCarousel = dynamic(() => import("./components/HomeCarousel"), {
  ssr: false,
  loading: () => <div className="loading">Loading carousel...</div>,
});

export default function HomePage() {
  const { data: session, status } = useSession();
  const [showPopup, setShowPopup] = useState(false);

  // Show popup if user not logged in or has no profile
  useEffect(() => {
    if (status === "authenticated") {
      // Optional: check if session.user.name exists; if not, show popup to complete profile
      if (!session.user.name) {
        setShowPopup(true);
      }
    } else if (status === "unauthenticated") {
      setShowPopup(true);
    }
  }, [status, session]);

  const handleProfileSubmit = (data) => {
    // Optional: update session with credentials (localStorage fallback)
    setShowPopup(false);
  };

  if (status === "loading") {
    return <div className="loading">Checking session...</div>;
  }

  return (
    <main className="homepage">
      {/* Show profile popup if needed */}
      {showPopup && <ProfileSetupPopup onSubmit={handleProfileSubmit} />}

      {/* Carousel + VerticalGrid */}
      <HomeCarousel />
      <VerticalGrid />

      {/* Optional: prompt to sign in if not authenticated */}
      {!session && !showPopup && (
        <div className="login-prompt">
          <button onClick={() => signIn()}>Sign in / Sign up</button>
        </div>
      )}
    </main>
  );
}
