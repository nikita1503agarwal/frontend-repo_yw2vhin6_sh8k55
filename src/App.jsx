import { useEffect, useState, useCallback } from 'react'
import Header from './components/Header'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'

function App() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      const res = await fetch(`${baseUrl}/api/tasks`)
      if (!res.ok) throw new Error('Failed to fetch tasks')
      const data = await res.json()
      setItems(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [baseUrl])

  useEffect(() => { fetchTasks() }, [fetchTasks])

  const addTask = async (title) => {
    const res = await fetch(`${baseUrl}/api/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    })
    if (!res.ok) throw new Error('Failed to add task')
    await fetchTasks()
  }

  const toggleTask = async (task) => {
    const res = await fetch(`${baseUrl}/api/tasks/${task.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !task.completed })
    })
    if (!res.ok) return
    setItems((prev) => prev.map((t) => t.id === task.id ? { ...t, completed: !t.completed } : t))
  }

  const deleteTask = async (task) => {
    const res = await fetch(`${baseUrl}/api/tasks/${task.id}`, { method: 'DELETE' })
    if (!res.ok) return
    setItems((prev) => prev.filter((t) => t.id !== task.id))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.06),transparent_50%)]"></div>
      <div className="relative max-w-2xl mx-auto px-6 py-14">
        <Header count={items.length} />

        <div className="bg-slate-900/40 border border-blue-500/20 rounded-2xl p-6 backdrop-blur-sm shadow-xl">
          <TodoInput onAdd={addTask} />

          <div className="mt-6">
            {loading ? (
              <p className="text-blue-200">Loading tasks...</p>
            ) : error ? (
              <p className="text-red-300">{error}</p>
            ) : (
              <TodoList items={items} onToggle={toggleTask} onDelete={deleteTask} />
            )}
          </div>
        </div>

        <div className="text-center mt-8 text-blue-300/70 text-sm">
          Tip: You can toggle a task by clicking on it.
        </div>
      </div>
    </div>
  )
}

export default App
