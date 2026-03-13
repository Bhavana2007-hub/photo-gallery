import { useState, useEffect } from 'react'

// Custom hook that handles all data fetching logic
// Separates data concerns from UI — Gallery component stays clean
export function useFetchPhotos() {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // AbortController lets us cancel the fetch if the component unmounts
    const controller = new AbortController()

    async function fetchPhotos() {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(
          'https://picsum.photos/v2/list?limit=30',
          { signal: controller.signal }
        )

        // fetch() doesn't throw on HTTP errors (404, 500), so we check manually
        if (!response.ok) {
          throw new Error(`Failed to fetch photos (status ${response.status})`)
        }

        const data = await response.json()
        setPhotos(data)
      } catch (err) {
        // Ignore abort errors — they happen on intentional cleanup, not real failures
        if (err.name !== 'AbortError') {
          setError(err.message || 'Something went wrong. Please try again.')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchPhotos()

    // Cleanup: cancel the in-flight request if the component unmounts
    return () => controller.abort()
  }, []) // Empty array = run once on mount only

  return { photos, loading, error }
}
