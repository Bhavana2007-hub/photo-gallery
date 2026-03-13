# Lumière — Photo Gallery

A responsive photo gallery web app built with React + Vite + Tailwind CSS.

## Features

- Fetches 30 photos from the Picsum Photos API on load
- Real-time search filter by author name (no extra API calls)
- Favourite/unfavourite photos with heart icon
- Favourites persisted to `localStorage` — survive page refreshes
- Responsive grid: 4 columns (desktop) → 2 (tablet) → 1 (mobile)
- Smooth loading and error states
- Staggered card entrance animations
- Image skeleton loading shimmer

## Tech Stack

- React 18
- Vite 5
- Tailwind CSS 3
- No UI libraries

## Project Setup

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Project Structure

```
src/
├── hooks/
│   ├── useFetchPhotos.js      # Custom hook: fetches photos, returns { photos, loading, error }
│   └── favouritesReducer.js   # Reducer + localStorage initializer for favourites
├── components/
│   ├── Gallery.jsx            # Main component: useReducer, useMemo, useCallback
│   ├── PhotoCard.jsx          # Single photo card with heart toggle
│   ├── SearchBar.jsx          # Search input + favourites toggle button
│   ├── LoadingSpinner.jsx     # Loading state UI
│   └── ErrorMessage.jsx       # Error state UI
├── App.jsx                    # Root: header, main layout, footer
├── main.jsx                   # React DOM entry point
└── index.css                  # Tailwind + custom animations
```

---

## Key Implementation Decisions

### Custom Hook: `useFetchPhotos`
Extracts all data-fetching logic away from the UI. Uses `AbortController` to cancel in-flight requests on unmount. Manually checks `response.ok` because `fetch()` doesn't throw on HTTP errors like 404 or 500.

### `useReducer` for Favourites
Used instead of `useState` because:
- State transitions are explicit named actions (`TOGGLE_FAVOURITE`, `CLEAR_ALL`)
- The reducer is a pure function — easy to test in isolation
- Avoids stale closure bugs that can occur with `useState` inside `useCallback`
- `localStorage` sync happens inside the reducer, keeping it in one place

### `useCallback` on Search Handler
The search handler function is wrapped in `useCallback` so its reference stays stable across renders. Without this, `SearchBar` would receive a new function prop on every render and unnecessarily re-render.

### `useMemo` for Filtered Photos
The filter + search computation is wrapped in `useMemo`. It only re-runs when `photos`, `searchQuery`, `showFavourites`, or `favourites` actually change — not on every render.

---

## VIDEO SCRIPT (5 minutes)

---

### Segment 1 — Show the App Working (~60 sec)

"Here's the app running in the browser. On load, it fetches 30 photos from the Picsum Photos API — you can see the loading spinner while that happens.

Once loaded, the photos are displayed in a responsive 4-column grid on desktop. Each card shows the photo, the author name, and a heart icon.

Let me type in the search bar — watch how the photos filter in real time as I type an author name. No page reload, no extra API call — it's filtering the data we already fetched.

Now let me click a heart to favourite a photo — you can see it turns orange. I'll add a few more. Now let me refresh the page… and the favourites are still there. That's `localStorage` persistence at work.

I can also click the Favourites button at the top right to view only my saved photos."

---

### Segment 2 — Open `useFetchPhotos` Hook (~60 sec)

"Here's my custom hook, `useFetchPhotos`, in `src/hooks/useFetchPhotos.js`.

It uses `useState` to track three things: `photos`, `loading`, and `error`. The fetch runs inside a `useEffect` with an empty dependency array — so it only runs once when the component mounts.

I'm using an `AbortController` here — this lets me cancel the fetch if the component unmounts before the request completes, which prevents memory leaks and state updates on unmounted components.

One important thing: `fetch()` in JavaScript doesn't throw an error on HTTP failures like 404 or 500 — it only throws on network failures. So I manually check `response.ok` and throw my own error if the status isn't 2xx.

The hook returns exactly three things: `photos`, `loading`, and `error`. The `Gallery` component uses this hook and never fetches data directly — keeping data logic and UI logic separated."

---

### Segment 3 — Open `useReducer` Code (~70 sec)

"My favourites state is managed with `useReducer`. Here's the reducer in `favouritesReducer.js`.

It handles two actions. `TOGGLE_FAVOURITE` — if the photo ID is already in the favourites array, it removes it; otherwise it adds it. `CLEAR_ALL` simply resets the array to empty.

The key thing about a reducer: it's a pure function. It takes the current state and an action, and returns a new state. No side effects inside... except I do sync to `localStorage` here in every case, which is intentional — it keeps the persistence logic in one place.

In `Gallery.jsx`, I call `useReducer` like this — passing the reducer, `undefined` as the second arg, and `getInitialFavourites` as a lazy initializer. This lazy initializer reads from `localStorage` once on mount — that's how favourites survive a page refresh.

Why `useReducer` instead of `useState`? Two reasons. First, my state transitions are named and explicit — I can read `dispatch({ type: 'TOGGLE_FAVOURITE', id })` and immediately know what's happening. With `useState`, I'd have to read the setter logic every time. Second, `dispatch` from `useReducer` is always stable — it never changes reference — which makes it safe to pass into `useCallback` without adding it as a dependency."

---

### Segment 4 — `useCallback` and `useMemo` (~70 sec)

"Let me open `Gallery.jsx` where I use both performance hooks.

Here's `useCallback` on the search handler. Every time `Gallery` re-renders — say, because a photo was favourited — React re-creates every function defined inside the component. Without `useCallback`, `handleSearchChange` would be a brand-new function on every render, causing `SearchBar` to receive a new prop and re-render even if nothing search-related changed. `useCallback` memoizes the function and returns the same reference unless its dependencies change. Here the dep array is empty because `setSearchQuery` from `useState` is always stable.

Here's `useMemo` on the filtered photos list. This computation filters the photos array by the favourites flag and the search query string. Without `useMemo`, this runs on every single render — even renders caused by unrelated state changes. With `useMemo`, React only re-runs the filter when `photos`, `searchQuery`, `showFavourites`, or `favourites` actually change. It caches the result in between.

If I removed `useMemo`, the app would still work — but the filter would run unnecessarily. If I removed `useCallback`, `SearchBar` would re-render more than needed. At this scale it's minor, but in a real app with hundreds of photos these optimizations matter."

---

### Segment 5 — Hardest Part (~30 sec)

"The hardest part was getting `useReducer` to work correctly with `localStorage` as a lazy initializer.

My first attempt passed the parsed localStorage value directly as the initial state — but this caused the entire array to be recreated on every render. I learned that `useReducer` accepts a third argument — an initializer function — that runs only once. So I created `getInitialFavourites`, a function that reads and parses localStorage, and passed that as the third argument. After that, the initial state was correctly loaded from localStorage on mount and never recalculated again."

---

*Good luck!*
