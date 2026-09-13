/**
 * Roster types and the pure helpers the Coverage page runs on.
 *
 * Shapes mirror GET /api/schedules/roster exactly, so a response can be
 * rendered without any mapping. `mockRoster` stays as an offline fallback.
 */

export type ShiftStatus =
  | 'on-duty'
  | 'late'
  | 'called-out'
  | 'uncovered'
  | 'ns'

export type RosterRow = {
  route: string
  /** Empty string when the route is unassigned. */
  carrier: string
  /** Begin tour as "HH:mm". Null on non-scheduled and uncovered rows. */
  bt: string | null
  status: ShiftStatus
}

export const mockRoster: RosterRow[] = [
  { carrier: '', route: '12', bt: null, status: 'uncovered' },
  { carrier: 'M. Ortiz', route: '08', bt: '08:00', status: 'called-out' },
  { carrier: 'R. Blake', route: '14', bt: '08:00', status: 'late' },
  { carrier: 'Sam Crawford', route: '03', bt: '08:00', status: 'on-duty' },
  { carrier: 'J. Reyes', route: '05', bt: '08:00', status: 'on-duty' },
  { carrier: 'T. Nguyen', route: '07', bt: '09:30', status: 'on-duty' },
  { carrier: 'L. Okafor', route: '09', bt: '09:30', status: 'on-duty' },
  { carrier: 'C. Silva', route: '11', bt: '10:00', status: 'on-duty' },
  { carrier: 'B. Hoang', route: '15', bt: '10:00', status: 'on-duty' },
  { carrier: 'A. Patel', route: '02', bt: null, status: 'ns' },
  { carrier: 'D. Kim', route: '04', bt: null, status: 'ns' },
  { carrier: 'P. Moreau', route: '06', bt: null, status: 'ns' },
]

/** Human-readable text for each status, for badges. */
export const statusLabels: Record<ShiftStatus, string> = {
  'on-duty': 'On duty',
  late: 'Late',
  'called-out': 'Called out',
  uncovered: 'Uncovered',
  ns: 'Non-scheduled',
}

/**
 * A shape per status, so a badge is never colour-alone — it stays readable
 * in greyscale, in print, and to a colourblind supervisor.
 */
export const statusMarks: Record<ShiftStatus, string> = {
  'on-duty': '●',
  late: '◆',
  'called-out': '▲',
  uncovered: '▲',
  ns: '○',
}

/**
 * Problems first, then by route. A supervisor should be able to stop reading
 * after the first few rows, so this is the table's core behaviour and it
 * should not depend on the order rows happen to arrive in.
 */
const statusOrder: Record<ShiftStatus, number> = {
  uncovered: 0,
  'called-out': 1,
  late: 2,
  'on-duty': 3,
  ns: 4,
}

export function sortedRoster(entries: RosterRow[]) {
  return [...entries].sort(
    (a, b) =>
      statusOrder[a.status] - statusOrder[b.status] ||
      a.route.localeCompare(b.route),
  )
}

/**
 * Tile numbers, derived from the roster rather than hardcoded.
 *
 * "Covered" counts people who are or will be there (on duty + late).
 * Called out and uncovered are both gaps.
 */
export function coverageSummary(entries: RosterRow[]) {
  const count = (s: ShiftStatus) => entries.filter((e) => e.status === s).length

  return {
    covered: count('on-duty') + count('late'),
    scheduled: entries.filter((e) => e.status !== 'ns').length,
    uncovered: count('uncovered'),
    calledOut: count('called-out'),
    late: count('late'),
  }
}

/**
 * Begin tour for display. The API sends "08:00"; older rows and the mobile
 * app use "0800". Accept both, and render an em dash for no time at all.
 */
export function formatTour(bt: string | null) {
  if (!bt) {
    return '—'
  }
  if (/^\d{4}$/.test(bt)) {
    return `${bt.slice(0, 2)}:${bt.slice(2)}`
  }
  return bt
}
