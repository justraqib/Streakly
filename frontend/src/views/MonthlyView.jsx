import { useMemo } from 'react'
import TimeAllocationCard from '../components/TimeAllocationCard'
import { aggregateHoursByTag, TIME_TAGS } from '../utils/timeCalculator'

export default function MonthlyView({ schedules, currentDate }) {
  const monthData = useMemo(() => {
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth()
    
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()

    const days = []
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i)
      const dateStr = date.toISOString().split('T')[0]
      
      const daySchedules = schedules.filter(s => {
        const taskDate = s.createdDate || dateStr
        return taskDate === dateStr
      })
      const completed = daySchedules.filter(s => s.status === 'completed').length
      const missed = daySchedules.filter(s => s.status === 'missed')
      const total = daySchedules.length
      const hoursByTag = aggregateHoursByTag(daySchedules)

      days.push({
        date: dateStr,
        day: i,
        completed,
        missed,
        total,
        percentage: total === 0 ? 0 : Math.round((completed / total) * 100),
        isToday: dateStr === new Date().toISOString().split('T')[0],
        hoursByTag,
      })
    }

    return {
      monthName: new Date(year, month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      days,
    }
  }, [schedules])

  const getHeatmapColor = (day) => {
    if (day.total === 0) return 'rgba(255, 255, 255, 0.05)'
    if (day.percentage === 100) return 'rgba(16, 185, 129, 0.3)'
    if (day.percentage >= 75) return 'rgba(16, 185, 129, 0.2)'
    if (day.percentage >= 50) return 'rgba(255, 107, 53, 0.2)'
    if (day.percentage >= 25) return 'rgba(255, 107, 53, 0.15)'
    return 'rgba(239, 68, 68, 0.2)'
  }

  const getHeatmapBorder = (day) => {
    if (day.total === 0) return 'rgba(255, 255, 255, 0.1)'
    if (day.percentage === 100) return 'var(--color-success-light)'
    if (day.percentage >= 50) return 'var(--color-primary)'
    return '#ef4444'
  }

  const totalTasks = monthData.days.reduce((sum, d) => sum + d.total, 0)
  const totalCompleted = monthData.days.reduce((sum, d) => sum + d.completed, 0)
  const perfectDays = monthData.days.filter(d => d.total > 0 && d.percentage === 100).length

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Monthly Overview</h2>
        <p style={{ color: 'var(--color-foreground-secondary)' }} className="text-sm font-medium">{monthData.monthName}</p>
      </div>

      {/* Monthly Stats Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="glass rounded-xl p-6" style={{ borderColor: 'var(--color-border)' }}>
          <p style={{ color: 'var(--color-accent)' }} className="text-sm font-semibold mb-2">Total Tasks</p>
          <p className="text-3xl font-black text-foreground">{totalTasks}</p>
          <p style={{ color: 'var(--color-foreground-secondary)' }} className="text-xs mt-2">this month</p>
        </div>
        <div className="glass rounded-xl p-6" style={{ borderColor: 'var(--color-border)' }}>
          <p className="text-sm font-semibold mb-2 text-success-light">Completed</p>
          <p className="text-3xl font-black text-success-light">{totalCompleted}</p>
          <p style={{ color: 'var(--color-foreground-secondary)' }} className="text-xs mt-2">{totalTasks > 0 ? Math.round((totalCompleted / totalTasks) * 100) : 0}% overall</p>
        </div>
        <div className="glass rounded-xl p-6" style={{ borderColor: 'var(--color-border)' }}>
          <p style={{ color: 'var(--color-primary)' }} className="text-sm font-semibold mb-2">Perfect Days</p>
          <p style={{ color: 'var(--color-primary)' }} className="text-3xl font-black">{perfectDays}</p>
          <p style={{ color: 'var(--color-foreground-secondary)' }} className="text-xs mt-2">100% completed</p>
        </div>
      </div>

      {/* Heatmap Calendar */}
      <div className="glass rounded-xl p-8" style={{ borderColor: 'var(--color-border)' }}>
        <h3 className="text-xl font-bold text-foreground mb-6">Completion Heatmap</h3>
        
        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center">
              <p style={{ color: 'var(--color-foreground-secondary)' }} className="text-xs font-bold">{day}</p>
            </div>
          ))}
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-2">
          {/* Empty cells for days before month starts */}
          {Array(new Date(monthData.monthName + ' 1').getDay()).fill(null).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}

          {/* Calendar Days - Heatmap Style */}
          {monthData.days.map((day, idx) => (
            <div
              key={idx}
              className="aspect-square rounded-lg p-2 flex flex-col items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer group"
              style={{
                background: getHeatmapColor(day),
                border: `2px solid ${getHeatmapBorder(day)}`,
                borderOpacity: day.total === 0 ? 0.3 : 1
              }}
              title={`${day.day}: ${day.total === 0 ? 'No tasks' : `${day.completed}/${day.total} completed (${day.percentage}%)`}`}
            >
              <p className="text-xs font-bold text-foreground">{day.day}</p>
              <p className="text-xs font-semibold" style={{
                color: day.percentage === 100 ? 'var(--color-success-light)' : day.percentage >= 50 ? 'var(--color-primary)' : '#fca5a5'
              }}>
                {day.total === 0 ? '—' : day.percentage === 100 ? '✓' : `${day.completed}/${day.total}`}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="glass rounded-xl p-8" style={{ borderColor: 'var(--color-border)' }}>
        <h3 className="text-lg font-bold text-foreground mb-6">Heatmap Legend</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded" style={{ background: 'rgba(16, 185, 129, 0.3)', border: '2px solid var(--color-success-light)' }}></div>
            <p style={{ color: 'var(--color-foreground-secondary)' }} className="text-xs">Perfect (100%)</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded" style={{ background: 'rgba(16, 185, 129, 0.2)', border: '2px solid var(--color-success-light)' }}></div>
            <p style={{ color: 'var(--color-foreground-secondary)' }} className="text-xs">Great (75-99%)</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded" style={{ background: 'rgba(255, 107, 53, 0.2)', border: '2px solid var(--color-primary)' }}></div>
            <p style={{ color: 'var(--color-foreground-secondary)' }} className="text-xs">Good (50-74%)</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded" style={{ background: 'rgba(255, 107, 53, 0.15)', border: '2px solid var(--color-primary)' }}></div>
            <p style={{ color: 'var(--color-foreground-secondary)' }} className="text-xs">Fair (25-49%)</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded" style={{ background: 'rgba(239, 68, 68, 0.2)', border: '2px solid #ef4444' }}></div>
            <p style={{ color: 'var(--color-foreground-secondary)' }} className="text-xs">Low ({`<25%`})</p>
          </div>
        </div>
      </div>

      {/* Monthly Hours Breakdown */}
      <TimeAllocationCard 
        hoursByTag={Object.fromEntries(
          TIME_TAGS.map(tag => [
            tag.id,
            monthData.days.reduce((sum, day) => sum + (day.hoursByTag[tag.id] || 0), 0)
          ])
        )}
        title="Monthly Time Allocation"
      />

      {/* Time Allocation Summary */}
      <div className="glass rounded-xl p-8" style={{ borderColor: 'var(--color-border)' }}>
        <h3 className="text-xl font-bold text-foreground mb-6">Where You Spent Your Time</h3>
        {monthData.days.some(d => d.missed.length > 0) ? (
          <div className="space-y-4">
            {monthData.days
              .filter(d => d.missed.length > 0)
              .map((day, idx) => (
                <div key={idx} className="border-b" style={{ borderColor: 'var(--color-border)' }}>
                  <p className="font-semibold text-foreground mb-3">
                    {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                  </p>
                  <div className="space-y-2 mb-4">
                    {day.missed.map((task, taskIdx) => (
                      <div
                        key={taskIdx}
                        className="rounded-lg p-3 transition-all"
                        style={{
                          background: 'rgba(239, 68, 68, 0.1)',
                          borderLeft: '3px solid #ef4444'
                        }}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-medium text-foreground text-sm">{task.taskName}</p>
                          <p style={{ color: 'var(--color-foreground-secondary)' }} className="text-xs">{task.startTime} - {task.endTime}</p>
                        </div>
                        <p style={{ color: '#fca5a5' }} className="text-xs">Did instead: {task.note || 'No details'}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <p style={{ color: 'var(--color-foreground-secondary)' }} className="text-center py-8">Great job! No missed tasks this month</p>
        )}
      </div>
    </div>
  )
}
