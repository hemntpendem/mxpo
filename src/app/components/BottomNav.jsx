"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  HomeIcon, 
  MagnifyingGlassIcon, 
  Squares2X2Icon, 
  ListBulletIcon, 
  UserIcon 
} from "@heroicons/react/24/outline";

// Resusable mobile bottom navbar   
export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/", icon: HomeIcon },
    { name: "Search", href: "/search", icon: MagnifyingGlassIcon },
    { name: "Genres", href: "/genre", icon: Squares2X2Icon },
    { name: "My List", href: "/mylist", icon: ListBulletIcon },
    { name: "Profile", href: "/profile", icon: UserIcon },
  ];

  const getParentLink = () => {
    const parts = pathname.split("/").filter(Boolean);

    if (pathname === "/") return "/";
    if (parts[0] === "search") return "/search";
    if (parts[0] === "genre") return "/genre";
    if (parts[0] === "mylist") return "/mylist";
    if (parts[0] === "movie") return "/"; // From Homepage
    if (parts[0] === "profile") return "/profile";

    return "/";
  };

  const activeHref = getParentLink();

  return (
    <nav className="bottom-navbar">
      {navItems.map(({ name, href, icon: Icon }) => {
        const isActive = activeHref === href;
        return (
          <Link
            key={href}
            href={href}
            className={`bottom-link ${isActive ? "active" : ""}`}
          >
            <Icon className="w-6 h-6 mb-1" />
            <span className="label">{name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
