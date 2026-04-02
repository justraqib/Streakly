import { useMemo } from 'react'

export default function WeeklyView({ schedules, currentDate }) {
  const weekData = useMemo(() => {
    const today = new Date()
    const weekDays = []

    // Get last 7 days
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split('T')[0]
      
      const daySchedules = schedules.filter(s => (s.createdDate || dateStr) === dateStr)
      const completed = daySchedules.filter(s => s.status === 'completed').length
      const total = daySchedules.length

      weekDays.push({
        date: dateStr,
        dateObj: date,
        dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
        completed,
        total,
        percentage: total === 0 ? 0 : Math.round((completed / total) * 100),
      })
    }

    return weekDays
  }, [schedules])

  const totalTasks = weekData.reduce((sum, day) => sum + day.total, 0)
  const totalCompleted = weekData.reduce((sum, day) => sum + day.completed, 0)
  const avgCompletion = weekData.filter(d => d.total > 0).length > 0
    ? Math.round(weekData.reduce((sum, day) => sum + (day.total > 0 ? day.percentage : 0), 0) / weekData.filter(d => d.total > 0).length)
    : 0

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Weekly Overview</h2>
        <p style={{ color: 'var(--color-foreground-secondary)' }} className="text-sm font-medium">Last 7 days of your progress</p>
      </div>

      {/* Weekly Stats Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="glass rounded-xl p-6" style={{ borderColor: 'var(--color-border)' }}>
          <p style={{ color: 'var(--color-accent)' }} className="text-sm font-semibold mb-2">Total Tasks</p>
          <p className="text-3xl font-black text-foreground">{totalTasks}</p>
        </div>
        <div className="glass rounded-xl p-6" style={{ borderColor: 'var(--color-border)' }}>
          <p className="text-sm font-semibold mb-2 text-success-light">Completed</p>
          <p className="text-3xl font-black text-success-light">{totalCompleted}</p>
        </div>
        <div className="glass rounded-xl p-6" style={{ borderColor: 'var(--color-border)' }}>
          <p style={{ color: 'var(--color-primary)' }} className="text-sm font-semibold mb-2">Avg Completion</p>
          <p style={{ color: 'var(--color-primary)' }} className="text-3xl font-black">{avgCompletion}%</p>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="glass rounded-xl p-8" style={{ borderColor: 'var(--color-border)' }}>
        <h3 className="text-xl font-bold text-foreground mb-8">Daily Completion</h3>
        <div className="space-y-6">
          {weekData.map((day, idx) => (
            <div key={idx}>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-semibold text-foreground">{day.dayName}</p>
                  <p style={{ color: 'var(--color-foreground-secondary)' }} className="text-xs">{new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-foreground">{day.completed}/{day.total}</p>
                  <p style={{ color: 'var(--color-primary)' }} className="text-sm font-semibold">{day.percentage}%</p>
                </div>
              </div>
              <div className="w-full h-8 rounded-lg overflow-hidden" style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderColor: 'var(--color-border)',
                borderWidth: '1px'
              }}>
                <div
                  className="h-full rounded-lg transition-all duration-500"
                  style={{
                    width: `${day.percentage}%`,
                    background: day.percentage === 100
                      ? 'linear-gradient(90deg, var(--color-success) 0%, var(--color-success-light) 100%)'
                      : day.percentage >= 50
                      ? 'linear-gradient(90deg, var(--color-primary) 0%, var(--color-accent) 100%)'
                      : 'linear-gradient(90deg, #ef4444 0%, #f87171 100%)',
                    boxShadow: day.percentage > 0 ? `0 0 20px ${day.percentage === 100 ? 'rgba(16, 185, 129, 0.4)' : 'rgba(255, 107, 53, 0.4)'}` : 'none'
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
