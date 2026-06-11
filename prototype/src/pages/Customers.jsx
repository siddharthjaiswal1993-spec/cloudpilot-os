import React from 'react'
import { customers } from '../data/mockData.js'

function healthColor(score) {
  if (score >= 85) return 'var(--accent-green)'
  if (score >= 70) return 'var(--accent-yellow)'
  if (score >= 55) return '#e87a35'
  return 'var(--accent-red)'
}
function healthFill(score) {
  if (score >= 85) return 'fill-green'
  if (score >= 70) return 'fill-yellow'
  return 'fill-red'
}

const tierBadge = { Enterprise: 'badge-blue', Premium: 'badge-purple', Standard: 'badge-gray' }
const statusBadge = { green: 'badge-green', amber: 'badge-yellow', red: 'badge-red' }

export default function Customers() {
  const [selected, setSelected] = React.useState(null)

  const red = customers.filter(c => c.status === 'red')
  const amber = customers.filter(c => c.status === 'amber')
  const green = customers.filter(c => c.status === 'green')
  const sorted = [...red, ...amber, ...green]

  return (
    <div>
      <div className="metrics-grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
        <div className="metric-card">
          <div className="metric-card-label">Total Customers</div>
          <div className="metric-card-value metric-blue">8</div>
          <div className="metric-card-sub">Active managed accounts</div>
        </div>
        <div className="metric-card">
          <div className="metric-card-label">Need Attention</div>
          <div className="metric-card-value metric-down">2</div>
          <div className="metric-card-sub">Health score below 60</div>
        </div>
        <div className="metric-card">
          <div className="metric-card-label">Avg Health Score</div>
          <div className="metric-card-value metric-yellow">73</div>
          <div className="metric-card-sub">Across all customers</div>
        </div>
        <div className="metric-card">
          <div className="metric-card-label">Total Managed Spend</div>
          <div className="metric-card-value metric-blue">$699.4K</div>
          <div className="metric-card-sub">Monthly cloud spend</div>
        </div>
        <div className="metric-card">
          <div className="metric-card-label">Reports Due</div>
          <div className="metric-card-value">8</div>
          <div className="metric-card-sub">June month-end</div>
        </div>
      </div>

      <div className="two-col-wide">
        <div>
          <div className="card">
            <div className="card-header">
              <div className="card-title">🏢 Customer Portfolio</div>
              <span className="text-xs">Sorted by health score · 2 need attention</span>
            </div>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Tier</th>
                    <th>Health</th>
                    <th>7-Day Trend</th>
                    <th>Spend</th>
                    <th>Critical</th>
                    <th>Engineer</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {sorted.map(c => (
                    <tr key={c.id} onClick={() => setSelected(c)} style={{ cursor: 'pointer' }}>
                      <td>
                        <div style={{ fontWeight: 500 }}>{c.name}</div>
                        <div className="text-xs">{c.industry}</div>
                      </td>
                      <td><span className={`badge ${tierBadge[c.tier]}`}>{c.tier}</span></td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div className="progress-bar" style={{ width: 50 }}>
                            <div className={`progress-fill ${healthFill(c.health)}`} style={{ width: `${c.health}%` }} />
                          </div>
                          <span style={{ color: healthColor(c.health), fontWeight: 600, fontSize: 13 }}>{c.health}</span>
                        </div>
                      </td>
                      <td>
                        <span style={{ color: c.trend > 0 ? 'var(--accent-green)' : c.trend < 0 ? 'var(--accent-red)' : 'var(--text-muted)', fontWeight: 500 }}>
                          {c.trend > 0 ? `+${c.trend}` : c.trend}
                        </span>
                      </td>
                      <td className="text-blue" style={{ fontWeight: 500 }}>
                        ${(c.spend / 1000).toFixed(1)}K
                      </td>
                      <td>
                        {c.criticals > 0
                          ? <span className="badge badge-critical">{c.criticals}</span>
                          : <span className="text-xs">—</span>}
                      </td>
                      <td className="text-sm">{c.engineer}</td>
                      <td>
                        <button className="btn btn-ghost btn-sm">View →</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div>
          {selected ? (
            <div className="card">
              <div className="card-header">
                <div>
                  <div className="card-title">{selected.name}</div>
                  <div className="text-xs">{selected.industry} · {selected.tier}</div>
                </div>
                <button className="close-btn" onClick={() => setSelected(null)}>✕</button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                <div style={{
                  width: 56, height: 56, borderRadius: '50%',
                  border: `3px solid ${healthColor(selected.health)}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 18, fontWeight: 700, color: healthColor(selected.health),
                  background: 'var(--bg-secondary)',
                }}>
                  {selected.health}
                </div>
                <div>
                  <div style={{ fontWeight: 600 }}>Health Score</div>
                  <div className="text-sm">7-day change: <span style={{ color: selected.trend >= 0 ? 'var(--accent-green)' : 'var(--accent-red)' }}>{selected.trend > 0 ? `+${selected.trend}` : selected.trend}</span></div>
                </div>
              </div>

              {selected.alert && (
                <div style={{ background: 'rgba(232,85,85,0.08)', border: '1px solid rgba(232,85,85,0.2)', borderRadius: 8, padding: 12, marginBottom: 14, fontSize: 13, color: 'var(--accent-red)' }}>
                  ⚠️ {selected.alert}
                </div>
              )}

              {[
                { label: 'Monthly Spend', value: `$${(selected.spend / 1000).toFixed(1)}K` },
                { label: 'Accounts Managed', value: selected.accounts },
                { label: 'Critical Findings', value: selected.criticals || '0' },
                { label: 'Assigned Engineer', value: selected.engineer },
              ].map(s => (
                <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border)', fontSize: 13 }}>
                  <span className="text-secondary">{s.label}</span>
                  <span style={{ fontWeight: 500 }}>{s.value}</span>
                </div>
              ))}

              <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                <button className="btn btn-primary btn-sm" style={{ flex: 1 }}>📊 Generate Report</button>
                <button className="btn btn-ghost btn-sm" style={{ flex: 1 }}>🔍 Open Account</button>
              </div>
            </div>
          ) : (
            <div className="card">
              <div className="card-header"><div className="card-title">Portfolio Health Summary</div></div>
              {[
                { label: 'Green (≥ 85)', count: green.length, color: 'var(--accent-green)' },
                { label: 'Amber (60–84)', count: amber.length, color: 'var(--accent-yellow)' },
                { label: 'Red (< 60)', count: red.length, color: 'var(--accent-red)' },
              ].map(s => (
                <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: s.color, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div className="progress-bar">
                      <div style={{ height: '100%', borderRadius: 3, background: s.color, width: `${s.count / customers.length * 100}%` }} />
                    </div>
                  </div>
                  <div style={{ width: 80, fontSize: 13, textAlign: 'right' }}>{s.label}: <strong>{s.count}</strong></div>
                </div>
              ))}
              <div className="divider" />
              <div className="text-sm">Click any customer to view details and take action.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
