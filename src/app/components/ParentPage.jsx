"use client";

import { useState, useEffect } from "react";
import ProfileSetupPopup from "@/app/components/ProfileSetupPopup";
import MyProfile from "@/app/components/MyProfile";

export default function ParentPage() {
  const [user, setUser] = useState(null); 
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setShowPopup(false);
    }
  }, []);

  const handleProfileSubmit = (userData) => {
    setUser(userData);
    setShowPopup(false); 
    localStorage.setItem("user", JSON.stringify(userData));
  };

  return (
    <>
      {showPopup && <ProfileSetupPopup onSubmit={handleProfileSubmit} />}
      {user && <MyProfile user={user} />}
    </>
  );
}
