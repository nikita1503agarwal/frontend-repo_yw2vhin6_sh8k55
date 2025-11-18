import { useMemo } from 'react'

function Header({ count }) {
  const subtitle = useMemo(() => {
    if (count === 0) return 'No tasks yet — add your first one!'
    if (count === 1) return '1 task in your list'
    return `${count} tasks in your list`
  }, [count])

  return (
    <header className="text-center mb-8">
      <div className="inline-flex items-center justify-center mb-4">
        <img src="/flame-icon.svg" alt="Logo" className="w-14 h-14 drop-shadow-[0_0_20px_rgba(59,130,246,0.35)]" />
      </div>
      <h1 className="text-4xl font-bold text-white tracking-tight">Your Todo Board</h1>
      <p className="text-blue-200 mt-2">{subtitle}</p>
    </header>
  )
}

export default Header
