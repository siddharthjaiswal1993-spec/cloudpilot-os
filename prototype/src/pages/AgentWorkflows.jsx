import React from 'react'
import AgentCard from '../components/AgentCard.jsx'
import { agents } from '../data/mockData.js'

const workflowSteps = [
  { label: 'Scan accounts', status: 'done', agent: 'Security Posture Agent' },
  { label: 'Evaluate 2,167 resources', status: 'done', agent: 'Policy & Rules Engine' },
  { label: 'Generate findings', status: 'done', agent: 'Security Posture Agent' },
  { label: 'Score & prioritize', status: 'running', agent: 'AI Reasoning' },
  { label: 'Draft remediation plans', status: 'pending', agent: 'Remediation Agent' },
  { label: 'Submit to approval queue', status: 'pending', agent: 'Orchestration Layer' },
]

export default function AgentWorkflows() {
  return (
    <div>
      <div className="metrics-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 20 }}>
        <div className="metric-card">
          <div className="metric-card-label">Active Agents</div>
          <div className="metric-card-value metric-blue">8</div>
          <div className="metric-card-sub">All systems healthy</div>
        </div>
        <div className="metric-card">
          <div className="metric-card-label">Currently Running</div>
          <div className="metric-card-value metric-green">2</div>
          <div className="metric-card-sub">Security + Compliance agents</div>
        </div>
        <div className="metric-card">
          <div className="metric-card-label">Runs Today</div>
          <div className="metric-card-value">24</div>
          <div className="metric-card-sub">100% completion rate</div>
        </div>
        <div className="metric-card">
          <div className="metric-card-label">AI Cost Today</div>
          <div className="metric-card-value">$0.59</div>
          <div className="metric-card-sub">Across all agents</div>
        </div>
      </div>

      <div className="two-col-wide">
        <div>
          <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 12, fontSize: 11 }}>
            AI Agents
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {agents.map(agent => <AgentCard key={agent.id} agent={agent} />)}
          </div>
        </div>

        <div>
          <div className="card" style={{ marginBottom: 16 }}>
            <div className="card-header">
              <div className="card-title">Active Workflow</div>
              <span className="badge badge-green">● Running</span>
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 14 }}>
              Security Posture Scan · Started 12 min ago
            </div>
            {workflowSteps.map((step, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                <div style={{
                  width: 24, height: 24, borderRadius: '50%',
                  background: step.status === 'done' ? 'var(--accent-green-dim)' :
                    step.status === 'running' ? 'var(--accent-blue-dim)' : 'var(--border)',
                  color: step.status === 'done' ? 'var(--accent-green)' :
                    step.status === 'running' ? 'var(--accent-blue)' : 'var(--text-muted)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 700, flexShrink: 0,
                }}>
                  {step.status === 'done' ? '✓' : step.status === 'running' ? '●' : i + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: step.status === 'running' ? 600 : 400 }}>{step.label}</div>
                  <div className="text-xs">{step.agent}</div>
                </div>
                {step.status === 'running' && <span className="badge badge-blue">Running</span>}
                {step.status === 'done' && <span className="badge badge-green">Done</span>}
              </div>
            ))}
          </div>

          <div className="card">
            <div className="card-header">
              <div className="card-title">Agent Trust Scores</div>
              <span className="text-xs">Last 30 days</span>
            </div>
            {[
              { name: 'Cost Optimization', score: 84, acceptance: '68%' },
              { name: 'Security Posture', score: 91, acceptance: '74%' },
              { name: 'Compliance Evidence', score: 96, acceptance: '88%' },
              { name: 'Remediation', score: 97, acceptance: '100%' },
              { name: 'Reporting', score: 94, acceptance: '82%' },
            ].map(a => (
              <div key={a.name} style={{ marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3, fontSize: 13 }}>
                  <span>{a.name}</span>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <span className="text-muted text-sm">accept: {a.acceptance}</span>
                    <span className={a.score >= 90 ? 'text-green' : 'text-yellow'} style={{ fontWeight: 600 }}>
                      {a.score}
                    </span>
                  </div>
                </div>
                <div className="progress-bar">
                  <div className={`progress-fill ${a.score >= 90 ? 'fill-green' : 'fill-yellow'}`}
                    style={{ width: `${a.score}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
