import { useReducer, useState, useCallback, useMemo } from 'react'
import { useFetchPhotos } from '../hooks/useFetchPhotos'
import { favouritesReducer, getInitialFavourites } from '../hooks/favouritesReducer'
import PhotoCard from './PhotoCard'
import SearchBar from './SearchBar'
import LoadingSpinner from './LoadingSpinner'
import ErrorMessage from './ErrorMessage'

export default function Gallery() {
  // ── Data fetching via custom hook ──────────────────────────────────────────
  const { photos, loading, error } = useFetchPhotos()

  // ── Favourites state via useReducer ────────────────────────────────────────
  // useReducer is used here instead of useState because:
  // 1. State transitions are explicit and named actions
  // 2. The reducer is a pure function — easy to test and reason about
  // 3. Avoids stale closure issues when toggling inside callbacks
  const [favourites, dispatch] = useReducer(
    favouritesReducer,
    undefined,          // initial state arg (unused — we use initializer fn)
    getInitialFavourites  // lazy initializer: reads localStorage once on mount
  )

  // ── Local UI state ─────────────────────────────────────────────────────────
  const [searchQuery, setSearchQuery] = useState('')
  const [showFavourites, setShowFavourites] = useState(false)

  // ── useCallback: memoize the search handler ────────────────────────────────
  // Without useCallback, a new function reference is created on every render.
  // SearchBar would re-render unnecessarily even when photos/favourites change.
  // useCallback returns the same function reference unless its deps change.
  const handleSearchChange = useCallback((value) => {
    setSearchQuery(value)
    // If user starts searching while in favourites view, exit favourites view
    if (value) setShowFavourites(false)
  }, []) // No dependencies — setSearchQuery is stable from React

  // ── useCallback: memoize the favourite toggle ──────────────────────────────
  const handleToggleFavourite = useCallback((id) => {
    dispatch({ type: 'TOGGLE_FAVOURITE', id })
  }, []) // dispatch from useReducer is always stable

  // ── useMemo: compute filtered list only when inputs change ─────────────────
  // Without useMemo, this filter runs on EVERY render — including unrelated
  // re-renders. With 30 photos and string matching, it's lightweight but the
  // principle matters: derived data should only recompute when its inputs change.
  const filteredPhotos = useMemo(() => {
    let result = photos

    // Apply favourites filter
    if (showFavourites) {
      result = result.filter(photo => favourites.includes(photo.id))
    }

    // Apply search filter (case-insensitive author name match)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim()
      result = result.filter(photo =>
        String(photo.author).toLowerCase().includes(query)
      )
    }

    return result
  }, [photos, searchQuery, showFavourites, favourites])
  // ↑ Only re-runs when one of these four values actually changes

  // ── Render states ──────────────────────────────────────────────────────────
  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error} />

  return (
    <div>
      {/* Search + filter bar */}
      <SearchBar
        value={searchQuery}
        onChange={handleSearchChange}
        resultCount={filteredPhotos.length}
        totalCount={photos.length}
        showFavourites={showFavourites}
        onToggleFavourites={() => {
          setShowFavourites(prev => !prev)
          setSearchQuery('')
        }}
        favouriteCount={favourites.length}
      />

      {/* Empty state */}
      {filteredPhotos.length === 0 && (
        <div className="flex flex-col items-center justify-center py-32 gap-3">
          <p className="font-display text-2xl italic text-ink/30">
            {showFavourites ? 'No favourites yet' : 'No results found'}
          </p>
          <p className="font-body text-sm text-ink/30">
            {showFavourites
              ? 'Click the heart on any photo to save it here'
              : `No authors matching "${searchQuery}"`
            }
          </p>
        </div>
      )}

      {/* Photo grid — responsive: 1 col mobile, 2 tablet, 4 desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredPhotos.map((photo, index) => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            index={index}
            isFavourited={favourites.includes(photo.id)}
            onToggleFavourite={handleToggleFavourite}
          />
        ))}
      </div>
    </div>
  )
}
