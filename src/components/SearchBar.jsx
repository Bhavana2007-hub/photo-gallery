export default function SearchBar({ value, onChange, resultCount, totalCount, showFavourites, onToggleFavourites, favouriteCount }) {
  return (
    <div className="flex flex-col gap-4 mb-10">
      {/* Search input */}
      <div className="relative">
        {/* Search icon */}
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40 pointer-events-none"
          fill="none" stroke="currentColor" strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>

        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="e.g. Alejandro, Bench, Paul…"
          className="
            w-full pl-11 pr-4 py-3.5
            bg-white/70 backdrop-blur-sm
            border border-ink/10
            font-body text-ink placeholder-ink/30
            focus:outline-none focus:border-rust/60 focus:bg-white
            transition-all duration-300
            text-sm tracking-wide
          "
        />

        {/* Clear button */}
        {value && (
          <button
            onClick={() => onChange('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-ink/30 hover:text-rust transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Stats row + Favourites toggle */}
      <div className="flex items-center justify-between">
        <p className="font-body text-xs text-ink/40 tracking-widest uppercase">
          {value
            ? `${resultCount} of ${totalCount} photos`
            : `${totalCount} photos`
          }
        </p>

        <button
          onClick={onToggleFavourites}
          className={`
            flex items-center gap-2 px-4 py-2 text-xs tracking-widest uppercase font-body
            border transition-all duration-300
            ${showFavourites
              ? 'bg-rust text-cream border-rust'
              : 'bg-transparent text-ink/60 border-ink/20 hover:border-rust/40 hover:text-rust'
            }
          `}
        >
          <svg
            className="w-3.5 h-3.5"
            fill={showFavourites ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          Favourites {favouriteCount > 0 && `(${favouriteCount})`}
        </button>
      </div>
    </div>
  )
}
