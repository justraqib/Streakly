export default function ProgressSummary({ tasks }) {
  const total = tasks.length
  const completed = tasks.filter(t => t.status === 'completed').length
  const missed = tasks.filter(t => t.status === 'missed').length
  const pending = total - completed - missed
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100)

  return (
    <div className="bg-white rounded-lg border border-border p-6 shadow-sm">
      <h3 className="text-lg font-bold text-foreground mb-6">Progress Summary</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center">
          <p className="text-3xl font-bold text-primary">{total}</p>
          <p className="text-sm text-neutral mt-1">Total Tasks</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-success">{completed}</p>
          <p className="text-sm text-neutral mt-1">Completed</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-red-500">{missed}</p>
          <p className="text-sm text-neutral mt-1">Missed</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-primary">{pending}</p>
          <p className="text-sm text-neutral mt-1">Pending</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-foreground">Completion Rate</p>
          <p className="text-sm font-bold text-primary">{percentage}%</p>
        </div>
        <div className="w-full bg-neutral rounded-full h-3 overflow-hidden">
          <div
            className="bg-primary h-full rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  )
}
