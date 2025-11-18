import { useState } from 'react'

function TodoInput({ onAdd }) {
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const addTask = async (e) => {
    e.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) return
    try {
      setLoading(true)
      setError('')
      await onAdd(trimmed)
      setTitle('')
    } catch (err) {
      setError(err.message || 'Failed to add task')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={addTask} className="flex gap-3">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1 px-4 py-3 rounded-xl bg-slate-800/70 border border-blue-500/20 text-blue-50 placeholder-blue-200/50 outline-none focus:ring-2 focus:ring-blue-500/40"
      />
      <button
        disabled={loading}
        className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium transition disabled:opacity-60"
      >
        {loading ? 'Adding...' : 'Add'}
      </button>
      {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
    </form>
  )
}

export default TodoInput
