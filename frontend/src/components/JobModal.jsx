import { useState, useEffect } from 'react'

const STATUSES = ['APPLIED', 'INTERVIEW', 'OFFER', 'REJECTED']

export default function JobModal({ mode, job, onSubmit, onClose }) {
  const [form, setForm] = useState({ company: '', role: '', status: 'APPLIED' })
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (mode === 'edit' && job) {
      setForm({ company: job.company, role: job.role, status: job.status })
    }
  }, [mode, job])

  function validate() {
    const e = {}
    if (!form.company.trim()) e.company = 'Company name is required'
    if (!form.role.trim())    e.role    = 'Role is required'
    return e
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length) { setErrors(e2); return }
    setSaving(true)
    try {
      await onSubmit(form)
    } catch (err) {
      setErrors({ submit: err.message })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-[fadeIn_0.15s_ease]">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-800">
            {mode === 'add' ? '➕ Add New Job' : '✏️ Edit Job'}
          </h2>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Company */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Company <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.company}
              onChange={e => { setForm(f => ({ ...f, company: e.target.value })); setErrors(err => ({ ...err, company: '' })) }}
              placeholder="e.g. Google, Meta, Amazon"
              className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-colors outline-none
                focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400
                ${errors.company ? 'border-red-400 bg-red-50' : 'border-slate-300 bg-white'}`}
            />
            {errors.company && <p className="mt-1 text-xs text-red-500">{errors.company}</p>}
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Role <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.role}
              onChange={e => { setForm(f => ({ ...f, role: e.target.value })); setErrors(err => ({ ...err, role: '' })) }}
              placeholder="e.g. Software Engineer, Product Manager"
              className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-colors outline-none
                focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400
                ${errors.role ? 'border-red-400 bg-red-50' : 'border-slate-300 bg-white'}`}
            />
            {errors.role && <p className="mt-1 text-xs text-red-500">{errors.role}</p>}
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              value={form.status}
              onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-sm
                outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 cursor-pointer"
            >
              {STATUSES.map(s => (
                <option key={s} value={s}>
                  {s.charAt(0) + s.slice(1).toLowerCase()}
                </option>
              ))}
            </select>
          </div>

          {errors.submit && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
              {errors.submit}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-slate-300 text-slate-600 font-medium rounded-lg
                hover:bg-slate-50 transition-colors text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 px-4 py-2.5 bg-indigo-600 text-white font-medium rounded-lg
                hover:bg-indigo-700 transition-colors text-sm disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving…' : mode === 'add' ? 'Add Job' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
