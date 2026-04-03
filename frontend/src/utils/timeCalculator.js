export const TIME_TAGS = [
  { id: 'sleep', label: 'Sleep', color: 'rgba(139, 92, 246, 0.3)', borderColor: 'rgba(139, 92, 246, 1)' },
  { id: 'study', label: 'Study', color: 'rgba(59, 130, 246, 0.3)', borderColor: 'rgba(59, 130, 246, 1)' },
  { id: 'work', label: 'Work', color: 'rgba(34, 197, 94, 0.3)', borderColor: 'rgba(34, 197, 94, 1)' },
  { id: 'eating', label: 'Eating', color: 'rgba(249, 115, 22, 0.3)', borderColor: 'rgba(249, 115, 22, 1)' },
  { id: 'travel', label: 'Travel', color: 'rgba(168, 85, 247, 0.3)', borderColor: 'rgba(168, 85, 247, 1)' },
  { id: 'screen', label: 'Screen Time', color: 'rgba(14, 165, 233, 0.3)', borderColor: 'rgba(14, 165, 233, 1)' },
  { id: 'exercise', label: 'Exercise', color: 'rgba(239, 68, 68, 0.3)', borderColor: 'rgba(239, 68, 68, 1)' },
  { id: 'other', label: 'Other', color: 'rgba(107, 114, 128, 0.3)', borderColor: 'rgba(107, 114, 128, 1)' },
]

export const calculateHours = (startTime, endTime) => {
  if (!startTime || !endTime) return 0
  
  const [startHour, startMin] = startTime.split(':').map(Number)
  const [endHour, endMin] = endTime.split(':').map(Number)
  
  const startTotalMin = startHour * 60 + startMin
  const endTotalMin = endHour * 60 + endMin
  
  let diffMin = endTotalMin - startTotalMin
  if (diffMin < 0) diffMin += 24 * 60
  
  return diffMin / 60
}

export const getTagById = (id) => {
  return TIME_TAGS.find(tag => tag.id === id) || TIME_TAGS[TIME_TAGS.length - 1]
}

export const aggregateHoursByTag = (schedules, dateStr = null) => {
  const result = {}
  TIME_TAGS.forEach(tag => {
    result[tag.id] = 0
  })

  schedules.forEach(schedule => {
    const scheduleDate = schedule.createdDate || schedule.date
    if (dateStr && scheduleDate !== dateStr) return

    const hours = calculateHours(schedule.startTime, schedule.endTime)
    
    if (schedule.status === 'completed') {
      const tag = schedule.scheduledTag || 'study'
      result[tag] = (result[tag] || 0) + hours
    } else if (schedule.status === 'missed' && schedule.actualTag) {
      result[schedule.actualTag] = (result[schedule.actualTag] || 0) + hours
    }
  })

  return result
}

export const getTotalHours = (hoursByTag) => {
  return Object.values(hoursByTag).reduce((sum, hours) => sum + hours, 0)
}
