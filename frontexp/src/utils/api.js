const AUTH_STORAGE_KEY = 'ledger.auth.v1'
const API_BASE = import.meta.env.VITE_API_BASE ?? 'http://localhost:4000'

function getStoredAuth() {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function saveStoredAuth(auth) {
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth))
  } catch {
    // ignore storage errors
  }
}

export function loadAuth() {
  return getStoredAuth()
}

export function saveAuth(auth) {
  saveStoredAuth(auth)
}

export function clearAuth() {
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY)
  } catch {
    // ignore
  }
}

async function apiFetch(path, options = {}) {
  const auth = getStoredAuth()
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  }

  if (auth?.token) {
    headers.Authorization = `Bearer ${auth.token}`
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
    credentials: 'omit'
  })

  const data = await response.json()
  if (!response.ok) {
    const error = new Error(data.message || 'API request failed')
    error.status = response.status
    throw error
  }

  return data
}

export async function registerRequest({ name, email, password }) {
  return apiFetch('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password })
  })
}

export async function loginRequest({ email, password }) {
  return apiFetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  })
}

export async function fetchEntries() {
  return apiFetch('/api/entries')
}

export async function createEntryRequest(entry) {
  return apiFetch('/api/entries', {
    method: 'POST',
    body: JSON.stringify(entry)
  })
}

export async function deleteEntryRequest(id) {
  return apiFetch(`/api/entries/${id}`, {
    method: 'DELETE'
  })
}
