import React from 'react'

export default function Header({ title, sub }) {
  return (
    <div className="header">
      <div>
        <span className="header-title">{title}</span>
        {sub && <span className="header-sub">{sub}</span>}
      </div>
      <div className="header-spacer" />
      <div className="header-actions">
        <span style={{ fontSize: 11, color: 'var(--text-muted)', marginRight: 8 }}>
          Thu Jun 12, 2026 · 08:47 AM
        </span>
        <button className="btn btn-ghost btn-sm">🔔</button>
        <button className="btn btn-primary btn-sm">+ New Workflow</button>
      </div>
    </div>
  )
}
