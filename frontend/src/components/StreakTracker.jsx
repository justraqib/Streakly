import { useEffect, useState } from 'react'

export default function StreakTracker({ schedules, currentDate }) {
  const [streak, setStreak] = useState(0)

  useEffect(() => {
    calculateStreak()
  }, [schedules, currentDate])

  const calculateStreak = () => {
    if (schedules.length === 0) {
      setStreak(0)
      return
    }

    // Group schedules by date and check completion
    const dateMap = {}
    schedules.forEach(schedule => {
      const date = schedule.createdDate || new Date().toISOString().split('T')[0]
      if (!dateMap[date]) {
        dateMap[date] = { total: 0, completed: 0 }
      }
      dateMap[date].total += 1
      if (schedule.status === 'completed') {
        dateMap[date].completed += 1
      }
    })

    // Calculate consecutive days with 100% completion
    const sortedDates = Object.keys(dateMap).sort().reverse()
    let currentStreak = 0

    for (const date of sortedDates) {
      const dayData = dateMap[date]
      if (dayData.completed === dayData.total && dayData.total > 0) {
        currentStreak += 1
      } else {
        break
      }
    }

    setStreak(currentStreak)
  }

  return (
    <div className="bg-gradient-to-br from-primary-light to-primary rounded-lg p-6 shadow-sm border border-primary">
      <div className="text-center">
        <p className="text-sm font-medium text-primary mb-2">Current Streak</p>
        <div className="flex items-center justify-center gap-3 mb-2">
          <span className="text-4xl">🔥</span>
          <p className="text-4xl font-bold text-primary">{streak}</p>
        </div>
        <p className="text-sm text-primary">
          {streak === 0 ? 'Start your streak today!' : `${streak} day${streak !== 1 ? 's' : ''} of consistency`}
        </p>
      </div>
    </div>
  )
}
