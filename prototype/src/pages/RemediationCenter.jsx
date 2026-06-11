import React from 'react'
import RemediationDrawer from '../components/RemediationDrawer.jsx'
import { remediationActions } from '../data/mockData.js'

const riskBadge = { low: 'badge-green', medium: 'badge-yellow', high: 'badge-red', critical: 'badge-critical' }
const statusConfig = {
  pending_approval: { badge: 'badge-yellow', label: 'Pending Approval' },
  approved: { badge: 'badge-blue', label: 'Approved' },
  executing: { badge: 'badge-green', label: 'Executing' },
  completed: { badge: 'badge-green', label: 'Completed' },
}

export default function RemediationCenter() {
  const [selected, setSelected] = React.useState(null)
  const [items, setItems] = React.useState(remediationActions)

  function handleApprove(item) {
    setItems(prev => prev.map(r => r.id === item.id ? { ...r, status: 'approved' } : r))
  }

  const pending = items.filter(r => r.status === 'pending_approval')
  const approved = items.filter(r => r.status === 'approved')
  const completed = items.filter(r => r.status === 'completed')

  return (
    <div>
      <div className="metrics-grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
        <div className="metric-card">
          <div className="metric-card-label">Pending Approval</div>
          <div className="metric-card-value metric-yellow">{pending.length}</div>
          <div className="metric-card-sub">Awaiting decision</div>
        </div>
        <div className="metric-card">
          <div className="metric-card-label">Approved / Scheduled</div>
          <div className="metric-card-value metric-blue">{approved.length}</div>
          <div className="metric-card-sub">Ready to execute</div>
        </div>
        <div className="metric-card">
          <div className="metric-card-label">Completed This Month</div>
          <div className="metric-card-value metric-green">18</div>
          <div className="metric-card-sub">100% success rate</div>
        </div>
        <div className="metric-card">
          <div className="metric-card-label">Rollbacks</div>
          <div className="metric-card-value">0</div>
          <div className="metric-card-sub">This month</div>
        </div>
        <div className="metric-card">
          <div className="metric-card-label">Avg. Approval Time</div>
          <div className="metric-card-value">3.2h</div>
          <div className="metric-card-sub">From submission to decision</div>
        </div>
      </div>

      {pending.length > 0 && (
        <div style={{ background: 'rgba(245,166,35,0.08)', border: '1px solid rgba(245,166,35,0.2)', borderRadius: 10, padding: 16, marginBottom: 16 }}>
          <div style={{ fontWeight: 600, color: 'var(--accent-yellow)', marginBottom: 8 }}>
            ⚠️ {pending.length} remediation{pending.length > 1 ? 's' : ''} pending your approval
          </div>
          <div className="text-sm">Review and approve to execute changes within scheduled change windows.</div>
        </div>
      )}

      <div className="card">
        <div className="card-header">
          <div className="card-title">🔧 Remediation Queue</div>
          <span className="text-xs">{items.length} total items</span>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Remediation</th>
                <th>Resource</th>
                <th>Risk</th>
                <th>Status</th>
                <th>Created By</th>
                <th>Timing</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map(r => {
                const s = statusConfig[r.status] || statusConfig.pending_approval
                return (
                  <tr key={r.id}>
                    <td>
                      <div style={{ fontWeight: 500, fontSize: 13, maxWidth: 240 }}>{r.title}</div>
                      {r.requires_two_approvers && (
                        <span className="badge badge-purple" style={{ marginTop: 3 }}>2-person approval</span>
                      )}
                    </td>
                    <td>
                      <div className="text-sm">{r.resource}</div>
                      <div className="text-xs">{r.account}</div>
                    </td>
                    <td><span className={`badge ${riskBadge[r.risk]}`}>{r.risk}</span></td>
                    <td><span className={`badge ${s.badge}`}>{s.label}</span></td>
                    <td className="text-sm">{r.created_by}</td>
                    <td className="text-xs">
                      {r.status === 'completed' ? r.executed_ago :
                        r.scheduled_for || r.created_ago}
                    </td>
                    <td>
                      <button className="btn btn-ghost btn-sm" onClick={() => setSelected(r)}>
                        {r.status === 'pending_approval' ? 'Review →' : 'View →'}
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="two-col" style={{ marginTop: 16 }}>
        <div className="card">
          <div className="card-header"><div className="card-title">Change Windows</div></div>
          {[
            { env: 'Production', schedule: 'Tue & Thu 22:00–02:00', next: 'Tonight 22:00', status: 'green' },
            { env: 'Staging', schedule: 'Weekdays 18:00–08:00', next: 'Today 18:00', status: 'green' },
            { env: 'Development', schedule: 'Anytime', next: 'Available now', status: 'blue' },
            { env: 'Sandbox', schedule: 'Anytime', next: 'Available now', status: 'blue' },
          ].map(cw => (
            <div key={cw.env} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{cw.env}</div>
                <div className="text-xs">{cw.schedule}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div className={`text-${cw.status}`} style={{ fontSize: 12 }}>{cw.next}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="card">
          <div className="card-header"><div className="card-title">This Month's Activity</div></div>
          {[
            { label: 'Remediations completed', value: 18, color: 'text-green' },
            { label: 'Savings realized', value: '$29,800/mo', color: 'text-green' },
            { label: 'Avg execution time', value: '8.4 min', color: 'text-blue' },
            { label: 'Rollback events', value: '0', color: 'text-green' },
            { label: 'Two-person approvals', value: '2', color: 'text-blue' },
            { label: 'Emergency changes', value: '1', color: 'text-yellow' },
          ].map(s => (
            <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border)', fontSize: 13 }}>
              <span className="text-secondary">{s.label}</span>
              <span className={s.color} style={{ fontWeight: 600 }}>{s.value}</span>
            </div>
          ))}
        </div>
      </div>

      {selected && (
        <RemediationDrawer
          item={selected}
          onClose={() => setSelected(null)}
          onApprove={handleApprove}
        />
      )}
    </div>
  )
}
