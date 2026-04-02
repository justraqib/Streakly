import { useMemo } from 'react'
import ScheduleForm from '../components/ScheduleForm'
import TaskCard from '../components/TaskCard'
import ProgressSummary from '../components/ProgressSummary'
import StreakTracker from '../components/StreakTracker'

export default function DailyView({ schedules, currentDate, onAddSchedule, onUpdateSchedule, onDeleteSchedule }) {
  // Get today's tasks
  const todayTasks = useMemo(() => {
    const today = new Date().toISOString().split('T')[0]
    return schedules.filter(s => {
      const scheduleDate = s.createdDate || today
      return scheduleDate === today
    }).sort((a, b) => a.startTime.localeCompare(b.startTime))
  }, [schedules])

  const hasSchedules = todayTasks.length > 0

  return (
    <div className="space-y-8">
      {/* Header with Date */}
      <div className="mb-2">
        <h2 className="text-4xl font-bold text-foreground mb-2">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
        </h2>
        <p style={{ color: 'var(--color-foreground-secondary)' }} className="text-sm font-medium">Make it a great day 🎯</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content - Left Side */}
        <div className="lg:col-span-2 space-y-8">
          {/* Schedule Form */}
          <ScheduleForm onAddSchedule={onAddSchedule} />

          {/* Daily Schedule */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-6">Today's Tasks</h3>
            {!hasSchedules ? (
              <div className="glass rounded-xl p-12 text-center" style={{ borderColor: 'var(--color-border)' }}>
                <p className="text-lg font-semibold text-foreground mb-2">No tasks scheduled yet</p>
                <p className="text-sm" style={{ color: 'var(--color-foreground-secondary)' }}>Create your first task above to get started!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {todayTasks.map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onUpdate={onUpdateSchedule}
                    onDelete={onDeleteSchedule}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar - Right Side */}
        <div className="space-y-6">
          {/* Streak Tracker */}
          <StreakTracker schedules={schedules} currentDate={currentDate} />

          {/* Progress Summary */}
          {hasSchedules && (
            <ProgressSummary tasks={todayTasks} />
          )}
        </div>
      </div>
    </div>
  )
}
