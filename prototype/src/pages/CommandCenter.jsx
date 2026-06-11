import React from 'react'
import MetricCard from '../components/MetricCard.jsx'
import AiAssistantPanel from '../components/AiAssistantPanel.jsx'
import { metrics, dailyBrief, accounts } from '../data/mockData.js'

function HealthScore({ score, label }) {
  const color = score >= 80 ? 'var(--accent-green)' : score >= 65 ? 'var(--accent-yellow)' : 'var(--accent-red)'
  const pct = score
  return (
    <div style={{ textAlign: 'center' }}>
      <svg width="80" height="80" viewBox="0 0 80 80">
        <circle cx="40" cy="40" r="34" fill="none" stroke="var(--border)" strokeWidth="6"/>
        <circle cx="40" cy="40" r="34" fill="none" stroke={color} strokeWidth="6"
          strokeDasharray={`${213.63 * pct / 100} 213.63`}
          strokeLinecap="round"
          transform="rotate(-90 40 40)"
        />
        <text x="40" y="44" textAnchor="middle" fill={color} fontSize="18" fontWeight="700">{score}</text>
      </svg>
      <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>{label}</div>
    </div>
  )
}

export default function CommandCenter() {
  return (
    <div>
      <div className="metrics-grid" style={{ gridTemplateColumns: 'repeat(6, 1fr)' }}>
        <MetricCard label="Cloud Accounts" value={metrics.totalAccounts} sub="8 connected" />
        <MetricCard label="Total Resources" value="2,167" sub="Last scan 6 min ago" />
        <MetricCard label="Monthly Spend" value="$302.5K" valueClass="metric-blue" sub="-2.1% vs budget ↓" />
        <MetricCard label="Critical Findings" value={metrics.openCriticalFindings} valueClass="metric-down" sub="Requires immediate action" />
        <MetricCard label="Pending Approvals" value={metrics.pendingRemediations} valueClass="metric-yellow" sub="In remediation queue" />
        <MetricCard label="Savings Identified" value="$42.8K/mo" valueClass="metric-up" sub="$29.8K realized" />
      </div>

      <div className="two-col-wide">
        <div>
          <div className="ai-panel">
            <div className="ai-panel-header">
              <span className="ai-badge">AI Daily Brief</span>
              <span className="ai-title">Thursday, June 12 · Generated at 07:00 AM</span>
            </div>
            <p className="ai-content">{dailyBrief.summary}</p>
            <div style={{ marginTop: 16 }}>
              {dailyBrief.items.map(item => (
                <div key={item.priority} style={{
                  display: 'flex', gap: 12, padding: '12px 0',
                  borderBottom: '1px solid var(--border)',
                }}>
                  <div style={{ fontSize: 18, flex_shrink: 0 }}>{item.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 3 }}>{item.title}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{item.detail}</div>
                  </div>
                  <button className="btn btn-ghost btn-sm" style={{ flex_shrink: 0, whiteSpace: 'nowrap' }}>
                    {item.action} →
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <div className="card-title">Cloud Health by Account</div>
              <span className="text-xs">All accounts · 8 of 8</span>
            </div>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Account</th>
                    <th>Provider</th>
                    <th>Environment</th>
                    <th>Health</th>
                    <th>Monthly Spend</th>
                    <th>Critical</th>
                  </tr>
                </thead>
                <tbody>
                  {accounts.map(a => {
                    const hc = a.health >= 80 ? 'metric-up' : a.health >= 65 ? 'metric-yellow' : 'metric-down'
                    return (
                      <tr key={a.id}>
                        <td style={{ fontWeight: 500, fontSize: 13 }}>{a.name}</td>
                        <td><span className="badge badge-blue">{a.provider}</span></td>
                        <td><span className="text-xs">{a.env}</span></td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div className="progress-bar" style={{ width: 60 }}>
                              <div className={`progress-fill ${a.health >= 80 ? 'fill-green' : a.health >= 65 ? 'fill-yellow' : 'fill-red'}`}
                                style={{ width: `${a.health}%` }} />
                            </div>
                            <span className={hc} style={{ fontSize: 13, fontWeight: 600 }}>{a.health}</span>
                          </div>
                        </td>
                        <td className="text-blue" style={{ fontWeight: 500 }}>${(a.spend / 1000).toFixed(1)}K</td>
                        <td>
                          {a.criticalFindings > 0
                            ? <span className="badge badge-critical">{a.criticalFindings}</span>
                            : <span className="text-xs">—</span>}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div>
          <div className="card" style={{ marginBottom: 16 }}>
            <div className="card-header">
              <div className="card-title">Health Scores</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around', padding: '8px 0' }}>
              <HealthScore score={77} label="Overall" />
              <HealthScore score={71} label="Cost" />
              <HealthScore score={76} label="Security" />
              <HealthScore score={88} label="Compliance" />
            </div>
          </div>

          <div className="card" style={{ marginBottom: 16 }}>
            <div className="card-header">
              <div className="card-title">Spend Trend</div>
              <span className="text-xs">6-month</span>
            </div>
            {[
              { month: 'Jan', spend: 280400, budget: 310000 },
              { month: 'Feb', spend: 295200, budget: 310000 },
              { month: 'Mar', spend: 308700, budget: 310000 },
              { month: 'Apr', spend: 291300, budget: 310000 },
              { month: 'May', spend: 318800, budget: 310000 },
              { month: 'Jun', spend: 302500, budget: 310000 },
            ].map(d => (
              <div key={d.month} style={{ marginBottom: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 3 }}>
                  <span className="text-muted">{d.month}</span>
                  <span className={d.spend > d.budget ? 'text-red' : 'text-green'} style={{ fontSize: 11 }}>
                    ${(d.spend / 1000).toFixed(0)}K
                  </span>
                </div>
                <div className="progress-bar">
                  <div className={`progress-fill ${d.spend > d.budget ? 'fill-red' : 'fill-blue'}`}
                    style={{ width: `${Math.min(100, d.spend / d.budget * 100)}%` }} />
                </div>
              </div>
            ))}
          </div>

          <AiAssistantPanel />
        </div>
      </div>
    </div>
  )
}
