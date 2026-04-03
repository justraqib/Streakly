import { useState } from 'react'
import { TIME_TAGS } from '../utils/timeCalculator'

export default function ScheduleForm({ onAddSchedule }) {
  const [taskName, setTaskName] = useState('')
  const [startTime, setStartTime] = useState('09:00')
  const [endTime, setEndTime] = useState('10:00')
  const [repeatDaily, setRepeatDaily] = useState(false)
  const [scheduledTag, setScheduledTag] = useState('study')

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!taskName.trim()) return

    const newSchedule = {
      taskName,
      startTime,
      endTime,
      repeatDaily,
      scheduledTag,
      completed: false,
      status: null,
    }
    console.log('[v0] ScheduleForm submitted:', newSchedule)
    onAddSchedule(newSchedule)

    // Reset form
    setTaskName('')
    setStartTime('09:00')
    setEndTime('10:00')
    setRepeatDaily(false)
    setScheduledTag('study')
  }

  return (
    <form onSubmit={handleSubmit} className="glass rounded-xl p-8" style={{ borderColor: 'var(--color-border)' }}>
      <h2 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-2">
        <span>➕</span> Add to Your Schedule
      </h2>
      
      <div className="space-y-6">
        {/* Task Name Input */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-3">
            What&apos;s your task?
          </label>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="e.g., Morning Exercise"
            className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 text-foreground"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderColor: 'var(--color-border)',
              borderWidth: '1px'
            }}
          />
        </div>

        {/* Time Range */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">
              Start Time
            </label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 text-foreground"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderColor: 'var(--color-border)',
                borderWidth: '1px'
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">
              End Time
            </label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 text-foreground"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderColor: 'var(--color-border)',
                borderWidth: '1px'
              }}
            />
          </div>
        </div>

        {/* Category Tag Selection */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-3">
            Category
          </label>
          <div className="flex flex-wrap gap-2">
            {TIME_TAGS.map(tag => (
              <button
                key={tag.id}
                type="button"
                onClick={() => setScheduledTag(tag.id)}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${
                  scheduledTag === tag.id ? 'ring-2 scale-105' : 'hover:scale-105'
                }`}
                style={{
                  background: scheduledTag === tag.id ? tag.borderColor : tag.color,
                  borderColor: tag.borderColor,
                  borderWidth: '2px',
                  color: scheduledTag === tag.id ? 'white' : 'var(--color-foreground)',
                }}
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>

        {/* Repeat Toggle */}
        <div className="flex items-center gap-3 p-4 rounded-lg" style={{
          background: 'rgba(255, 255, 255, 0.03)',
          borderColor: 'var(--color-border)',
          borderWidth: '1px'
        }}>
          <input
            type="checkbox"
            id="repeat"
            checked={repeatDaily}
            onChange={(e) => setRepeatDaily(e.target.checked)}
            className="w-5 h-5 rounded cursor-pointer accent-primary"
          />
          <label htmlFor="repeat" className="text-sm font-medium text-foreground cursor-pointer">
            Repeat this task daily
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full text-white font-bold py-4 px-4 rounded-lg transition-all duration-300 hover:scale-105 mt-8 text-lg"
          style={{
            background: `linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent-purple) 100%)`,
            boxShadow: '0 4px 20px rgba(255, 107, 53, 0.4)'
          }}
        >
          ✓ Add to Schedule
        </button>
      </div>
    </form>
  )
}
