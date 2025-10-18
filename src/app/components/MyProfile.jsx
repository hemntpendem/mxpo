"use client";

import { useSession, signOut } from "next-auth/react";

export default function ProfilePage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p className="profile-loading">Loading profile...</p>;
  }

  if (!session) {
    return <p className="profile-loading">You are not signed in.</p>;
  }

  const { name: username, email } = session.user;

  return (
    <div className="profile-page">
      <h1 className="profile-title">Account</h1>
      <p className="profile-subtitle">Membership details</p>

      <div className="membership-card">
        <span className="member-since">Member since November 2024</span>
        <div className="member-info">
          <h2 className="username">{username || "User"}</h2>
          {email && <p className="email">{email}</p>}
        </div>
        <button className="manage-btn">Manage membership &rarr;</button>
      </div>

      <div className="quick-links">
        <h3>Quick links</h3>
        <ul>
          {[
            "Change plan",
            "Manage access and devices",
            "Update password",
            "Transfer a profile",
            "Adjust parental controls",
            "Edit settings",
          ].map((link) => (
            <li key={link}>
              <span>{link}</span>
              <span>&rarr;</span>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="signout-btn"
      >
        Sign Out
      </button>
    </div>
  );
}
