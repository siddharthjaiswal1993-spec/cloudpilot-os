import React from 'react'

const reports = [
  { id: 'r1', title: 'June 2026 Executive Report', type: 'Executive', generated: 'Today 07:04', status: 'ready', period: 'June 2026', ai: true },
  { id: 'r2', title: 'SOC 2 Compliance Package — June 2026', type: 'Compliance', generated: 'Today 03:25', status: 'ready', period: 'June 2026', ai: true },
  { id: 'r3', title: 'May 2026 Executive Report', type: 'Executive', generated: 'Jun 2 07:02', status: 'archived', period: 'May 2026', ai: true },
  { id: 'r4', title: 'Security Posture Summary — June 12', type: 'Security', generated: 'Today 08:30', status: 'ready', period: 'June 12, 2026', ai: true },
  { id: 'r5', title: 'FinOps Monthly Savings Report — June', type: 'FinOps', generated: 'Today 07:45', status: 'ready', period: 'June 2026', ai: true },
]

const typeBadge = {
  Executive: 'badge-blue', Compliance: 'badge-purple',
  Security: 'badge-red', FinOps: 'badge-green',
}

export default function Reports() {
  const [generating, setGenerating] = React.useState(false)
  const [generated, setGenerated] = React.useState(false)

  function generate() {
    setGenerating(true)
    setTimeout(() => { setGenerating(false); setGenerated(true) }, 2000)
  }

  return (
    <div>
      <div className="metrics-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <div className="metric-card">
          <div className="metric-card-label">Reports Generated</div>
          <div className="metric-card-value metric-blue">24</div>
          <div className="metric-card-sub">This quarter</div>
        </div>
        <div className="metric-card">
          <div className="metric-card-label">Avg Generation Time</div>
          <div className="metric-card-value">4.9 min</div>
          <div className="metric-card-sub">AI + data aggregation</div>
        </div>
        <div className="metric-card">
          <div className="metric-card-label">Report Open Rate</div>
          <div className="metric-card-value metric-green">82%</div>
          <div className="metric-card-sub">Executive reports</div>
        </div>
        <div className="metric-card">
          <div className="metric-card-label">Manual Hours Saved</div>
          <div className="metric-card-value metric-green">48h</div>
          <div className="metric-card-sub">This quarter vs. manual</div>
        </div>
      </div>

      <div className="two-col-wide">
        <div>
          <div className="card">
            <div className="card-header">
              <div className="card-title">📊 Report Library</div>
              <button className="btn btn-primary btn-sm" onClick={generate} disabled={generating}>
                {generating ? '⏳ Generating...' : '+ Generate Report'}
              </button>
            </div>
            {generated && (
              <div style={{ background: 'var(--accent-green-dim)', border: '1px solid var(--accent-green)', borderRadius: 8, padding: 12, marginBottom: 12, color: 'var(--accent-green)', fontSize: 13 }}>
                ✓ Q2 2026 Executive Report generated in 4.2 min — ready for review
              </div>
            )}
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Report</th>
                    <th>Type</th>
                    <th>Period</th>
                    <th>Generated</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map(r => (
                    <tr key={r.id}>
                      <td>
                        <div style={{ fontWeight: 500 }}>{r.title}</div>
                        {r.ai && <span className="ai-badge" style={{ marginTop: 3 }}>AI Generated</span>}
                      </td>
                      <td><span className={`badge ${typeBadge[r.type]}`}>{r.type}</span></td>
                      <td className="text-sm">{r.period}</td>
                      <td className="text-sm">{r.generated}</td>
                      <td>
                        <span className={r.status === 'ready' ? 'badge badge-green' : 'badge badge-gray'}>
                          {r.status}
                        </span>
                      </td>
                      <td>
                        <button className="btn btn-ghost btn-sm">📄 PDF</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div>
          <div className="ai-panel">
            <div className="ai-panel-header">
              <span className="ai-badge">AI Narrative Preview</span>
              <span className="ai-title">June 2026 Executive Summary</span>
            </div>
            <div className="ai-content">
              <p style={{ marginBottom: 10 }}><strong style={{ color: 'var(--text-primary)' }}>Cloud spend:</strong> $302,480 — 2.1% under budget, driven by $29,800 in realized rightsizing savings. Top cost driver remains EC2 compute at $148.2K (49% of spend).</p>
              <p style={{ marginBottom: 10 }}><strong style={{ color: 'var(--text-primary)' }}>Security posture:</strong> 76/100 (+3 from May). 18 findings resolved this month. One critical incident (S3 public exposure) detected and remediated within 47 minutes of detection.</p>
              <p style={{ marginBottom: 10 }}><strong style={{ color: 'var(--text-primary)' }}>Compliance:</strong> SOC 2 readiness at 94%, on track for August audit. HIPAA readiness at 82% — 3 controls require action before the July 30 audit.</p>
              <p><strong style={{ color: 'var(--text-primary)' }}>Outlook:</strong> Cost optimization program on pace to realize $42K/month in ongoing savings by Q3. SOC 2 audit scheduled August 15 — recommend addressing 4 failing controls this week.</p>
            </div>
          </div>

          <div className="card">
            <div className="card-header"><div className="card-title">Scheduled Reports</div></div>
            {[
              { name: 'Monthly Executive Report', cadence: 'Monthly · 1st Monday · 07:00', next: 'Jul 7 07:00', recipients: 3 },
              { name: 'Weekly Security Summary', cadence: 'Weekly · Monday · 08:00', next: 'Jun 16 08:00', recipients: 5 },
              { name: 'FinOps Monthly Savings', cadence: 'Monthly · 1st Monday · 07:30', next: 'Jul 7 07:30', recipients: 4 },
            ].map(s => (
              <div key={s.name} style={{ padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{s.name}</div>
                <div className="text-xs">{s.cadence} · {s.recipients} recipients</div>
                <div className="text-xs" style={{ color: 'var(--accent-blue)', marginTop: 2 }}>Next: {s.next}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
