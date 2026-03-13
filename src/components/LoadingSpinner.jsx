export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
      {/* Outer ring */}
      <div className="relative w-16 h-16">
        <div className="spinner absolute inset-0 rounded-full border-2 border-transparent border-t-rust opacity-80" />
        <div
          className="spinner absolute inset-2 rounded-full border-2 border-transparent border-t-ink opacity-30"
          style={{ animationDirection: 'reverse', animationDuration: '0.6s' }}
        />
      </div>
      <p
        className="font-display italic text-ink/50 text-lg tracking-wide"
        style={{ fontStyle: 'italic' }}
      >
        Curating your gallery…
      </p>
    </div>
  )
}
