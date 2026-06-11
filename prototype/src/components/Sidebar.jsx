import React from 'react'
import { NavLink } from 'react-router-dom'

const navItems = [
  { path: '/', label: 'Command Center', icon: '⌘', badge: null },
  { path: '/inventory', label: 'Cloud Inventory', icon: '📦', badge: null },
  { path: '/cost', label: 'Cost Intelligence', icon: '💰', badge: 2 },
  { path: '/security', label: 'Security & Compliance', icon: '🛡️', badge: 3 },
  { path: '/agents', label: 'Agent Workflows', icon: '🤖', badge: null },
  { path: '/remediation', label: 'Remediation Center', icon: '🔧', badge: 5 },
  { path: '/reports', label: 'Reports', icon: '📊', badge: null },
  { path: '/customers', label: 'Customers', icon: '🏢', badge: null },
  { path: '/settings', label: 'Settings', icon: '⚙️', badge: null },
]

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <div className="sidebar-logo-title">☁️ CloudPilot OS</div>
        <div className="sidebar-logo-sub">AI-native CloudOps</div>
      </div>
      <div className="sidebar-section-label">Platform</div>
      <nav className="sidebar-nav">
        {navItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
            {item.badge && <span className="nav-badge">{item.badge}</span>}
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-footer">
        <div className="avatar">SJ</div>
        <div className="avatar-info">
          <div className="avatar-name">Siddharth J.</div>
          <div>CloudOps Lead</div>
        </div>
      </div>
    </div>
  )
}
