import { useMemo } from 'react'

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
      
      const daySchedules = schedules.filter(s => (s.createdDate || dateStr) === dateStr)
      const completed = daySchedules.filter(s => s.status === 'completed').length
      const total = daySchedules.length

      days.push({
        date: dateStr,
        day: i,
        completed,
        total,
        percentage: total === 0 ? 0 : Math.round((completed / total) * 100),
        isToday: dateStr === new Date().toISOString().split('T')[0],
      })
    }

    return {
      monthName: new Date(year, month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      days,
    }
  }, [schedules])

  const getStatusColor = (day) => {
    if (day.total === 0) return 'bg-neutral-light border-neutral'
    if (day.percentage === 100) return 'bg-green-100 border-success'
    if (day.percentage >= 50) return 'bg-blue-100 border-primary'
    return 'bg-red-100 border-red-300'
  }

  const getStatusText = (day) => {
    if (day.total === 0) return '—'
    if (day.percentage === 100) return '✓'
    return `${day.completed}/${day.total}`
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Monthly Overview</h2>
        <p className="text-neutral">{monthData.monthName}</p>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white rounded-lg border border-border p-6 shadow-sm">
        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center">
              <p className="text-xs font-semibold text-neutral">{day}</p>
            </div>
          ))}
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-2">
          {/* Empty cells for days before month starts */}
          {Array(new Date(monthData.monthName + ' 1').getDay()).fill(null).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}

          {/* Calendar Days */}
          {monthData.days.map((day, idx) => (
            <div
              key={idx}
              className={`aspect-square border rounded-lg p-2 flex flex-col items-center justify-center transition-all ${getStatusColor(day)} ${day.isToday ? 'ring-2 ring-primary' : ''}`}
            >
              <p className="text-xs font-semibold text-foreground mb-1">{day.day}</p>
              <p className={`text-sm font-bold ${day.percentage === 100 ? 'text-success' : 'text-foreground'}`}>
                {getStatusText(day)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Legend and Stats */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Legend */}
        <div className="bg-white rounded-lg border border-border p-6 shadow-sm">
          <h3 className="text-lg font-bold text-foreground mb-4">Legend</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-green-100 border border-success rounded"></div>
              <p className="text-sm text-foreground">100% Completed</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-blue-100 border border-primary rounded"></div>
              <p className="text-sm text-foreground">Partially Completed (50%+)</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-red-100 border border-red-300 rounded"></div>
              <p className="text-sm text-foreground">Low Completion ({`<50%`})</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-neutral-light border border-neutral rounded"></div>
              <p className="text-sm text-foreground">No Tasks</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-lg border border-border p-6 shadow-sm">
          <h3 className="text-lg font-bold text-foreground mb-4">Monthly Stats</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-sm text-neutral">Total Tasks</p>
              <p className="text-2xl font-bold text-primary">
                {monthData.days.reduce((sum, d) => sum + d.total, 0)}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-neutral">Completed Tasks</p>
              <p className="text-2xl font-bold text-success">
                {monthData.days.reduce((sum, d) => sum + d.completed, 0)}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-neutral">Perfect Days</p>
              <p className="text-2xl font-bold text-primary">
                {monthData.days.filter(d => d.total > 0 && d.percentage === 100).length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
