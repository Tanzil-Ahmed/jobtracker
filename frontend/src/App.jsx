import { useState, useEffect, useCallback } from 'react'
import Header from './components/Header.jsx'
import StatsCards from './components/StatsCards.jsx'
import JobTable from './components/JobTable.jsx'
import JobModal from './components/JobModal.jsx'
import { getJobs, createJob, updateJob, deleteJob } from './api/jobs.js'

export default function App() {
  const [jobs, setJobs]       = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)
  const [filter, setFilter]   = useState('ALL')
  const [modal, setModal]     = useState({ open: false, mode: 'add', job: null })

  const loadJobs = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      setJobs(await getJobs())
    } catch {
      setError('Cannot reach the server. Start the Spring Boot backend on localhost:8080.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { loadJobs() }, [loadJobs])

  async function handleCreate(data) {
    await createJob(data)
    setModal({ open: false, mode: 'add', job: null })
    await loadJobs()
  }

  async function handleUpdate(data) {
    await updateJob(modal.job.id, data)
    setModal({ open: false, mode: 'add', job: null })
    await loadJobs()
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this application?')) return
    await deleteJob(id)
    await loadJobs()
  }

  const filtered = filter === 'ALL' ? jobs : jobs.filter(j => j.status === filter)

  return (
    <div className="min-h-screen bg-slate-50">
      <Header onAdd={() => setModal({ open: true, mode: 'add', job: null })} />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <StatsCards jobs={jobs} filter={filter} onFilter={setFilter} />

        {error && (
          <div className="mb-6 flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
            <span className="text-lg leading-none">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <JobTable
          jobs={filtered}
          loading={loading}
          filter={filter}
          onFilter={setFilter}
          onEdit={job => setModal({ open: true, mode: 'edit', job })}
          onDelete={handleDelete}
        />
      </main>

      {modal.open && (
        <JobModal
          mode={modal.mode}
          job={modal.job}
          onSubmit={modal.mode === 'add' ? handleCreate : handleUpdate}
          onClose={() => setModal({ open: false, mode: 'add', job: null })}
        />
      )}
    </div>
  )
}
