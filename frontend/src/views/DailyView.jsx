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
      <div>
        <h2 className="text-2xl font-bold text-foreground">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
        </h2>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content - Left Side */}
        <div className="lg:col-span-2 space-y-8">
          {/* Schedule Form */}
          <ScheduleForm onAddSchedule={onAddSchedule} />

          {/* Daily Schedule */}
          <div>
            <h3 className="text-xl font-bold text-foreground mb-4">Your Schedule</h3>
            {!hasSchedules ? (
              <div className="bg-white rounded-lg border border-border p-12 text-center shadow-sm">
                <p className="text-lg text-neutral mb-2">No schedule yet.</p>
                <p className="text-sm text-neutral">Start planning your day above!</p>
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
