import { useState, useEffect } from 'react'
import Header from './components/Header'
import Navigation from './components/Navigation'
import DailyView from './views/DailyView'
import WeeklyView from './views/WeeklyView'
import MonthlyView from './views/MonthlyView'

function App() {
  const [currentView, setCurrentView] = useState('daily')
  const [schedules, setSchedules] = useState([])
  const [currentDate, setCurrentDate] = useState(new Date())

  // Load schedules from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('streakly_schedules')
    if (stored) {
      setSchedules(JSON.parse(stored))
    }
  }, [])

  // Save schedules to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('streakly_schedules', JSON.stringify(schedules))
  }, [schedules])

  const addSchedule = (schedule) => {
    const newSchedule = {
      ...schedule,
      id: Date.now(),
      createdDate: new Date().toISOString().split('T')[0],
    }
    setSchedules([...schedules, newSchedule])
  }

  const updateSchedule = (id, updates) => {
    setSchedules(schedules.map(s => s.id === id ? { ...s, ...updates } : s))
  }

  const deleteSchedule = (id) => {
    setSchedules(schedules.filter(s => s.id !== id))
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Navigation currentView={currentView} setCurrentView={setCurrentView} />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        {currentView === 'daily' && (
          <DailyView 
            schedules={schedules}
            currentDate={currentDate}
            onAddSchedule={addSchedule}
            onUpdateSchedule={updateSchedule}
            onDeleteSchedule={deleteSchedule}
          />
        )}
        {currentView === 'weekly' && (
          <WeeklyView 
            schedules={schedules}
            currentDate={currentDate}
          />
        )}
        {currentView === 'monthly' && (
          <MonthlyView 
            schedules={schedules}
            currentDate={currentDate}
          />
        )}
      </main>
    </div>
  )
}

export default App
