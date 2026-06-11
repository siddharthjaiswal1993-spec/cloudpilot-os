import React from 'react'

export default function AgentCard({ agent }) {
  const statusColor = agent.status === 'running' ? 'var(--accent-green)' : 'var(--text-muted)'
  const statusLabel = agent.status === 'running' ? 'Running' : 'Idle'

  return (
    <div className="agent-card">
      <div className="agent-card-header">
        <div className="agent-icon" style={{ background: agent.colorDim }}>
          {agent.emoji}
        </div>
        <div>
          <div className="agent-name">{agent.name}</div>
          <div className="agent-status" style={{ color: statusColor }}>
            {agent.status === 'running' && '● '}
            {statusLabel} · {agent.last_run}
          </div>
        </div>
      </div>
      <div className="text-sm" style={{ marginBottom: 10, fontSize: 12 }}>{agent.last_run_summary}</div>
      {Object.entries(agent.stats).map(([k, v]) => (
        <div key={k} className="agent-stat">
          <strong>{v}</strong> {k.replace(/_/g, ' ')}
        </div>
      ))}
      <div className="agent-autonomy">
        <span>🔒</span>
        <span>{agent.autonomy}</span>
      </div>
    </div>
  )
}
