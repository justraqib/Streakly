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

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Weekly Overview</h2>
        <p className="text-neutral">Last 7 days of your progress</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {weekData.map((day, idx) => (
          <div key={idx} className="bg-white rounded-lg border border-border p-4 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-sm font-medium text-neutral mb-1">{day.dayName}</p>
            <p className="text-xs text-neutral mb-4">{new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
            
            {day.total === 0 ? (
              <div className="text-center py-4">
                <p className="text-sm text-neutral">No tasks</p>
              </div>
            ) : (
              <>
                <div className="flex items-baseline gap-2 mb-3">
                  <p className="text-2xl font-bold text-primary">{day.completed}</p>
                  <p className="text-sm text-neutral">/ {day.total}</p>
                </div>

                <div className="space-y-2">
                  <div className="w-full bg-neutral rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-primary h-full rounded-full transition-all duration-300"
                      style={{ width: `${day.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-neutral text-right">{day.percentage}%</p>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Weekly Stats */}
      <div className="bg-white rounded-lg border border-border p-6 shadow-sm">
        <h3 className="text-lg font-bold text-foreground mb-6">Weekly Summary</h3>
        
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-3xl font-bold text-primary">
              {weekData.reduce((sum, day) => sum + day.total, 0)}
            </p>
            <p className="text-sm text-neutral mt-1">Total Tasks</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-success">
              {weekData.reduce((sum, day) => sum + day.completed, 0)}
            </p>
            <p className="text-sm text-neutral mt-1">Completed</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary">
              {weekData.reduce((sum, day) => sum + (day.total > 0 ? day.percentage : 0), 0) / weekData.filter(d => d.total > 0).length || 0}%
            </p>
            <p className="text-sm text-neutral mt-1">Avg Completion</p>
          </div>
        </div>
      </div>
    </div>
  )
}
