# Tile Gallery (ph-a8-tiles-gallery)

A responsive tile gallery web app built with Next.js (App Router). This repository contains a tiles showcase with search, featured items, single-tile details, authentication (BetterAuth + MongoDB adapter), and profile management.

Live demo: https://tiles-gallery-peach.vercel.app/

---

## Project purpose

This project implements a tiles gallery to satisfy the A8 assignment requirements: present products, provide search and filtering, implement authentication (email/password and Google), and allow users to update profile information. The UI is built with HeroUI and Tailwind CSS and is responsive for mobile, tablet and desktop.

---

## Key features

- Home page with Banner (Swiper), marquee, and Featured Tiles (top 4).
- All Tiles gallery with search bar and category filters.
- Tile details page with large preview and metadata.
- Authentication: Sign up / Sign in, Google social login hooks, session handling via BetterAuth.
- My Profile and update information form (name + image URL).
- Responsive design (sm / md / lg breakpoints) and mobile-friendly interactions.
- SwiperJS for carousels, Lottie used for decoration (disabled on small screens).

---

## Tech stack

- Next.js (App Router)
- React
- Tailwind CSS
- HeroUI (`@heroui/react`)
- BetterAuth (`better-auth`) + MongoDB adapter
- MongoDB Node driver
- Swiper (`swiper`)
- Lottie (`lottie-react`)
- React Icons (`react-icons`)
- react-fast-marquee

See `package.json` for the full list of dependencies and versions.

---

## Routes (implemented)

- Public:
	- `/` — Home (Banner, Featured, Marquee)
	- `/all-tiles` — Gallery (search + category filters)
	- `/signin` — Login page (assignment may call this `/login`)
	- `/signup` — Register page (assignment may call this `/register`)

- Private (should require authentication):
	- `/all-tiles/[id]` — Tile details (assignment expected `/tile/[id]`)
	- `/my-profile` — My Profile

If the rubric requires exact names (`/login`, `/register`, `/tile/[id]`) I can add route redirects or rename the folders.

---

## JSON data

Tile data is stored in `public/data.json`. Each item follows this schema:

```json
{
	"id": "tile_001",
	"title": "Ceramic Blue Tile",
	"description": "Premium ceramic tile with blue glaze finish",
	"image": "https://...",
	"category": "ceramic",
	"price": 45.99,
	"currency": "USD",
	"dimensions": "60x60 cm",
	"material": "Ceramic",
	"inStock": true,
	"tags": ["blue","minimalist"]
}
```

---

## Authentication details

- Client config: `src/lib/auth-client.js` — used by UI components.
- Server config: `src/lib/auth.js` — BetterAuth initialization with Mongo adapter; uses env vars.
- Signin: `src/app/signin/page.jsx`
- Signup: `src/app/signup/page.jsx`
- My Profile: `src/app/my-profile/page.jsx`
- Update profile: `src/app/my-profile/update-profile/page.jsx`

Notes:
- Google social login requires `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in environment variables.

---

## Environment variables

Create a `.env.local` (do NOT commit this file) with these keys:

- `MONGODB_URI` — MongoDB connection string (required)
- `BETTER_AUTH_SECRET` — secret for BetterAuth (required)
- `BETTER_AUTH_URL` — optional base URL
- `NEXT_PUBLIC_APP_URL` — public app URL used by the client
- `GOOGLE_CLIENT_ID` — (optional) Google OAuth client id
- `GOOGLE_CLIENT_SECRET` — (optional) Google OAuth client secret

I can create a `.env.example` file listing these keys with no values — tell me if you want that.

---

## How to run locally

1. Install dependencies

```bash
npm install
```

2. Start the dev server

```bash
npm run dev
```

3. Build & run production

```bash
npm run build
npm start
```

Open `http://localhost:3000`.

---

## Deployment

- Recommended: Vercel. Configure environment variables in the Vercel project settings.
- Alternative hosts: Render, Fly, or any Node platform supporting Next.js.

---

## Files of interest (quick map)

- `src/app/page.js` — home entry (Banner, FeaturedTiles, WhyChooseTiles)
- `src/components/Banner.jsx` — hero banner (Swiper)
- `src/components/FeaturedTiles.jsx` — featured section
- `src/components/TilesCard.jsx` — tile card used in lists
- `src/app/all-tiles/page.jsx` — gallery page with search
- `src/app/all-tiles/[id]/page.jsx` — tile details
- `src/app/signin/page.jsx` — login UI
- `src/app/signup/page.jsx` — registration UI
- `src/lib/auth.js` — BetterAuth server config (Mongo adapter)
- `src/lib/auth-client.js` — BetterAuth client wrapper used in components

---