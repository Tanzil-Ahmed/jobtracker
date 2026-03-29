const STATUS_BADGE = {
  APPLIED:   'bg-blue-100 text-blue-700 border border-blue-200',
  INTERVIEW: 'bg-amber-100 text-amber-700 border border-amber-200',
  OFFER:     'bg-green-100 text-green-700 border border-green-200',
  REJECTED:  'bg-red-100 text-red-700 border border-red-200',
}

const TABS = ['ALL', 'APPLIED', 'INTERVIEW', 'OFFER', 'REJECTED']

export default function JobTable({ jobs, loading, filter, onFilter, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Filter tabs */}
      <div className="flex gap-1 p-3 border-b border-slate-100 bg-slate-50 overflow-x-auto">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => onFilter(tab)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors
              ${filter === tab
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-500 hover:bg-slate-200'
              }`}
          >
            {tab === 'ALL' ? 'All' : tab.charAt(0) + tab.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="text-left px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider w-10">#</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Company</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Role</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
              <th className="text-right px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-16 text-slate-400">
                  <div className="flex flex-col items-center gap-3">
                    <svg className="animate-spin h-8 w-8 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    <span>Loading jobs...</span>
                  </div>
                </td>
              </tr>
            ) : jobs.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-16 text-slate-400">
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-5xl">📭</span>
                    <p className="font-medium text-slate-500">No jobs found</p>
                    <p className="text-sm">Add your first job application to get started</p>
                  </div>
                </td>
              </tr>
            ) : (
              jobs.map((job, index) => (
                <tr key={job.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-slate-400 font-mono">{index + 1}</td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-slate-800">{job.company}</span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{job.role}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${STATUS_BADGE[job.status]}`}>
                      {job.status.charAt(0) + job.status.slice(1).toLowerCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onEdit(job)}
                        className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => onDelete(job.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {!loading && jobs.length > 0 && (
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 text-xs text-slate-400">
          Showing {jobs.length} application{jobs.length !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  )
}
