export default function ProgressSummary({ tasks }) {
  const total = tasks.length
  const completed = tasks.filter(t => t.status === 'completed').length
  const missed = tasks.filter(t => t.status === 'missed').length
  const pending = total - completed - missed
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100)

  return (
    <div className="glass rounded-xl p-8" style={{ borderColor: 'var(--color-border)' }}>
      <h3 className="text-2xl font-bold text-foreground mb-8">Today's Progress</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="text-center p-4 rounded-lg transition-all hover:scale-105" style={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderColor: 'var(--color-border)',
          borderWidth: '1px'
        }}>
          <p className="text-3xl font-bold" style={{ color: 'var(--color-accent)' }}>{total}</p>
          <p className="text-xs font-semibold mt-2" style={{ color: 'var(--color-foreground-secondary)' }}>Total Tasks</p>
        </div>
        <div className="text-center p-4 rounded-lg transition-all hover:scale-105" style={{
          background: 'rgba(16, 185, 129, 0.1)',
          borderColor: 'var(--color-success)',
          borderWidth: '1px'
        }}>
          <p className="text-3xl font-bold text-success-light">{completed}</p>
          <p className="text-xs font-semibold mt-2 text-success-light">Completed</p>
        </div>
        <div className="text-center p-4 rounded-lg transition-all hover:scale-105" style={{
          background: 'rgba(239, 68, 68, 0.1)',
          borderColor: '#ef4444',
          borderWidth: '1px'
        }}>
          <p className="text-3xl font-bold" style={{ color: '#fca5a5' }}>{missed}</p>
          <p className="text-xs font-semibold mt-2" style={{ color: '#fca5a5' }}>Missed</p>
        </div>
        <div className="text-center p-4 rounded-lg transition-all hover:scale-105" style={{
          background: 'rgba(255, 107, 53, 0.1)',
          borderColor: 'var(--color-primary)',
          borderWidth: '1px'
        }}>
          <p className="text-3xl font-bold" style={{ color: 'var(--color-primary)' }}>{pending}</p>
          <p className="text-xs font-semibold mt-2" style={{ color: 'var(--color-primary-light)' }}>Pending</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-semibold text-foreground">Completion Rate</p>
          <p className="text-lg font-bold" style={{ color: 'var(--color-primary)' }}>{percentage}%</p>
        </div>
        <div className="w-full rounded-full h-4 overflow-hidden" style={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderColor: 'var(--color-border)',
          borderWidth: '1px'
        }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${percentage}%`,
              background: `linear-gradient(90deg, var(--color-primary) 0%, var(--color-accent) 100%)`,
              boxShadow: `0 0 15px rgba(255, 107, 53, 0.5)`
            }}
          />
        </div>
      </div>
    </div>
  )
}
