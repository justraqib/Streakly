export default function Header() {
  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Streakly</h1>
            <p className="text-sm text-neutral mt-1">Track your time. Build your streak.</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center">
            <span className="text-primary font-semibold">S</span>
          </div>
        </div>
      </div>
    </header>
  )
}
