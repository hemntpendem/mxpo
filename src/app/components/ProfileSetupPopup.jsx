"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast"; 

export default function ProfileSetupPopup({ onSubmit }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Credentials login handler
  const handleCredentialsSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      username,
      email,
      redirect: false,
    });

    setLoading(false);

    if (res?.ok) {
      toast.success("Logged in successfully!"); 
      onSubmit({ username, email });
    } else {
      toast.error(res?.error || "Login failed. Try again.");
      setError(res?.error || "Login failed. Try again.");
    }
  };

  // Google login handler
  const handleGoogleSignIn = async () => {
    const result = await signIn("google", { redirect: false });
    if (result?.ok) {
      toast.success("Google login successful!"); 
      
    } else {
      toast.error("Google login failed."); 
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="popup-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="popup-form"
          initial={{ scale: 0.85, y: 50, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.85, y: 50, opacity: 0 }}
        >
          <h2 className="popup-title">Set up your Profile</h2>

          {error && <div className="popup-error">{error}</div>}

          <form onSubmit={handleCredentialsSubmit} className="popup-form-fields">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="popup-input"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="popup-input"
              required
            />
            <button type="submit" className="popup-btn" disabled={loading}>
              {loading ? "Signing in..." : "Save Profile"}
            </button>
          </form>

          <div className="popup-divider"><b>or</b></div>

          <button onClick={handleGoogleSignIn} className="google-btn">
            Continue with Google
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
