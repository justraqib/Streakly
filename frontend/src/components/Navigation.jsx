export default function Navigation({ currentView, setCurrentView }) {
  const tabs = [
    { id: 'daily', label: 'Today', icon: '📅' },
    { id: 'weekly', label: 'Weekly', icon: '📊' },
    { id: 'monthly', label: 'Monthly', icon: '📈' },
  ]

  return (
    <div className="glass sticky top-[80px] z-40" style={{ borderColor: 'var(--color-border)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex gap-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setCurrentView(tab.id)}
              className={`px-6 py-4 font-medium transition-all duration-300 rounded-lg flex items-center gap-2 ${
                currentView === tab.id
                  ? 'text-white'
                  : 'text-foreground-secondary hover:text-foreground'
              }`}
              style={currentView === tab.id ? {
                background: `linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent-purple) 100%)`,
                boxShadow: '0 4px 15px rgba(255, 107, 53, 0.3)'
              } : {}}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
