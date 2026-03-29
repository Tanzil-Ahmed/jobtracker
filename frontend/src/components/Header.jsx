export default function Header({ onAdd }) {
  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">💼</span>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">JobTracker</h1>
            <p className="text-indigo-200 text-sm">Track your job applications</p>
          </div>
        </div>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 bg-white text-indigo-600 font-semibold px-5 py-2.5 rounded-lg shadow hover:bg-indigo-50 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add Job
        </button>
      </div>
    </header>
  )
}
