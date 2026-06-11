import React from 'react'
import RiskTable from '../components/RiskTable.jsx'
import RemediationDrawer from '../components/RemediationDrawer.jsx'
import { securityFindings, complianceData, remediationActions } from '../data/mockData.js'

export default function SecurityCompliance() {
  const [tab, setTab] = React.useState('security')
  const [drawerItem, setDrawerItem] = React.useState(null)

  function handleRemediate(finding) {
    const action = remediationActions.find(r => r.finding === finding.id)
    setDrawerItem(action || {
      id: 'new', title: `Remediate: ${finding.title}`, finding: finding.id,
      resource: finding.resource, account: finding.account,
      risk: finding.severity, status: 'pending_approval',
      created_by: 'Security Posture Agent', created_ago: 'Just now',
      estimated_duration: '5-15 min', requires_two_approvers: finding.severity === 'critical',
      steps: finding.steps,
      rollback: ['Restore previous configuration from pre-execution snapshot'],
    })
  }

  return (
    <div>
      <div className="metrics-grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
        <div className="metric-card">
          <div className="metric-card-label">Security Posture</div>
          <div className="metric-card-value metric-yellow">76/100</div>
          <div className="metric-card-sub">+3 from last month</div>
        </div>
        <div className="metric-card">
          <div className="metric-card-label">Critical Findings</div>
          <div className="metric-card-value metric-down">3</div>
          <div className="metric-card-sub">Require immediate action</div>
        </div>
        <div className="metric-card">
          <div className="metric-card-label">High Findings</div>
          <div className="metric-card-value metric-yellow">21</div>
          <div className="metric-card-sub">Within SLA window</div>
        </div>
        <div className="metric-card">
          <div className="metric-card-label">MTTR Critical</div>
          <div className="metric-card-value metric-blue">6.3h</div>
          <div className="metric-card-sub">Target: &lt;8h ✓</div>
        </div>
        <div className="metric-card">
          <div className="metric-card-label">SOC 2 Readiness</div>
          <div className="metric-card-value metric-green">94%</div>
          <div className="metric-card-sub">Audit in 64 days</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 0, marginBottom: 16, borderBottom: '1px solid var(--border)' }}>
        {['security', 'compliance'].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: '10px 20px', background: 'none', border: 'none',
            borderBottom: `2px solid ${tab === t ? 'var(--accent-blue)' : 'transparent'}`,
            color: tab === t ? 'var(--accent-blue)' : 'var(--text-secondary)',
            cursor: 'pointer', fontWeight: tab === t ? 600 : 400, fontSize: 14,
            transition: 'all 0.15s',
          }}>
            {t === 'security' ? '🛡️ Security Findings' : '📋 Compliance'}
          </button>
        ))}
      </div>

      {tab === 'security' && (
        <div className="two-col-wide">
          <div>
            <div className="card">
              <div className="card-header">
                <div className="card-title">Security Findings</div>
                <span className="text-xs">7 total · sorted by severity</span>
              </div>
              <RiskTable findings={securityFindings} onSelect={handleRemediate} />
            </div>
          </div>
          <div>
            <div className="card" style={{ marginBottom: 16 }}>
              <div className="card-header"><div className="card-title">Findings by Category</div></div>
              {[
                { cat: 'Network', count: 2, color: 'fill-red' },
                { cat: 'IAM', count: 1, color: 'fill-red' },
                { cat: 'Storage', count: 2, color: 'fill-yellow' },
                { cat: 'Logging', count: 1, color: 'fill-yellow' },
                { cat: 'Encryption', count: 1, color: 'fill-blue' },
              ].map(c => (
                <div key={c.cat} style={{ marginBottom: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3, fontSize: 13 }}>
                    <span>{c.cat}</span>
                    <span className="text-muted">{c.count}</span>
                  </div>
                  <div className="progress-bar">
                    <div className={`progress-fill ${c.color}`} style={{ width: `${c.count / 7 * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="card">
              <div className="card-header"><div className="card-title">Posture Trend</div></div>
              {[
                { month: 'Mar', score: 68 }, { month: 'Apr', score: 71 },
                { month: 'May', score: 73 }, { month: 'Jun', score: 76 },
              ].map(m => (
                <div key={m.month} style={{ marginBottom: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3, fontSize: 13 }}>
                    <span>{m.month}</span>
                    <span className="text-green">{m.score}</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill fill-green" style={{ width: `${m.score}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'compliance' && (
        <div>
          <div className="three-col">
            {complianceData.frameworks.map(f => {
              const color = f.readiness >= 90 ? 'var(--accent-green)' : f.readiness >= 80 ? 'var(--accent-yellow)' : 'var(--accent-red)'
              const fillClass = f.readiness >= 90 ? 'fill-green' : f.readiness >= 80 ? 'fill-yellow' : 'fill-red'
              return (
                <div key={f.name} className="card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                    <div style={{ fontWeight: 600 }}>{f.name}</div>
                    <div style={{ fontSize: 22, fontWeight: 700, color }}>{f.readiness}%</div>
                  </div>
                  <div className="progress-bar" style={{ marginBottom: 12 }}>
                    <div className={`progress-fill ${fillClass}`} style={{ width: `${f.readiness}%` }} />
                  </div>
                  <div className="text-sm">Controls: <strong className="text-green">{f.passing} passing</strong> · <strong className="text-red">{f.failing} failing</strong></div>
                  {f.next_audit && (
                    <div className="text-xs" style={{ marginTop: 8 }}>📅 Next audit: {f.next_audit}</div>
                  )}
                  <div style={{ marginTop: 12, display: 'flex', gap: 6 }}>
                    <button className="btn btn-ghost btn-sm">View Controls</button>
                    <button className="btn btn-primary btn-sm">Generate Package</button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {drawerItem && (
        <RemediationDrawer
          item={drawerItem}
          onClose={() => setDrawerItem(null)}
          onApprove={() => setTimeout(() => setDrawerItem(null), 1500)}
        />
      )}
    </div>
  )
}
