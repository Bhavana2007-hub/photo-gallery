import { useState, useRef } from 'react'

export default function PhotoCard({ photo, isFavourited, onToggleFavourite, index }) {
  const [imgLoaded, setImgLoaded] = useState(false)
  const heartRef = useRef(null)

  // Calculate stagger class for entrance animation (cycles 1–8)
  const staggerClass = `stagger-${(index % 8) + 1}`

  function handleHeartClick() {
    // Trigger CSS heart-pop animation by removing + re-adding class
    if (heartRef.current) {
      heartRef.current.classList.remove('heart-pop')
      // Force reflow so the animation restarts properly
      void heartRef.current.offsetWidth
      heartRef.current.classList.add('heart-pop')
    }
    onToggleFavourite(photo.id)
  }

  return (
    <div
      className={`
        group relative bg-white overflow-hidden
        card-hover fade-in-up opacity-0 ${staggerClass}
      `}
    >
      {/* Image container with aspect ratio */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
        {/* Skeleton shimmer while image loads */}
        {!imgLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-cream via-blush/30 to-cream animate-pulse" />
        )}

        <img
          src={`https://picsum.photos/id/${photo.id}/600/450`}
          alt={`Photo by ${photo.author}`}
          className={`
            w-full h-full object-cover
            group-hover:scale-105 transition-transform duration-700 ease-out
            ${imgLoaded ? 'opacity-100' : 'opacity-0'}
          `}
          onLoad={() => setImgLoaded(true)}
        />

        {/* Dark overlay on hover */}
        <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/20 transition-all duration-500" />

        {/* Heart button — always visible on mobile, hover on desktop */}
        <button
          ref={heartRef}
          onClick={handleHeartClick}
          aria-label={isFavourited ? 'Remove from favourites' : 'Add to favourites'}
          className={`
            absolute top-3 right-3
            w-9 h-9 flex items-center justify-center
            rounded-full backdrop-blur-md transition-all duration-300
            ${isFavourited
              ? 'bg-rust text-cream shadow-lg scale-110'
              : 'bg-white/80 text-ink/40 opacity-0 group-hover:opacity-100 hover:text-rust hover:bg-white'
            }
          `}
        >
          <svg
            className="w-4 h-4"
            fill={isFavourited ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      {/* Card footer */}
      <div className="px-4 py-3 flex items-center justify-between border-t border-ink/5">
        <div className="min-w-0">
          <p className="font-body text-xs text-ink/40 uppercase tracking-widest mb-0.5">Author</p>
          <p className="font-display text-sm text-ink font-medium truncate">{photo.author}</p>
        </div>

        {/* Dimensions badge */}
        <span className="font-body text-xs text-ink/30 shrink-0 ml-2">
          {photo.width} × {photo.height}
        </span>
      </div>
    </div>
  )
}
