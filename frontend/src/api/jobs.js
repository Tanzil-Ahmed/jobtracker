const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Request failed')
  return data.data
}

export const getJobs   = ()          => request('/jobs')
export const createJob = (job)       => request('/jobs',      { method: 'POST', body: JSON.stringify(job) })
export const updateJob = (id, job)   => request(`/jobs/${id}`,{ method: 'PUT',  body: JSON.stringify(job) })
export const deleteJob = (id)        => request(`/jobs/${id}`,{ method: 'DELETE' })
