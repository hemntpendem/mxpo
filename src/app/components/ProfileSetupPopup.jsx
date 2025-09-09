"use client";
import { useState } from "react";

//  Resuable Pop Up Form Component
export default function ProfileSetupPopup({ onSubmit }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [plan, setPlan] = useState("basic");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !email) return alert("Fill all fields");
    onSubmit({ username, email, plan });
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>Setup Your Profile</h2>
        {/* pop up form */}
        <form onSubmit={handleSubmit}>
          <input value={username} onChange={(e)=>setUsername(e.target.value)} type="text" placeholder="Username" />
          <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Email" />
          <select value={plan} onChange={(e)=>setPlan(e.target.value)}>
            <option value="basic">Basic</option>
            <option value="standard">Standard</option>
            <option value="premium">Premium</option>
          </select>
          <button type="submit">Save Profile</button>
        </form>
      </div>
    </div>
  );
}
