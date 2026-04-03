import { useMemo } from 'react'
import TimeAllocationCard from '../components/TimeAllocationCard'
import { aggregateHoursByTag, TIME_TAGS } from '../utils/timeCalculator'

export default function WeeklyView({ schedules, currentDate }) {
  const weekData = useMemo(() => {
    const today = new Date()
    const weekDays = []

    // Get last 7 days
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split('T')[0]
      
      const daySchedules = schedules.filter(s => {
        const taskDate = s.createdDate || dateStr
        return taskDate === dateStr
      })
      const completed = daySchedules.filter(s => s.status === 'completed').length
      const missed = daySchedules.filter(s => s.status === 'missed')
      const total = daySchedules.length
      const hoursByTag = aggregateHoursByTag(daySchedules)

      weekDays.push({
        date: dateStr,
        dateObj: date,
        dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
        completed,
        missed,
        total,
        percentage: total === 0 ? 0 : Math.round((completed / total) * 100),
        hoursByTag,
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

      {/* Weekly Hours Breakdown */}
      <div className="glass rounded-xl p-8" style={{ borderColor: 'var(--color-border)' }}>
        <h3 className="text-xl font-bold text-foreground mb-6">Hours by Category (Weekly)</h3>
        <div className="space-y-6">
          {TIME_TAGS.map(tag => {
            const totalHours = weekData.reduce((sum, day) => sum + (day.hoursByTag[tag.id] || 0), 0)
            if (totalHours === 0) return null
            return (
              <div key={tag.id}>
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-foreground">{tag.label}</p>
                  <p className="font-bold text-foreground">{totalHours.toFixed(1)}h</p>
                </div>
                <div className="flex gap-1">
                  {weekData.map((day, idx) => {
                    const dayHours = day.hoursByTag[tag.id] || 0
                    return (
                      <div
                        key={idx}
                        className="flex-1 h-8 rounded-md transition-all hover:scale-110 cursor-pointer"
                        style={{
                          background: dayHours > 0 ? tag.borderColor : 'rgba(255, 255, 255, 0.05)',
                          opacity: dayHours > 0 ? 0.8 : 0.3,
                          border: `1px solid ${tag.borderColor}`,
                          position: 'relative'
                        }}
                        title={`${day.dayName}: ${dayHours.toFixed(1)}h`}
                      >
                        {dayHours > 0 && (
                          <span className="text-xs font-bold text-white absolute inset-0 flex items-center justify-center">
                            {dayHours > 1 ? dayHours.toFixed(1) : ''}
                          </span>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Missed Tasks Summary */}
      <div className="glass rounded-xl p-8" style={{ borderColor: 'var(--color-border)' }}>
        <h3 className="text-xl font-bold text-foreground mb-6">Where You Spent Your Time</h3>
        <div className="space-y-6">
          {weekData.map((day, idx) => (
            day.missed.length > 0 && (
              <div key={`missed-${idx}`}>
                <p className="font-semibold text-foreground mb-3">{day.dayName} - {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                <div className="space-y-2">
                  {day.missed.map((task, taskIdx) => (
                    <div
                      key={taskIdx}
                      className="rounded-lg p-4 transition-all hover:scale-102"
                      style={{
                        background: 'rgba(239, 68, 68, 0.1)',
                        borderLeft: '4px solid #ef4444'
                      }}
                    >
                      <div className="flex items-start justify-between mb-1">
                        <p className="font-medium text-foreground">{task.taskName}</p>
                        <p style={{ color: 'var(--color-foreground-secondary)' }} className="text-xs">{task.startTime} - {task.endTime}</p>
                      </div>
                      <p style={{ color: '#fca5a5' }} className="text-sm">Instead: {task.note || 'No details'}</p>
                    </div>
                  ))}
                </div>
              </div>
            )
          ))}
          {weekData.every(d => d.missed.length === 0) && (
            <p style={{ color: 'var(--color-foreground-secondary)' }} className="text-center py-8">No missed tasks this week</p>
          )}
        </div>
      </div>
    </div>
  )
}
