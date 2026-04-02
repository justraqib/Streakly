export default function Navigation({ currentView, setCurrentView }) {
  const tabs = [
    { id: 'daily', label: 'Today' },
    { id: 'weekly', label: 'Weekly' },
    { id: 'monthly', label: 'Monthly' },
  ]

  return (
    <div className="border-b border-border bg-background sticky top-16 z-40">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex gap-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setCurrentView(tab.id)}
              className={`py-4 font-medium border-b-2 transition-colors ${
                currentView === tab.id
                  ? 'text-primary border-primary'
                  : 'text-neutral border-transparent hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
