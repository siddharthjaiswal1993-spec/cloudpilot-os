import React from 'react'
import { costRecommendations } from '../data/mockData.js'

const riskBadge = { low: 'badge-green', medium: 'badge-yellow', high: 'badge-red', critical: 'badge-critical' }
const typeBadge = { rightsize: 'badge-blue', idle: 'badge-gray', anomaly: 'badge-red' }
const typeLabel = { rightsize: 'Rightsize', idle: 'Idle', anomaly: 'Anomaly' }
const statusBadge = { pending: 'badge-yellow', approved: 'badge-blue', executed: 'badge-green' }

export default function CostIntelligence() {
  const [selected, setSelected] = React.useState(null)

  const totalSavings = costRecommendations.reduce((s, r) => s + r.savings, 0)
  const pendingCount = costRecommendations.filter(r => r.status === 'pending').length

  return (
    <div>
      <div className="metrics-grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
        <div className="metric-card">
          <div className="metric-card-label">Monthly Spend</div>
          <div className="metric-card-value metric-blue">$302.5K</div>
          <div className="metric-card-sub metric-up">-2.1% vs budget</div>
        </div>
        <div className="metric-card">
          <div className="metric-card-label">Savings Identified</div>
          <div className="metric-card-value metric-up">${(totalSavings / 1000).toFixed(1)}K/mo</div>
          <div className="metric-card-sub">From {costRecommendations.length} recommendations</div>
        </div>
        <div className="metric-card">
          <div className="metric-card-label">Savings Realized</div>
          <div className="metric-card-value metric-green">$29.8K/mo</div>
          <div className="metric-card-sub">70% realization rate</div>
        </div>
        <div className="metric-card">
          <div className="metric-card-label">Anomalies Active</div>
          <div className="metric-card-value metric-down">2</div>
          <div className="metric-card-sub">Require investigation</div>
        </div>
        <div className="metric-card">
          <div className="metric-card-label">Pending Review</div>
          <div className="metric-card-value metric-yellow">{pendingCount}</div>
          <div className="metric-card-sub">Recommendations to act on</div>
        </div>
      </div>

      <div className="two-col-wide">
        <div>
          <div className="card">
            <div className="card-header">
              <div className="card-title">💰 Cost Recommendations</div>
              <div style={{ display: 'flex', gap: 6 }}>
                <span className="text-xs">{pendingCount} pending review</span>
              </div>
            </div>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Resource</th>
                    <th>Recommendation</th>
                    <th>Savings/mo</th>
                    <th>Confidence</th>
                    <th>Risk</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {costRecommendations.map(r => (
                    <tr key={r.id} onClick={() => setSelected(r)} style={{ cursor: 'pointer' }}>
                      <td><span className={`badge ${typeBadge[r.type]}`}>{typeLabel[r.type]}</span></td>
                      <td>
                        <div style={{ fontWeight: 500, fontSize: 13 }}>{r.resource}</div>
                        <div className="text-xs">{r.account}</div>
                      </td>
                      <td>
                        <div className="text-sm truncate" style={{ maxWidth: 200 }}>
                          {r.current} → {r.recommended}
                        </div>
                      </td>
                      <td className="text-green" style={{ fontWeight: 600 }}>
                        ${r.savings.toLocaleString()}
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <div className="progress-bar" style={{ width: 40 }}>
                            <div className={`progress-fill ${r.confidence >= 80 ? 'fill-green' : r.confidence >= 60 ? 'fill-yellow' : 'fill-red'}`}
                              style={{ width: `${r.confidence}%` }} />
                          </div>
                          <span className="text-sm">{r.confidence}%</span>
                        </div>
                      </td>
                      <td><span className={`badge ${riskBadge[r.risk]}`}>{r.risk}</span></td>
                      <td><span className={`badge ${statusBadge[r.status]}`}>{r.status}</span></td>
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
                <div className="card-title">Recommendation Detail</div>
                <button className="close-btn" onClick={() => setSelected(null)}>✕</button>
              </div>
              <div className="mb-8">
                <span className={`badge ${riskBadge[selected.risk]}`}>{selected.risk.toUpperCase()} RISK</span>
                <span className={`badge ${typeBadge[selected.type]}`} style={{ marginLeft: 6 }}>{typeLabel[selected.type]}</span>
              </div>
              <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 12 }}>{selected.resource}</div>
              <div className="text-sm mb-8"><strong>Current:</strong> {selected.current}</div>
              <div className="text-sm mb-8"><strong>Recommended:</strong> {selected.recommended}</div>
              <div className="text-sm mb-8"><strong>Est. savings:</strong> <span className="text-green">${selected.savings}/month</span></div>
              <div className="text-sm mb-16"><strong>Confidence:</strong> {selected.confidence}%</div>
              <div className="divider" />
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>AI Reasoning</div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, background: 'var(--bg-secondary)', padding: 12, borderRadius: 8, border: '1px solid var(--border)' }}>
                🤖 {selected.reasoning}
              </div>
              {selected.status === 'pending' && (
                <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                  <button className="btn btn-success" style={{ flex: 1 }}>✓ Create Workflow</button>
                  <button className="btn btn-ghost" style={{ flex: 1 }}>✕ Dismiss</button>
                </div>
              )}
            </div>
          ) : (
            <div className="card">
              <div className="card-header">
                <div className="card-title">Spend by Service</div>
              </div>
              {[
                { service: 'EC2 Compute', amount: 148200, pct: 49 },
                { service: 'RDS Databases', amount: 64800, pct: 21 },
                { service: 'Data Transfer', amount: 38400, pct: 13 },
                { service: 'EKS / Kubernetes', amount: 28400, pct: 9 },
                { service: 'S3 Storage', amount: 12800, pct: 4 },
                { service: 'Other', amount: 9900, pct: 4 },
              ].map(s => (
                <div key={s.service} style={{ marginBottom: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 13 }}>
                    <span>{s.service}</span>
                    <span style={{ color: 'var(--text-secondary)' }}>${(s.amount / 1000).toFixed(1)}K ({s.pct}%)</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill fill-blue" style={{ width: `${s.pct * 2}%` }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="card" style={{ marginTop: 0 }}>
            <div className="card-header"><div className="card-title">Savings Pipeline</div></div>
            {[
              { stage: 'Identified', value: 42847, color: 'var(--accent-blue)' },
              { stage: 'Approved', value: 18240, color: 'var(--accent-yellow)' },
              { stage: 'Realized', value: 29800, color: 'var(--accent-green)' },
            ].map(s => (
              <div key={s.stage} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <div style={{ width: 80, fontSize: 12, color: 'var(--text-muted)' }}>{s.stage}</div>
                <div style={{ flex: 1 }}>
                  <div className="progress-bar">
                    <div style={{ height: '100%', borderRadius: 3, background: s.color, width: `${s.value / 42847 * 100}%` }} />
                  </div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: s.color, width: 60, textAlign: 'right' }}>
                  ${(s.value / 1000).toFixed(1)}K
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
