import { useState } from 'react'

export default function TaskCard({ task, onUpdate, onDelete }) {
  const [showInput, setShowInput] = useState(false)
  const [missedNote, setMissedNote] = useState('')

  const handleComplete = () => {
    onUpdate(task.id, { completed: true, status: 'completed', note: null })
  }

  const handleMissed = () => {
    setShowInput(true)
  }

  const handleSaveMissed = () => {
    onUpdate(task.id, { completed: false, status: 'missed', note: missedNote })
    setShowInput(false)
    setMissedNote('')
  }

  const handleReset = () => {
    onUpdate(task.id, { completed: false, status: null, note: null })
    setShowInput(false)
    setMissedNote('')
  }

  return (
    <div 
      className="glass rounded-xl p-6 transition-all duration-300 hover:border-opacity-20 group"
      style={{ borderColor: 'var(--color-border)' }}
    >
      {/* Time and Task Name */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-sm font-semibold" style={{ color: 'var(--color-primary)' }}>
            {task.startTime} - {task.endTime}
          </p>
          <p className="text-lg font-bold text-foreground mt-2">{task.taskName}</p>
        </div>
        <button
          onClick={() => onDelete(task.id)}
          className="text-foreground-secondary hover:text-primary transition-colors text-2xl ml-2 opacity-0 group-hover:opacity-100"
        >
          ×
        </button>
      </div>

      {/* Status Display */}
      {task.status === 'completed' && (
        <div className="rounded-lg p-4 mb-4 flex items-center gap-3" style={{
          background: `linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(52, 211, 153, 0.1) 100%)`,
          borderLeft: `4px solid var(--color-success-light)`
        }}>
          <span className="text-success-light text-2xl">✓</span>
          <p className="text-sm font-semibold text-success-light">Completed</p>
        </div>
      )}

      {task.status === 'missed' && (
        <div className="rounded-lg p-4 mb-4" style={{
          background: `linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.1) 100%)`,
          borderLeft: `4px solid #ef4444`
        }}>
          <p className="text-sm font-semibold mb-2" style={{ color: '#fca5a5' }}>What you did instead:</p>
          <p className="text-sm" style={{ color: '#fed2d2' }}>{task.note || 'No note added'}</p>
        </div>
      )}

      {!task.status && (
        <>
          {!showInput && (
            <div className="flex gap-3">
              <button
                onClick={handleComplete}
                className="flex-1 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, var(--color-success) 0%, var(--color-success-light) 100%)`,
                  boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)'
                }}
              >
                <span>✓</span> Completed
              </button>
              <button
                onClick={handleMissed}
                className="flex-1 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, #ef4444 0%, #dc2626 100%)`,
                  boxShadow: '0 4px 15px rgba(239, 68, 68, 0.3)'
                }}
              >
                <span>✕</span> Missed
              </button>
            </div>
          )}

          {showInput && (
            <div className="space-y-3">
              <input
                type="text"
                value={missedNote}
                onChange={(e) => setMissedNote(e.target.value)}
                placeholder="What did you do instead?"
                className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 text-sm text-foreground"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderColor: 'var(--color-border)',
                  borderWidth: '1px',
                  focusRingColor: 'var(--color-primary)'
                }}
              />
              <div className="flex gap-2">
                <button
                  onClick={handleSaveMissed}
                  className="flex-1 text-white font-semibold py-2 px-3 rounded-lg transition-all duration-300 text-sm hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%)`,
                    boxShadow: '0 4px 15px rgba(255, 107, 53, 0.3)'
                  }}
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setShowInput(false)
                    setMissedNote('')
                  }}
                  className="flex-1 font-semibold py-2 px-3 rounded-lg transition-colors text-sm text-foreground-secondary hover:text-foreground"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderColor: 'var(--color-border)',
                    borderWidth: '1px'
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {task.status && (
        <button
          onClick={handleReset}
          className="w-full font-semibold py-2 px-3 rounded-lg transition-colors text-sm text-foreground-secondary hover:text-foreground"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            borderColor: 'var(--color-border)',
            borderWidth: '1px'
          }}
        >
          Reset Status
        </button>
      )}
    </div>
  )
}
