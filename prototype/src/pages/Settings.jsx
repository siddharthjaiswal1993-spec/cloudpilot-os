import React from 'react'
import { accounts } from '../data/mockData.js'

export default function Settings() {
  const [tab, setTab] = React.useState('accounts')

  const tabs = [
    { id: 'accounts', label: '🔌 Cloud Accounts' },
    { id: 'agents', label: '🤖 Agent Config' },
    { id: 'users', label: '👥 Users & Roles' },
    { id: 'integrations', label: '🔗 Integrations' },
  ]

  return (
    <div>
      <div style={{ display: 'flex', gap: 0, marginBottom: 20, borderBottom: '1px solid var(--border)' }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            padding: '10px 20px', background: 'none', border: 'none',
            borderBottom: `2px solid ${tab === t.id ? 'var(--accent-blue)' : 'transparent'}`,
            color: tab === t.id ? 'var(--accent-blue)' : 'var(--text-secondary)',
            cursor: 'pointer', fontWeight: tab === t.id ? 600 : 400, fontSize: 13,
          }}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'accounts' && (
        <div className="card">
          <div className="card-header">
            <div className="card-title">Connected Cloud Accounts</div>
            <button className="btn btn-primary btn-sm">+ Connect Account</button>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Account</th>
                  <th>Provider</th>
                  <th>Environment</th>
                  <th>Status</th>
                  <th>Write Access</th>
                  <th>Last Scan</th>
                  <th>Resources</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {accounts.map(a => (
                  <tr key={a.id}>
                    <td style={{ fontWeight: 500 }}>{a.name}</td>
                    <td><span className="badge badge-blue">{a.provider}</span></td>
                    <td className="text-sm">{a.env}</td>
                    <td><span className="badge badge-green">● Connected</span></td>
                    <td>
                      {a.write_enabled
                        ? <span className="badge badge-yellow">Enabled</span>
                        : <span className="badge badge-gray">Read only</span>}
                    </td>
                    <td className="text-xs">6 min ago</td>
                    <td className="text-sm">{a.resources.toLocaleString()}</td>
                    <td>
                      <button className="btn btn-ghost btn-sm">⚙</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'agents' && (
        <div>
          <div className="card">
            <div className="card-header"><div className="card-title">Agent Autonomy Configuration</div></div>
            {[
              { agent: 'Cost Optimization Agent', current: 'Level 1 — Recommend Only', max: 3, description: 'Generates rightsizing and savings recommendations. Requires approval to execute.' },
              { agent: 'Security Posture Agent', current: 'Level 0 — Observe', max: 1, description: 'Scans for misconfigurations and generates findings. Cannot initiate workflows.' },
              { agent: 'Compliance Evidence Agent', current: 'Level 1 — Evidence Only', max: 2, description: 'Collects evidence and generates audit packages. Cannot modify cloud resources.' },
              { agent: 'Remediation Agent', current: 'Level 3 — Execute on Approval', max: 4, description: 'Executes remediations after human approval. Auto-execute enabled for pre-approved actions.' },
              { agent: 'Reporting Agent', current: 'Level 1 — Draft Only', max: 2, description: 'Drafts reports for human review. Cannot send reports without approval.' },
            ].map(a => (
              <div key={a.agent} style={{ padding: '14px 0', borderBottom: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <div style={{ fontWeight: 500, fontSize: 13 }}>{a.agent}</div>
                  <span className="badge badge-blue">{a.current}</span>
                </div>
                <div className="text-sm">{a.description}</div>
                <div className="text-xs" style={{ marginTop: 4 }}>Max configured: Level {a.max}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'users' && (
        <div className="card">
          <div className="card-header">
            <div className="card-title">Users & Roles</div>
            <button className="btn btn-primary btn-sm">+ Invite User</button>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr><th>User</th><th>Role</th><th>Last Active</th><th>MFA</th><th></th></tr>
              </thead>
              <tbody>
                {[
                  { name: 'Siddharth J.', email: 'sj@company.com', role: 'Organization Admin', active: 'Now', mfa: true },
                  { name: 'Jordan K.', email: 'jk@company.com', role: 'Security Lead', active: '2h ago', mfa: true },
                  { name: 'Alex C.', email: 'ac@company.com', role: 'CloudOps Lead', active: '45 min ago', mfa: true },
                  { name: 'Priya N.', email: 'pn@company.com', role: 'FinOps Analyst', active: '1h ago', mfa: true },
                  { name: 'Marcus R.', email: 'mr@company.com', role: 'MSP Manager', active: '3h ago', mfa: true },
                  { name: 'Rebecca M.', email: 'rm@company.com', role: 'Executive Reader', active: 'Yesterday', mfa: false },
                ].map(u => (
                  <tr key={u.email}>
                    <td>
                      <div style={{ fontWeight: 500 }}>{u.name}</div>
                      <div className="text-xs">{u.email}</div>
                    </td>
                    <td><span className="badge badge-blue">{u.role}</span></td>
                    <td className="text-sm">{u.active}</td>
                    <td>{u.mfa ? <span className="badge badge-green">Enabled</span> : <span className="badge badge-red">Disabled</span>}</td>
                    <td><button className="btn btn-ghost btn-sm">Edit</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'integrations' && (
        <div className="two-col">
          {[
            { name: 'Slack', icon: '💬', status: 'connected', desc: 'Notifications, alerts, and approval actions', channel: '#cloudops-alerts' },
            { name: 'Jira', icon: '📋', status: 'connected', desc: 'Ticket creation from findings and recommendations', project: 'CLOUD' },
            { name: 'PagerDuty', icon: '🚨', status: 'connected', desc: 'Incident creation for Critical findings', service: 'Cloud Operations' },
            { name: 'Webhook', icon: '🔗', status: 'not_connected', desc: 'Generic outbound webhook for custom integrations', channel: null },
          ].map(i => (
            <div key={i.name} className="card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <span style={{ fontSize: 24 }}>{i.icon}</span>
                <div>
                  <div style={{ fontWeight: 600 }}>{i.name}</div>
                  <span className={i.status === 'connected' ? 'badge badge-green' : 'badge badge-gray'}>
                    {i.status === 'connected' ? '● Connected' : 'Not connected'}
                  </span>
                </div>
              </div>
              <div className="text-sm">{i.desc}</div>
              {i.channel && <div className="text-xs" style={{ marginTop: 6, color: 'var(--accent-blue)' }}>{i.channel || i.project || i.service}</div>}
              <div style={{ marginTop: 12 }}>
                <button className={i.status === 'connected' ? 'btn btn-ghost btn-sm' : 'btn btn-primary btn-sm'}>
                  {i.status === 'connected' ? 'Configure' : 'Connect'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
