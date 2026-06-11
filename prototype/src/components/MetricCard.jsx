import React from 'react'

export default function MetricCard({ label, value, sub, valueClass = '' }) {
  return (
    <div className="metric-card">
      <div className="metric-card-label">{label}</div>
      <div className={`metric-card-value ${valueClass}`}>{value}</div>
      {sub && <div className="metric-card-sub">{sub}</div>}
    </div>
  )
}
