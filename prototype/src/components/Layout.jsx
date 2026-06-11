import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './Sidebar.jsx'
import Header from './Header.jsx'
import CommandCenter from '../pages/CommandCenter.jsx'
import CloudInventory from '../pages/CloudInventory.jsx'
import CostIntelligence from '../pages/CostIntelligence.jsx'
import SecurityCompliance from '../pages/SecurityCompliance.jsx'
import AgentWorkflows from '../pages/AgentWorkflows.jsx'
import RemediationCenter from '../pages/RemediationCenter.jsx'
import Reports from '../pages/Reports.jsx'
import Customers from '../pages/Customers.jsx'
import Settings from '../pages/Settings.jsx'

const pageTitles = {
  '/': { title: 'Command Center', sub: 'AI-powered daily brief and cloud health overview' },
  '/inventory': { title: 'Cloud Inventory', sub: '2,167 resources across 8 accounts · Last scan: 6 min ago' },
  '/cost': { title: 'Cost Intelligence', sub: '$302,520 this month · 2 anomalies detected' },
  '/security': { title: 'Security & Compliance', sub: 'Posture score: 76/100 · 3 critical findings' },
  '/agents': { title: 'Agent Workflows', sub: '8 agents active · 2 currently running' },
  '/remediation': { title: 'Remediation Center', sub: '5 pending approval · 1 executing · 1 completed today' },
  '/reports': { title: 'Reports', sub: 'AI-narrated executive reports on demand' },
  '/customers': { title: 'Customer Portfolio', sub: '8 customers · 2 need attention' },
  '/settings': { title: 'Settings', sub: 'Platform configuration and integrations' },
}

export default function Layout() {
  const [path, setPath] = React.useState(window.location.pathname)
  React.useEffect(() => {
    const handler = () => setPath(window.location.pathname)
    window.addEventListener('popstate', handler)
    return () => window.removeEventListener('popstate', handler)
  }, [])

  const meta = pageTitles[path] || pageTitles['/']

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="main-area">
        <Header title={meta.title} sub={meta.sub} />
        <div className="page-content">
          <Routes>
            <Route path="/" element={<CommandCenter />} />
            <Route path="/inventory" element={<CloudInventory />} />
            <Route path="/cost" element={<CostIntelligence />} />
            <Route path="/security" element={<SecurityCompliance />} />
            <Route path="/agents" element={<AgentWorkflows />} />
            <Route path="/remediation" element={<RemediationCenter />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}
