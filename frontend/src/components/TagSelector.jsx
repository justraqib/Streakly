import { TIME_TAGS } from '../utils/timeCalculator'

export default function TagSelector({ onSelect, selectedTag = null }) {
  return (
    <div className="flex flex-wrap gap-2">
      {TIME_TAGS.map(tag => (
        <button
          key={tag.id}
          onClick={() => onSelect(tag.id)}
          className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${
            selectedTag === tag.id ? 'ring-2 scale-105' : 'hover:scale-105'
          }`}
          style={{
            background: selectedTag === tag.id ? tag.borderColor : tag.color,
            borderColor: tag.borderColor,
            borderWidth: '2px',
            color: selectedTag === tag.id ? 'white' : 'var(--color-foreground)',
          }}
        >
          {tag.label}
        </button>
      ))}
    </div>
  )
}
