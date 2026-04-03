import { TIME_TAGS, getTotalHours } from '../utils/timeCalculator'

export default function TimeAllocationCard({ hoursByTag = {}, title = "Time Allocation" }) {
  const safeHoursByTag = hoursByTag || {}
  const totalHours = getTotalHours(safeHoursByTag)
  const sortedTags = TIME_TAGS.filter(tag => (safeHoursByTag[tag.id] || 0) > 0).sort((a, b) => (safeHoursByTag[b.id] || 0) - (safeHoursByTag[a.id] || 0))

  return (
    <div className="glass rounded-xl p-8" style={{ borderColor: 'var(--color-border)' }}>
      <h3 className="text-xl font-bold text-foreground mb-6">{title}</h3>
      
      {totalHours === 0 ? (
        <p style={{ color: 'var(--color-foreground-secondary)' }} className="text-center py-8">No time tracked yet</p>
      ) : (
        <>
          {/* Visual Bars */}
          <div className="space-y-4 mb-8">
            {sortedTags.map(tag => {
              const hours = safeHoursByTag[tag.id] || 0
              const percentage = (hours / totalHours) * 100
              return (
                <div key={tag.id}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-foreground">{tag.label}</p>
                    <p className="font-bold text-foreground">{hours.toFixed(1)}h</p>
                  </div>
                  <div className="w-full h-6 rounded-lg overflow-hidden" style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderColor: 'var(--color-border)',
                    borderWidth: '1px'
                  }}>
                    <div
                      className="h-full transition-all duration-500 flex items-center justify-end pr-2"
                      style={{
                        width: `${percentage}%`,
                        background: tag.borderColor,
                        opacity: 0.7
                      }}
                    >
                      {percentage > 10 && (
                        <span style={{ color: 'white' }} className="text-xs font-bold">{percentage.toFixed(0)}%</span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Summary Stats */}
          <div className="pt-6 border-t" style={{ borderColor: 'var(--color-border)' }}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p style={{ color: 'var(--color-foreground-secondary)' }} className="text-xs font-semibold mb-1">Total Hours</p>
                <p className="text-2xl font-black text-foreground">{totalHours.toFixed(1)}h</p>
              </div>
              <div>
                <p style={{ color: 'var(--color-foreground-secondary)' }} className="text-xs font-semibold mb-1">Categories</p>
                <p className="text-2xl font-black" style={{ color: 'var(--color-primary)' }}>{sortedTags.length}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
