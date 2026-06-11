import React from 'react'
import { accounts } from '../data/mockData.js'

const resources = [
  { id: 'r1', type: 'EC2 Instance', name: 'web-server-prod-01', account: 'meridian-production', region: 'us-east-1', env: 'Production', status: 'running', cost: 142.56, tags: 3, findings: 1, age: '14 months' },
  { id: 'r2', type: 'EC2 Instance', name: 'api-gateway-prod-02', account: 'meridian-production', region: 'us-east-1', env: 'Production', status: 'running', cost: 492.80, tags: 3, findings: 0, age: '18 months' },
  { id: 'r3', type: 'S3 Bucket', name: 'customer-backups-prod', account: 'meridian-production', region: 'us-east-1', env: 'Production', status: 'warning', cost: 48.30, tags: 4, findings: 1, age: '24 months' },
  { id: 'r4', type: 'RDS Instance', name: 'postgres-prod-primary', account: 'meridian-production', region: 'us-east-1', env: 'Production', status: 'running', cost: 824.00, tags: 4, findings: 0, age: '20 months' },
  { id: 'r5', type: 'EKS Cluster', name: 'production-eks-cluster', account: 'meridian-production', region: 'us-east-1', env: 'Production', status: 'running', cost: 2840.00, tags: 3, findings: 0, age: '12 months' },
  { id: 'r6', type: 'RDS Instance', name: 'analytics-rds-prod', account: 'meridian-data-platform', region: 'us-east-1', env: 'Production', status: 'running', cost: 3296.00, tags: 4, findings: 0, age: '16 months' },
  { id: 'r7', type: 'EC2 Instance', name: 'staging-worker-01', account: 'meridian-staging', region: 'us-east-1', env: 'Staging', status: 'running', cost: 91.52, tags: 2, findings: 0, age: '8 months' },
  { id: 'r8', type: 'EBS Volume', name: 'dev-ebs-unattached-12', account: 'meridian-dev', region: 'us-east-1', env: 'Development', status: 'stopped', cost: 18.40, tags: 1, findings: 0, age: '4 months', idle: true },
  { id: 'r9', type: 'EC2 Instance', name: 'sandbox-test-server-01', account: 'meridian-sandbox', region: 'us-east-1', env: 'Sandbox', status: 'warning', cost: 38.40, tags: 0, findings: 1, age: '3 months' },
  { id: 'r10', type: 'Storage Account', name: 'meridianprodstorage001', account: 'meridian-azure-prod', region: 'eastus', env: 'Production', status: 'running', cost: 124.80, tags: 3, findings: 0, age: '11 months' },
  { id: 'r11', type: 'BigQuery Dataset', name: 'analytics-warehouse-prod', account: 'meridian-gcp-analytics', region: 'us-central1', env: 'Production', status: 'running', cost: 4840.00, tags: 4, findings: 0, age: '9 months' },
  { id: 'r12', type: 'Security Group', name: 'web-server-sg-prod', account: 'meridian-production', region: 'us-east-1', env: 'Production', status: 'warning', cost: 0, tags: 2, findings: 1, age: '18 months' },
]

const statusConfig = {
  running: { badge: 'badge-green', label: 'Running' },
  stopped: { badge: 'badge-gray', label: 'Stopped' },
  warning: { badge: 'badge-yellow', label: 'Warning' },
}

export default function CloudInventory() {
  const [search, setSearch] = React.useState('')
  const [filterEnv, setFilterEnv] = React.useState('All')

  const filtered = resources.filter(r => {
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.type.toLowerCase().includes(search.toLowerCase()) ||
      r.account.toLowerCase().includes(search.toLowerCase())
    const matchEnv = filterEnv === 'All' || r.env === filterEnv
    return matchSearch && matchEnv
  })

  return (
    <div>
      <div className="metrics-grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)', marginBottom: 20 }}>
        <div className="metric-card">
          <div className="metric-card-label">Total Resources</div>
          <div className="metric-card-value metric-blue">2,167</div>
          <div className="metric-card-sub">Across 8 accounts</div>
        </div>
        <div className="metric-card">
          <div className="metric-card-label">Untagged</div>
          <div className="metric-card-value metric-yellow">43</div>
          <div className="metric-card-sub">Missing required tags</div>
        </div>
        <div className="metric-card">
          <div className="metric-card-label">Idle Resources</div>
          <div className="metric-card-value metric-yellow">18</div>
          <div className="metric-card-sub">$3,240/month waste</div>
        </div>
        <div className="metric-card">
          <div className="metric-card-label">With Findings</div>
          <div className="metric-card-value metric-down">34</div>
          <div className="metric-card-sub">Open security findings</div>
        </div>
        <div className="metric-card">
          <div className="metric-card-label">Internet-Facing</div>
          <div className="metric-card-value">284</div>
          <div className="metric-card-sub">Require security review</div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">Resource Inventory</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-ghost btn-sm">⬇ Export CSV</button>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search resources..."
            style={{
              flex: 1, background: 'var(--bg-secondary)', border: '1px solid var(--border)',
              borderRadius: 6, padding: '7px 12px', color: 'var(--text-primary)', fontSize: 13,
            }}
          />
          {['All', 'Production', 'Staging', 'Development', 'Sandbox'].map(env => (
            <button key={env}
              className={`btn btn-sm ${filterEnv === env ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setFilterEnv(env)}
            >{env}</button>
          ))}
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Resource</th>
                <th>Type</th>
                <th>Account</th>
                <th>Region</th>
                <th>Status</th>
                <th>Monthly Cost</th>
                <th>Tags</th>
                <th>Findings</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(r => {
                const s = statusConfig[r.status]
                return (
                  <tr key={r.id}>
                    <td>
                      <div style={{ fontWeight: 500 }}>{r.name}</div>
                      {r.idle && <span className="badge badge-yellow" style={{ marginTop: 2 }}>Idle {r.age}</span>}
                    </td>
                    <td className="text-sm">{r.type}</td>
                    <td className="text-sm">{r.account}</td>
                    <td className="text-xs">{r.region}</td>
                    <td><span className={`badge ${s.badge}`}>{s.label}</span></td>
                    <td className={r.cost > 1000 ? 'text-yellow' : 'text-blue'} style={{ fontWeight: 500 }}>
                      {r.cost > 0 ? `$${r.cost.toFixed(2)}/mo` : '—'}
                    </td>
                    <td>
                      {r.tags === 0
                        ? <span className="badge badge-red">Untagged</span>
                        : <span className="text-sm">{r.tags} tags</span>}
                    </td>
                    <td>
                      {r.findings > 0
                        ? <span className="badge badge-red">{r.findings} finding{r.findings > 1 ? 's' : ''}</span>
                        : <span className="text-xs">—</span>}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className="text-xs" style={{ marginTop: 12, color: 'var(--text-muted)' }}>
          Showing {filtered.length} of 2,167 resources (sample view)
        </div>
      </div>
    </div>
  )
}
