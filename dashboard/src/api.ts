import type { RosterRow } from './roster'

/**
 * Relative path on purpose. The Vite dev proxy (vite.config.ts) forwards
 * /api to the Spring Boot backend on :8080, so the browser only ever talks
 * to its own origin and CORS never enters the picture.
 *
 * In production this needs either a CORS config on the Java side or the
 * built files served from Spring Boot.
 */
const API_BASE = '/api'

/**
 * Coverage roster for a day. Omit `date` for today.
 *
 * @param date ISO date, "YYYY-MM-DD"
 */
export async function fetchRoster(date?: string): Promise<RosterRow[]> {
  const url = date
    ? `${API_BASE}/schedules/roster?date=${encodeURIComponent(date)}`
    : `${API_BASE}/schedules/roster`

  const response = await fetch(url)

  // Without this a 500 would resolve happily and render as an empty table.
  if (!response.ok) {
    throw new Error(`Request failed with ${response.status}`)
  }

  return response.json() as Promise<RosterRow[]>
}
