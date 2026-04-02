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
    <div className="bg-white rounded-lg border border-border p-4 shadow-sm hover:shadow-md transition-shadow">
      {/* Time and Task Name */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm font-semibold text-primary">
            {task.startTime} - {task.endTime}
          </p>
          <p className="text-lg font-medium text-foreground mt-1">{task.taskName}</p>
        </div>
        <button
          onClick={() => onDelete(task.id)}
          className="text-neutral hover:text-warning transition-colors text-lg"
        >
          ×
        </button>
      </div>

      {/* Status Display */}
      {task.status === 'completed' && (
        <div className="bg-primary-light rounded-lg p-3 mb-4 flex items-center gap-2">
          <span className="text-success text-xl">✓</span>
          <p className="text-sm font-medium text-foreground">Completed</p>
        </div>
      )}

      {task.status === 'missed' && (
        <div className="bg-red-50 rounded-lg p-3 mb-4">
          <p className="text-sm font-medium text-red-700 mb-1">What you did instead:</p>
          <p className="text-sm text-red-600">{task.note || 'No note added'}</p>
        </div>
      )}

      {!task.status && (
        <>
          {!showInput && (
            <div className="flex gap-3">
              <button
                onClick={handleComplete}
                className="flex-1 bg-success hover:bg-green-600 text-white font-medium py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <span>✓</span> Completed
              </button>
              <button
                onClick={handleMissed}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-2"
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
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-sm"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleSaveMissed}
                  className="flex-1 bg-primary hover:bg-primary-dark text-white font-medium py-2 px-3 rounded-lg transition-colors text-sm"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setShowInput(false)
                    setMissedNote('')
                  }}
                  className="flex-1 bg-neutral hover:bg-neutral border border-border text-foreground font-medium py-2 px-3 rounded-lg transition-colors text-sm"
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
          className="w-full text-neutral hover:text-foreground font-medium py-2 px-3 rounded-lg transition-colors text-sm border border-border"
        >
          Reset Status
        </button>
      )}
    </div>
  )
}
