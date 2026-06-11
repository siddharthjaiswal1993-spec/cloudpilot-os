import React from 'react'

const severityConfig = {
  critical: { class: 'badge-critical', label: 'Critical' },
  high: { class: 'badge-high', label: 'High' },
  medium: { class: 'badge-medium', label: 'Medium' },
  low: { class: 'badge-low', label: 'Low' },
}

const statusConfig = {
  open: { class: 'badge-red', label: 'Open' },
  in_progress: { class: 'badge-yellow', label: 'In Progress' },
  resolved: { class: 'badge-green', label: 'Resolved' },
  exception_requested: { class: 'badge-purple', label: 'Exception Req.' },
  pending: { class: 'badge-yellow', label: 'Pending' },
  approved: { class: 'badge-blue', label: 'Approved' },
  executed: { class: 'badge-green', label: 'Executed' },
}

export default function RiskTable({ findings, onSelect }) {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Severity</th>
            <th>Finding</th>
            <th>Resource</th>
            <th>Status</th>
            <th>Age</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {findings.map(f => {
            const sev = severityConfig[f.severity] || severityConfig.medium
            const st = statusConfig[f.status] || statusConfig.open
            return (
              <tr key={f.id}>
                <td><span className={`badge ${sev.class}`}>{sev.label}</span></td>
                <td style={{ maxWidth: 280 }}>
                  <div className="truncate" style={{ fontWeight: 500 }}>{f.title}</div>
                  <div className="text-xs" style={{ marginTop: 2 }}>{f.category}</div>
                </td>
                <td>
                  <div style={{ fontSize: 12 }}>{f.resource}</div>
                  <div className="text-xs">{f.account}</div>
                </td>
                <td><span className={`badge ${st.class}`}>{st.label}</span></td>
                <td className="text-sm">{f.age_hours ? `${f.age_hours}h` : '—'}</td>
                <td>
                  <button className="btn btn-ghost btn-sm" onClick={() => onSelect && onSelect(f)}>
                    Remediate →
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
