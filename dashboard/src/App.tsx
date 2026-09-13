import { useEffect, useState } from 'react'
import heroImg from './assets/logo.svg'
import './App.css'
import { fetchRoster } from './api'
import {
  coverageSummary,
  formatTour,
  sortedRoster,
  statusLabels,
  statusMarks,
  type RosterRow,
} from './roster'

const NAV = [
  { label: 'Coverage', current: true },
  { label: 'Schedules', current: false },
  { label: 'Employees', current: false },
  { label: 'Announcements', current: false },
]

const SKELETON_ROWS = 6

function App() {
  const [rows, setRows] = useState<RosterRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    // Guards against setting state after the component unmounts, which
    // happens in dev because StrictMode mounts effects twice.
    let cancelled = false

    fetchRoster()
      .then((data) => {
        if (!cancelled) {
          setRows(data)
          setError('')
        }
      })
      .catch((requestError: unknown) => {
        console.error('Roster fetch failed:', requestError)
        if (!cancelled) {
          setError('Could not reach the schedule service.')
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [])

  const now = new Date()
  const today = now.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
  // A page-load timestamp, not a live clock — labelled as such so it doesn't
  // read as the current time when the tab has been open for an hour.
  const loadedAt = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  })

  const summary = coverageSummary(rows)
  const roster = sortedRoster(rows)

  // Tiles show an em dash rather than a misleading 0 before data lands.
  const tileValue = (value: number) => (loading || error ? '—' : value)

  return (
    <>
      <header className="page-header">
        <div className="hero">
          <img src={heroImg} className="base" alt="" />
        </div>
        <div className="brand">
          <h1>USPS Supervisor</h1>
        </div>
        
        <div className="page-date">
          <p className="date">{today}</p>
          <p className="time">as of {loadedAt}</p>
        </div>
      </header>

      <div className="app-body">
        <aside id="sidebar">
          <nav id="sidebar-nav" aria-label="Dashboard sections">
            {NAV.map(({ label, current }) => (
              <a
                key={label}
                href="#"
                aria-current={current ? 'page' : undefined}
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="sidebar-footer">
            <p className="station">Midtown Station</p>
            <p className="role">Supervisor</p>
          </div>
        </aside>

        <main className="content">
          {error ? (
            <div className="banner" role="alert">
              <span aria-hidden="true">▲</span>
              <span>
                {error} Start the backend with{' '}
                <code>./mvnw spring-boot:run</code> in <code>backend/</code>.
              </span>
            </div>
          ) : null}

          <div className="tiles">
            <div className="tile">
              <p className="tile-value">
                {loading || error
                  ? '—'
                  : `${summary.covered} / ${summary.scheduled}`}
              </p>
              <p className="tile-label">Covered</p>
            </div>
            <div className="tile">
              <p className="tile-value tile-alert">
                {tileValue(summary.uncovered)}
              </p>
              <p className="tile-label">Uncovered</p>
            </div>
            <div className="tile">
              <p className="tile-value tile-alert">
                {tileValue(summary.calledOut)}
              </p>
              <p className="tile-label">Called out</p>
            </div>
            <div className="tile">
              <p className="tile-value tile-late">{tileValue(summary.late)}</p>
              <p className="tile-label">Late</p>
            </div>
          </div>

          <div className="roster">
            <table className="roster-table">
              <thead>
                <tr>
                  <th scope="col" className="col-route">
                    Route
                  </th>
                  <th scope="col">Carrier</th>
                  <th scope="col" className="col-bt">
                    BT
                  </th>
                  <th scope="col" className="col-status">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  // Skeleton rows rather than a spinner, so the layout
                  // doesn't jump when the data lands.
                  Array.from({ length: SKELETON_ROWS }, (_, i) => (
                    <tr key={i} aria-hidden="true">
                      <td colSpan={4}>
                        <span className="skeleton" />
                      </td>
                    </tr>
                  ))
                ) : roster.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="roster-empty">
                      {error
                        ? 'No data to show.'
                        : 'No one is scheduled for this tour.'}
                    </td>
                  </tr>
                ) : (
                  roster.map(({ carrier, route, bt, status }) => (
                    <tr key={route}>
                      <td className="cell-route">{route}</td>
                      <td>{carrier || '—'}</td>
                      <td className="cell-bt">{formatTour(bt)}</td>
                      <td>
                        <span className={`badge badge-${status}`}>
                          <span className="badge-mark" aria-hidden="true">
                            {statusMarks[status]}
                          </span>
                          {statusLabels[status]}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </>
  )
}

export default App
