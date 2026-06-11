import React from 'react'

const suggestedQueries = [
  'What are the top 5 cost drivers this month?',
  'Which production resources have critical security findings?',
  'What is our SOC 2 compliance readiness?',
  'Show me all idle resources in the dev account',
]

const canned = {
  'What are the top 5 cost drivers this month?': `Based on your June 2026 billing data across all 8 accounts:

1. **EC2 Compute** — $148,200 (49% of total spend). Note: autoscaling anomaly in meridian-production added $8,420 over the last 48 hours.
2. **RDS Databases** — $64,800 (21%). analytics-rds-prod (db.r5.4xlarge) is the largest single resource at $3,296/month.
3. **Data Transfer** — $38,400 (13%). Predominantly outbound from us-east-1 to customer endpoints.
4. **EKS / Kubernetes** — $28,400 (9%). production-eks-cluster running 24 nodes.
5. **S3 Storage** — $12,800 (4%). 14 TB stored across 42 buckets.

💡 *Would you like me to create rightsizing recommendations for EC2 or analyze the autoscaling anomaly?*`,

  'Which production resources have critical security findings?': `Searching production-tagged resources with Critical security findings...

**1 Critical finding in production:**

🔴 **customer-backups-prod** (S3 Bucket — meridian-production)
- Public read access enabled since June 12 at 02:32
- HIPAA-tagged account — breach notification obligations may apply
- 3 external IPs have accessed this bucket
- Remediation plan ready — pending approval

**High-severity findings in production** (5 findings):
- web-server-security-group-prod: SSH open to 0.0.0.0/0 (remediation approved, scheduled tonight)
- dev-admin-role: Wildcard IAM permissions in production account
- 3 additional high findings in staging and sandbox environments

💡 *Shall I open the remediation plan for customer-backups-prod?*`,

  'What is our SOC 2 compliance readiness?': `**SOC 2 Type II Readiness: 94% (60/64 controls passing)**

Audit scheduled: August 15, 2026 (64 days away)

**Passing (60 controls):**
- CC6 (Logical Access): ✅ All sub-controls passing
- CC8 (Change Management): ✅ All platform-managed changes documented
- CC9 (Risk Mitigation): ✅ Vendor reviews current

**Failing (4 controls) — action required:**
- CC7.2: CloudTrail logging disabled in 2 accounts (acct-003, acct-006)
- A1.1: Capacity monitoring gaps in dev environment
- 2 additional controls need manual evidence updates

**Estimated remediation effort:** ~8 hours for the 4 failing controls

💡 *Would you like me to generate a gap remediation plan and submit the CloudTrail fixes to the approval queue?*`,
}

export default function AiAssistantPanel() {
  const [input, setInput] = React.useState('')
  const [messages, setMessages] = React.useState([
    { role: 'assistant', text: 'Hello! I have full visibility into your cloud environment. Ask me anything about cost, security, compliance, or operational status.' }
  ])
  const [loading, setLoading] = React.useState(false)
  const bottomRef = React.useRef(null)

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function sendMessage(text) {
    const q = text || input.trim()
    if (!q) return
    setInput('')
    setMessages(m => [...m, { role: 'user', text: q }])
    setLoading(true)
    setTimeout(() => {
      const resp = canned[q] || `Analyzing your cloud data for: "${q}"...\n\nI found relevant data across your connected accounts. Based on current inventory and metrics, here is what I can tell you:\n\n• This query involves resources across multiple accounts\n• No critical anomalies detected related to this query\n• All data is sourced from the last scan (6 minutes ago)\n\n*Note: This is a prototype — full natural language query is available in the live platform.*`
      setMessages(m => [...m, { role: 'assistant', text: resp }])
      setLoading(false)
    }, 800)
  }

  return (
    <div className="card" style={{ height: 420, display: 'flex', flexDirection: 'column' }}>
      <div className="card-header" style={{ marginBottom: 8 }}>
        <div className="card-title">
          <span>🤖</span>
          CloudOps Copilot
          <span className="ai-badge">AI</span>
        </div>
        <span className="text-xs">Level 0 · Read-only</span>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 0 8px' }}>
        {messages.map((m, i) => (
          <div key={i} style={{
            marginBottom: 12,
            display: 'flex',
            justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start',
          }}>
            <div style={{
              maxWidth: '90%',
              padding: '8px 12px',
              borderRadius: m.role === 'user' ? '12px 12px 4px 12px' : '12px 12px 12px 4px',
              background: m.role === 'user' ? 'var(--accent-blue-dim)' : 'var(--bg-secondary)',
              border: `1px solid ${m.role === 'user' ? 'var(--accent-blue)' : 'var(--border)'}`,
              fontSize: 13,
              color: 'var(--text-secondary)',
              lineHeight: 1.5,
              whiteSpace: 'pre-wrap',
            }}>
              {m.text.split('**').map((part, pi) =>
                pi % 2 === 1 ? <strong key={pi} style={{ color: 'var(--text-primary)' }}>{part}</strong> : part
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ fontSize: 13, color: 'var(--text-muted)', padding: '4px 0' }}>
            ⏳ Analyzing cloud data...
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <div style={{ paddingBottom: 4 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 8 }}>
          {suggestedQueries.map(q => (
            <button key={q} className="ai-chip" style={{ fontSize: 11 }} onClick={() => sendMessage(q)}>
              {q.length > 40 ? q.slice(0, 38) + '…' : q}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder="Ask about your cloud environment..."
            style={{
              flex: 1, background: 'var(--bg-secondary)', border: '1px solid var(--border)',
              borderRadius: 8, padding: '8px 12px', color: 'var(--text-primary)', fontSize: 13,
              outline: 'none',
            }}
          />
          <button className="btn btn-primary btn-sm" onClick={() => sendMessage()}>→</button>
        </div>
      </div>
    </div>
  )
}
