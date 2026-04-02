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
    <div 
      className="rounded-xl p-8 text-center overflow-hidden relative group"
      style={{
        background: `linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)`,
        boxShadow: '0 10px 40px rgba(255, 107, 53, 0.3)'
      }}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300" 
        style={{ background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}>
      </div>
      <div className="relative z-10">
        <p className="text-sm font-semibold text-white opacity-90 mb-3 tracking-wide">CURRENT STREAK</p>
        <div className="flex items-center justify-center gap-4 mb-3">
          <span className="text-5xl animate-bounce">🔥</span>
          <p className="text-5xl font-black text-white">{streak}</p>
        </div>
        <p className="text-sm font-semibold text-white opacity-90">
          {streak === 0 ? '🎯 Start your streak today!' : `✨ ${streak} day${streak !== 1 ? 's' : ''} of pure consistency`}
        </p>
      </div>
    </div>
  )
}
