export default function ErrorMessage({ message }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 px-6 text-center">
      <div className="text-5xl font-display text-rust">×</div>
      <h2 className="font-display text-2xl text-ink">Something went wrong</h2>
      <p className="font-body text-ink/60 max-w-sm text-sm leading-relaxed">{message}</p>
      <button
        onClick={() => window.location.reload()}
        className="mt-2 px-6 py-2.5 bg-ink text-cream font-body text-sm tracking-widest uppercase hover:bg-rust transition-colors duration-300"
      >
        Try Again
      </button>
    </div>
  )
}
