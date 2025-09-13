"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Navbar
export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Search", href: "/search" },
    { name: "Genres", href: "/genre" },
    { name: "My List", href: "/mylist" },
    { name: "My Profile", href: "/profile" },
  ];

  const getParentLink = () => {
    const parts = pathname.split("/").filter(Boolean);

    if (pathname === "/") return "Home";
    if (parts[0] === "search") return "Search";
    if (parts[0] === "genre") return "Genres";
    if (parts[0] === "mylist") return "My List";
    if (parts[0] === "movie") return "Home"; // From Homepage
    if (parts[0] === "profile") return "My Profile";

    return null;
  };

  const activeLink = getParentLink();

  return (
    <nav className="navbar">
      <div className="logo">
        <Link href="/">Mx<span className="p">P</span>o</Link>
      </div>
      <ul className="nav-list">
        {navItems.map((item) => {
          const isActive = activeLink === item.name;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`nav-link ${isActive ? "active" : ""}`}
              >
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
