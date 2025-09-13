# MXPO – Movie Explorer Web App  
*A responsive Next.js + Tailwind project to explore, search, and save your favorite movies.*

MXPO is a sleek movie exploration website that delivers detailed information about movies, including titles, genres, cast, ratings, release dates, and trailers.  
It also offers interactive features like “Add to List” and browsing by genre, all optimized for mobile, tablet, and desktop.

---

## Features

-  **Search Movies** – Quickly find movies by title.  
-  **Genre Pages** – Browse movies by genre and navigate seamlessly.  
-  **Movie Details** – View cast, ratings, genres, release date, and trailers.  
-  **Add to List** – Save favorite movies for easy access later.  
-  **Responsive Design** – Works smoothly across desktop, tablet, and mobile devices.  
-  **Fast & Modern** – Built with Next.js and Tailwind for speed and clean UI.

---

## Tech Stack

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)

---

## Live Demo

Check it out live here: [mxpo.vercel.app](https://mxpo.vercel.app)  

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher recommended)  
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)

### Installation

```bash
# Clone the repo
git clone https://github.com/hemntpendem/mxpo.git
cd mxpo

# Install dependencies
npm install
# or
pnpm install

# Run development server
npm run dev
# or
pnpm dev

# Visit the app at
http://localhost:3000
```
---
#Project Srtucture


mxpo/
├── public/              # Static assets (icons, posters, trailers, etc.)
├── src/                 
│   ├── app/             # Next.js App Router pages
│   ├── components/      # Reusable UI components (Navbar, Cards, etc.)
│   ├── styles/          # Tailwind + global styles
│   └── utils/           # Helper functions (API fetchers, config)
│
├── .gitignore
├── package.json
├── next.config.mjs
├── postcss.config.mjs
├── tailwind.config.js
└── README.md

---

#Learnings & Challenges

Mastered Next.js App Router for dynamic navigation.

Implemented API integration to fetch and display real-time movie data.

Used TailwindCSS for fast, responsive design across devices.

Built a persistent Add to List feature for saved movies.

Improved state management and routing in a real-world project scenario.

---

#Contributions and Suggestions are always welcome


Fork the repo

Create a branch (feature/your-feature)

Commit your changes

Push & open a PR
