import { useMemo } from 'react'
import ScheduleForm from '../components/ScheduleForm'
import TaskCard from '../components/TaskCard'
import ProgressSummary from '../components/ProgressSummary'
import StreakTracker from '../components/StreakTracker'
import TimeAllocationCard from '../components/TimeAllocationCard'
import { aggregateHoursByTag } from '../utils/timeCalculator'

export default function DailyView({ schedules, currentDate, onAddSchedule, onUpdateSchedule, onDeleteSchedule }) {
  const today = new Date().toISOString().split('T')[0]
  
  const { todayTasks, completedTasks, inboxTasks, hoursByTag } = useMemo(() => {
    const tasks = schedules.filter(s => (s.createdDate || today) === today)
      .sort((a, b) => a.startTime.localeCompare(b.startTime))
    const completed = tasks.filter(t => t.status === 'completed')
    const pending = tasks.filter(t => !t.status)
    const hours = aggregateHoursByTag(tasks, today)

    return {
      todayTasks: tasks,
      completedTasks: completed,
      inboxTasks: pending,
      hoursByTag: hours,
    }
  }, [schedules, today])

  const hasSchedules = todayTasks.length > 0
  const hasPending = inboxTasks.length > 0

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

          {/* Completed Tasks */}
          {completedTasks.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">✓ Completed Today ({completedTasks.length})</h3>
              <div className="space-y-4">
                {completedTasks.map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onUpdate={onUpdateSchedule}
                    onDelete={onDeleteSchedule}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Inbox - Pending Tasks */}
          {hasPending && (
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">📬 Inbox ({inboxTasks.length})</h3>
              <p style={{ color: 'var(--color-foreground-secondary)' }} className="text-sm mb-4">Mark what you actually did or complete these tasks</p>
              <div className="space-y-4">
                {inboxTasks.map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onUpdate={onUpdateSchedule}
                    onDelete={onDeleteSchedule}
                  />
                ))}
              </div>
            </div>
          )}

          {!hasSchedules && (
            <div className="glass rounded-xl p-12 text-center" style={{ borderColor: 'var(--color-border)' }}>
              <p className="text-lg font-semibold text-foreground mb-2">No tasks scheduled yet</p>
              <p className="text-sm" style={{ color: 'var(--color-foreground-secondary)' }}>Create your first task above to get started!</p>
            </div>
          )}
        </div>

        {/* Sidebar - Right Side */}
        <div className="space-y-6">
          {/* Streak Tracker */}
          <StreakTracker schedules={schedules} currentDate={currentDate} />

          {/* Time Allocation */}
          {hasSchedules && (
            <TimeAllocationCard hoursByTag={hoursByTag} title="Today's Hours" />
          )}

          {/* Progress Summary */}
          {hasSchedules && (
            <ProgressSummary tasks={todayTasks} />
          )}
        </div>
      </div>
    </div>
  )
}
