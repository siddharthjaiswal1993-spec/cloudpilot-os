import React from 'react'

const riskColors = {
  low: 'var(--accent-green)', medium: 'var(--accent-yellow)',
  high: 'var(--accent-red)', critical: 'var(--accent-red)',
}
const riskBadge = {
  low: 'badge-green', medium: 'badge-yellow', high: 'badge-red', critical: 'badge-critical',
}

export default function RemediationDrawer({ item, onClose, onApprove }) {
  if (!item) return null
  const [approved, setApproved] = React.useState(false)

  function handleApprove() {
    setApproved(true)
    if (onApprove) onApprove(item)
  }

  return (
    <div className="drawer-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="drawer">
        <div className="drawer-header">
          <div className="drawer-title">Remediation Plan</div>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="flex items-center gap-8 mb-16">
          <span className={`badge ${riskBadge[item.risk]}`}>{item.risk.toUpperCase()} RISK</span>
          {item.requires_two_approvers && (
            <span className="badge badge-purple">2-PERSON APPROVAL</span>
          )}
        </div>

        <div className="card" style={{ padding: 14, marginBottom: 16 }}>
          <div style={{ fontWeight: 600, marginBottom: 6 }}>{item.title}</div>
          <div className="text-sm">Resource: <strong>{item.resource}</strong></div>
          <div className="text-sm">Account: <strong>{item.account}</strong></div>
          <div className="text-sm">Created by: {item.created_by} · {item.created_ago}</div>
          <div className="text-sm">Est. duration: {item.estimated_duration}</div>
          {item.scheduled_for && <div className="text-sm" style={{ color: 'var(--accent-blue)', marginTop: 4 }}>📅 Scheduled: {item.scheduled_for}</div>}
        </div>

        <div style={{ marginBottom: 16 }}>
          <div className="section-title">Execution Steps</div>
          {item.steps.map((step, i) => (
            <div key={i} className="step-item">
              <div className="step-num">{i + 1}</div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{step}</div>
            </div>
          ))}
        </div>

        <div className="rollback-box">
          <div className="rollback-title">⚠️ Rollback Plan</div>
          {item.rollback.map((step, i) => (
            <div key={i} className="text-sm" style={{ marginBottom: 4 }}>• {step}</div>
          ))}
        </div>

        {!approved && item.status === 'pending_approval' && (
          <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
            <button className="btn btn-success" style={{ flex: 1 }} onClick={handleApprove}>
              ✓ Approve & Schedule
            </button>
            <button className="btn btn-danger" style={{ flex: 1 }} onClick={onClose}>
              ✕ Reject
            </button>
          </div>
        )}

        {approved && (
          <div style={{ marginTop: 20, padding: 14, background: 'var(--accent-green-dim)', border: '1px solid var(--accent-green)', borderRadius: 8, color: 'var(--accent-green)', fontWeight: 500, textAlign: 'center' }}>
            ✓ Approved — Scheduled for next change window
          </div>
        )}

        {item.status === 'approved' && !approved && (
          <div style={{ marginTop: 20, padding: 14, background: 'var(--accent-blue-dim)', border: '1px solid var(--accent-blue)', borderRadius: 8, color: 'var(--accent-blue)', fontWeight: 500, textAlign: 'center' }}>
            ✓ Approved by {item.approved_by} · {item.approved_ago}
          </div>
        )}

        {item.status === 'completed' && (
          <div style={{ marginTop: 20, padding: 14, background: 'var(--accent-green-dim)', border: '1px solid var(--accent-green)', borderRadius: 8, color: 'var(--accent-green)', fontWeight: 500, textAlign: 'center' }}>
            ✓ Completed · {item.executed_ago} · Savings: ${item.savings_realized}/mo
          </div>
        )}
      </div>
    </div>
  )
}
