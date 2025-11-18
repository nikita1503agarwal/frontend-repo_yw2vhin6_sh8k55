function TodoList({ items, onToggle, onDelete }) {
  if (!items.length) {
    return (
      <div className="text-center text-blue-200/70 py-10">No tasks yet. Add one above!</div>
    )
  }

  return (
    <ul className="space-y-2">
      {items.map((t) => (
        <li key={t.id} className="group flex items-center justify-between p-3 rounded-xl bg-slate-800/60 border border-blue-500/10">
          <button
            onClick={() => onToggle(t)}
            className={`text-left flex-1 mr-3 transition ${t.completed ? 'line-through text-blue-300/50' : 'text-blue-50'}`}
          >
            {t.title}
          </button>
          <div className="flex items-center gap-2">
            <span className={`text-xs px-2 py-1 rounded-full border ${t.completed ? 'border-emerald-400/30 text-emerald-300/80' : 'border-amber-400/30 text-amber-300/80'}`}>{t.completed ? 'Done' : 'Open'}</span>
            <button onClick={() => onDelete(t)} className="opacity-0 group-hover:opacity-100 transition text-red-300 hover:text-red-200">Delete</button>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default TodoList
