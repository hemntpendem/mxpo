"use client";

import React from "react";


export default function ProfilePage({ user }) {
  if (!user) return null; // Returns null

  const { username, plan, } = user; // We won't render email but can use internally

  return (
    <div className="profile-page">
      <h1 className="profile-title">Account</h1>
      <p className="profile-subtitle">Membership details</p>

      <div className="membership-card">
        <span className="member-since">Member since November 2024</span>
        <div className="member-info">
          <h2 className="username">{username}</h2>
          <p className="plan">{plan.charAt(0).toUpperCase() + plan.slice(1)} plan</p>
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
    </div>
  );
}
