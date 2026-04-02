import { useState } from 'react'

export default function ScheduleForm({ onAddSchedule }) {
  const [taskName, setTaskName] = useState('')
  const [startTime, setStartTime] = useState('09:00')
  const [endTime, setEndTime] = useState('10:00')
  const [repeatDaily, setRepeatDaily] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!taskName.trim()) return

    onAddSchedule({
      taskName,
      startTime,
      endTime,
      repeatDaily,
      completed: false,
      status: null,
    })

    // Reset form
    setTaskName('')
    setStartTime('09:00')
    setEndTime('10:00')
    setRepeatDaily(false)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-border p-6 shadow-sm">
      <h2 className="text-xl font-bold text-foreground mb-6">Create Your Day Schedule</h2>
      
      <div className="space-y-4">
        {/* Task Name Input */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Task / Schedule Name
          </label>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="e.g., Morning Exercise"
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
          />
        </div>

        {/* Time Range */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Start Time
            </label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              End Time
            </label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
            />
          </div>
        </div>

        {/* Repeat Toggle */}
        <div className="flex items-center gap-3 pt-2">
          <input
            type="checkbox"
            id="repeat"
            checked={repeatDaily}
            onChange={(e) => setRepeatDaily(e.target.checked)}
            className="w-4 h-4 rounded cursor-pointer accent-primary"
          />
          <label htmlFor="repeat" className="text-sm text-foreground cursor-pointer">
            Repeat daily
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-3 px-4 rounded-lg transition-colors mt-6"
        >
          Add to Schedule
        </button>
      </div>
    </form>
  )
}
