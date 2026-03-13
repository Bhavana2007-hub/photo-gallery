import Gallery from './components/Gallery'

export default function App() {
  return (
    <div className="min-h-screen bg-cream">

      {/* Header */}
      <header className="relative border-b border-ink/8 mb-12">
        <div className="max-w-7xl mx-auto px-6 py-8 flex items-end justify-between">
          {/* Logo / Title */}
          <div>
            <h1 className="font-display text-4xl md:text-5xl text-ink tracking-tight">
              Lumière
            </h1>
            <p className="font-body text-xs text-ink/40 tracking-[0.3em] uppercase mt-1">
              Photo Gallery
            </p>
          </div>

          {/* Decorative line element */}
          <div className="hidden md:flex flex-col items-end gap-1 pb-1">
            <div className="w-16 h-px bg-rust" />
            <div className="w-8 h-px bg-ink/20" />
            <p className="font-body text-xs text-ink/30 tracking-widest uppercase mt-1">
              Picsum Collection
            </p>
          </div>
        </div>

        {/* Thin rust accent line */}
        <div className="absolute bottom-0 left-0 w-24 h-0.5 bg-rust" />
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-6 pb-20">
        <Gallery />
      </main>

      {/* Footer */}
      <footer className="border-t border-ink/8 py-8">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <p className="font-body text-xs text-ink/30 tracking-widest uppercase">
            Lumière © 2025
          </p>
          <p className="font-body text-xs text-ink/30">
            Photos via{' '}
            <a
              href="https://picsum.photos"
              target="_blank"
              rel="noreferrer"
              className="text-rust hover:underline"
            >
              Picsum Photos
            </a>
          </p>
        </div>
      </footer>

    </div>
  )
}
