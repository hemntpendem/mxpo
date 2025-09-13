"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function ProfileSetupPopup({ onSubmit }) {
  const pathname = usePathname();
  const [showPopup, setShowPopup] = useState(true);

  // Only appears on homepage
  if (pathname !== "/" || !showPopup) return null;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [plan, setPlan] = useState("basic");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !email) return alert("Fill all fields");
    onSubmit({ username, email, plan });
    setShowPopup(false); // hide after submit
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        {/* Close Button */}
        <button 
          type="button" 
          className="popup-close" 
          onClick={() => setShowPopup(false)}
        >
          ✖
        </button>

        <h2>Setup Your Profile</h2>
        <form onSubmit={handleSubmit}>
          <input value={username} onChange={(e)=>setUsername(e.target.value)} type="text" placeholder="Username" />
          <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Email" />
          <select value={plan} onChange={(e)=>setPlan(e.target.value)}>
            <option value="basic">Basic</option>
            <option value="standard">Standard</option>
            <option value="premium">Premium</option>
          </select>
          <button type="submit" className="popup-save">Save Profile</button>
        </form>
      </div>
    </div>
  );
}
