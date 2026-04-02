export default function Header() {
  return (
    <header className="glass sticky top-0 z-50 border-b" style={{ borderColor: 'var(--color-border)' }}>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground tracking-tight">Streakly</h1>
            <p className="text-sm mt-2" style={{ color: 'var(--color-foreground-secondary)' }}>Track your daily habits. Build unstoppable streaks.</p>
          </div>
          <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{
            background: `linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)`,
            boxShadow: '0 0 20px rgba(255, 107, 53, 0.3)'
          }}>
            <span className="text-white font-bold text-lg">✓</span>
          </div>
        </div>
      </div>
    </header>
  )
}
