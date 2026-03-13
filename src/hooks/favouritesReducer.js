// Initial state: load favourites from localStorage on startup
// This is how we persist favourites across page refreshes
export function getInitialFavourites() {
  try {
    const stored = localStorage.getItem('photo-gallery-favourites')
    return stored ? JSON.parse(stored) : []
  } catch {
    // If localStorage is unavailable or JSON is corrupted, start fresh
    return []
  }
}

// Reducer handles all favourites state changes via named actions
// useReducer is preferred over useState here because:
// - State transitions are explicit and named (TOGGLE_FAVOURITE, CLEAR_ALL)
// - Logic is pure and easily testable
// - Avoids stale closure bugs common with useState in callbacks
export function favouritesReducer(state, action) {
  let newState

  switch (action.type) {
    case 'TOGGLE_FAVOURITE': {
      const isAlreadyFavourited = state.includes(action.id)
      if (isAlreadyFavourited) {
        // Remove from favourites
        newState = state.filter(id => id !== action.id)
      } else {
        // Add to favourites
        newState = [...state, action.id]
      }
      break
    }

    case 'CLEAR_ALL': {
      newState = []
      break
    }

    default:
      return state
  }

  // Persist to localStorage every time state changes
  try {
    localStorage.setItem('photo-gallery-favourites', JSON.stringify(newState))
  } catch {
    // Silently ignore storage errors (private browsing, quota exceeded)
  }

  return newState
}
