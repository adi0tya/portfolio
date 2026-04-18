import axios from 'axios'

// ── Base URL — reads from env in production, falls back to localhost ────────
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 8000,
  headers: { 'Content-Type': 'application/json' },
})

// ── Projects ───────────────────────────────────────────────────────────────

/** Fetch all projects from MongoDB */
export const fetchProjects = async () => {
  const { data } = await api.get('/api/projects')
  return data.data   // array of project documents
}

/** Add a new project (admin use) */
export const addProject = async (projectData) => {
  const { data } = await api.post('/api/projects', projectData)
  return data.data
}

// ── Contact ────────────────────────────────────────────────────────────────

/** Submit contact form — saves to MongoDB */
export const submitContact = async ({ name, email, message }) => {
  const { data } = await api.post('/api/contact', { name, email, message })
  return data   // { success, message }
}

export default api
