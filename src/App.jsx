import { useState } from 'react'
import {
  USERS, QUARTER, HIERARCHY, CATEGORIES, APPROVALS, AUDIT_LOG,
  getTargetsForNode, getNodeChildren, getApprovalsForUser,
  formatCr, getStatusInfo, getDaysToQuarterEnd, getDaysToCycleDeadline,
} from './data'

// ─── LOGIN ───
function Login({ onLogin }) {
  const userList = ['director', 'rh_north', 'am_delhi', 'zm_central', 'dc_cp', 'finance']
  return (
    <div className="login-page">
      <div className="login-card">
        <div className="cycle-tag">{QUARTER.name} — Target Setting Active</div>
        <h1>SMART Target Setting Tool</h1>
        <p className="subtitle">Select your profile to continue</p>
        {userList.map(uid => {
          const u = USERS[uid]
          return (
            <div key={uid} className="user-option" onClick={() => onLogin(uid)}>
              <div className="user-avatar" style={{ background: u.avatar }}>{u.initials}</div>
              <div className="info">
                <div className="name">{u.name}</div>
                <div className="role">{u.role}</div>
              </div>
              <div className="arrow">→</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── STATUS BADGE ───
function Badge({ status }) {
  const s = getStatusInfo(status)
  return <span className="status-badge" style={{ background: s.bg, color: s.color }}>{s.label}</span>
}

// ─── LAYOUT ───
function Layout({ user, currentPage, onNav, onLogout, children }) {
  const approvalCount = getApprovalsForUser(user.id).length
  const navItems = [
    { id: 'dashboard', icon: '◫', label: 'Dashboard' },
    { id: 'targets', icon: '◎', label: 'Targets' },
    { id: 'approvals', icon: '☑', label: 'Approvals', badge: approvalCount },
    { id: 'audit', icon: '☰', label: 'Audit Trail' },
  ]
  if (user.roleKey === 'finance') {
    navItems.splice(1, 1) // finance doesn't need targets grid
  }
  return (
    <div className="app-layout">
      <div className="sidebar">
        <div className="sidebar-brand">
          <h2>SMART Targets</h2>
          <span>CPG Giant</span>
        </div>
        <div className="sidebar-nav">
          {navItems.map(n => (
            <div
              key={n.id}
              className={`nav-item ${currentPage === n.id ? 'active' : ''}`}
              onClick={() => onNav(n.id)}
            >
              <span style={{ fontSize: '1rem', width: 18, textAlign: 'center' }}>{n.icon}</span>
              {n.label}
              {n.badge > 0 && <span className="badge-count">{n.badge}</span>}
            </div>
          ))}
        </div>
        <div className="sidebar-footer">
          <div className="label">Logged in as</div>
          <div className="user-name">{user.name}</div>
          <div className="logout" onClick={onLogout}>Sign out</div>
        </div>
      </div>
      <div className="main-content">{children}</div>
    </div>
  )
}

// ─── DASHBOARD ───
function Dashboard({ user }) {
  const targets = getTargetsForNode(user.nodeId)
  const approvals = getApprovalsForUser(user.id)
  const totalTarget = targets.reduce((s, t) => s + (t.final || t.auto), 0)
  const avgAch = targets.filter(t => t.achievement > 0).reduce((s, t, _, a) => s + t.achievement / a.length, 0)
  const daysToQEnd = getDaysToQuarterEnd()
  const daysToCycleEnd = getDaysToCycleDeadline()

  // Region progress for director
  const regions = user.roleKey === 'director' ? ['north', 'south', 'east', 'west'] : null
  const regionData = regions ? regions.map(r => {
    const rTargets = getTargetsForNode(r)
    const finalizedCount = rTargets.filter(t => ['finalized', 'approved'].includes(t.status)).length
    const pct = Math.round((finalizedCount / rTargets.length) * 100)
    return { ...HIERARCHY[r], pct, finalized: finalizedCount, total: rTargets.length }
  }) : null

  return (
    <div>
      <div className="page-header">
        <h1>{QUARTER.name} Target Setting</h1>
        <p>Cycle opened Aug 11 — Deadline Aug 25, 2026</p>
      </div>

      {/* Summary strip */}
      <div className="summary-card">
        <div className="row">
          <div className="field">
            <div className="field-label">Your Role</div>
            <div className="field-value">{user.role}</div>
          </div>
          <div className="field">
            <div className="field-label">Reporting To</div>
            <div className="field-value">{user.reportingToName}</div>
          </div>
          <div className="field">
            <div className="field-label">Team Size</div>
            <div className="field-value mono">{user.teamSize > 0 ? `${user.teamSize} people` : 'Staff function'}</div>
          </div>
          <div className="field">
            <div className="field-label">Hierarchy Scope</div>
            <div className="field-value">{HIERARCHY[user.nodeId]?.name || 'National'} ({HIERARCHY[user.nodeId]?.levelLabel || 'All'})</div>
          </div>
        </div>
      </div>

      {/* Countdown */}
      <div className="countdown-strip">
        <div className="cs-item">
          <div className="cs-label">Cycle Deadline</div>
          <div className={`cs-value ${daysToCycleEnd <= 3 ? 'urgent' : ''}`}>{daysToCycleEnd} days left</div>
        </div>
        <div className="cs-item">
          <div className="cs-label">Quarter Ends</div>
          <div className="cs-value">{daysToQEnd} days</div>
        </div>
        <div className="cs-item">
          <div className="cs-label">Quarter</div>
          <div className="cs-value">{QUARTER.name}</div>
        </div>
        <div className="cs-item">
          <div className="cs-label">National Target</div>
          <div className="cs-value">₹{QUARTER.nationalTarget} Cr</div>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-label">Your Target</div>
          <div className="stat-value" style={{ color: 'var(--blue)' }}>{formatCr(totalTarget)}</div>
          <div className="stat-sub">Revenue — {QUARTER.name}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Pending Approvals</div>
          <div className="stat-value" style={{ color: approvals.length > 0 ? 'var(--amber)' : 'var(--green)' }}>{approvals.length}</div>
          <div className="stat-sub">{approvals.filter(a => !a.slaOk).length > 0 ? `${approvals.filter(a => !a.slaOk).length} breaching SLA` : 'All within SLA'}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Categories</div>
          <div className="stat-value">{targets.filter(t => ['finalized', 'approved'].includes(t.status)).length}/{targets.length}</div>
          <div className="stat-sub">Finalized</div>
        </div>
        {avgAch > 0 && (
          <div className="stat-card">
            <div className="stat-label">Avg Achievement (Q2)</div>
            <div className="stat-value" style={{ color: avgAch >= 30 ? 'var(--green)' : 'var(--amber)' }}>{avgAch.toFixed(0)}%</div>
            <div className="stat-sub">Based on last quarter actuals</div>
          </div>
        )}
      </div>

      {/* Targets by category */}
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Auto Target</th>
              <th>Override</th>
              <th>Final Target</th>
              <th>Q2 Achievement</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {targets.map((t, i) => (
              <tr key={i} className={t.manual ? 'override-row' : ''}>
                <td style={{ fontWeight: 500 }}>{t.cat}</td>
                <td className="mono">{formatCr(t.auto)}</td>
                <td className="mono" style={{ color: t.manual ? 'var(--blue)' : 'var(--text-muted)' }}>
                  {t.manual ? formatCr(t.manual) : '—'}
                  {t.manual && <span className="override-tag">OVERRIDE</span>}
                </td>
                <td className="mono" style={{ fontWeight: 600 }}>{formatCr(t.final)}</td>
                <td className="mono">
                  {t.achievement > 0 ? (
                    <span style={{ color: t.achievement >= 35 ? 'var(--green)' : 'var(--amber)' }}>{t.achievement}%</span>
                  ) : '—'}
                </td>
                <td><Badge status={t.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Region progress (director only) */}
      {regionData && (
        <>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 14 }}>Region Progress</h3>
          <div className="stats-row">
            {regionData.map(r => (
              <div className="stat-card" key={r.id}>
                <div className="stat-label">{r.name}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
                  <span style={{ fontFamily: 'var(--mono)', fontWeight: 600, fontSize: '1.1rem' }}>{r.pct}%</span>
                  <Badge status={r.pct === 100 ? 'finalized' : 'in_progress'} />
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${r.pct}%`, background: r.pct === 100 ? 'var(--green)' : 'var(--blue)' }} />
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Pending approvals quick list */}
      {approvals.length > 0 && (
        <>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: '20px 0 14px' }}>Pending Your Action</h3>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Requester</th><th>Node</th><th>Category</th><th>Change</th><th>Submitted</th><th>SLA</th></tr></thead>
              <tbody>
                {approvals.map(a => (
                  <tr key={a.id}>
                    <td style={{ fontWeight: 500 }}>{a.requestedBy}</td>
                    <td>{a.node}</td>
                    <td>{a.category}</td>
                    <td className="mono" style={{ color: a.changePct.startsWith('+') ? 'var(--green)' : 'var(--red)' }}>
                      {formatCr(a.autoValue)} → {formatCr(a.overrideValue)} ({a.changePct})
                    </td>
                    <td style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{a.submittedAt}</td>
                    <td>
                      <span style={{ color: a.slaOk ? 'var(--green)' : 'var(--red)', fontWeight: 500, fontSize: '0.8rem' }}>
                        {a.slaRemaining}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}

// ─── TARGETS ───
function Targets({ user }) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [expanded, setExpanded] = useState({})
  const [editingCell, setEditingCell] = useState(null)

  const nodeId = user.nodeId
  const children = getNodeChildren(nodeId)

  const toggleExpand = (id) => {
    setExpanded(e => ({ ...e, [id]: !e[id] }))
  }

  const renderRows = (nodes, indent = 0) => {
    return nodes.flatMap(node => {
      const targets = getTargetsForNode(node.id)
      const catTargets = activeCategory === 'all' ? targets : targets.filter(t => t.cat === activeCategory)
      const nodeChildren = getNodeChildren(node.id)
      const isExpanded = expanded[node.id]
      const rows = []

      catTargets.forEach((t, i) => {
        const isOverride = t.manual !== null
        rows.push(
          <tr key={`${node.id}-${i}`} className={isOverride ? 'override-row' : ''}>
            {i === 0 && (
              <td rowSpan={catTargets.length} style={{ paddingLeft: 16 + indent * 20, verticalAlign: 'top', paddingTop: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  {nodeChildren.length > 0 && (
                    <span className="tree-toggle" onClick={() => toggleExpand(node.id)}>
                      {isExpanded ? '▼' : '▶'}
                    </span>
                  )}
                  <span style={{ fontWeight: indent === 0 ? 600 : 400 }}>{node.name}</span>
                </div>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{node.levelLabel}</span>
              </td>
            )}
            <td>{activeCategory === 'all' ? t.cat : ''}</td>
            <td className="mono">{formatCr(t.auto)}</td>
            <td className="mono" onClick={() => setEditingCell(`${node.id}-${i}`)}>
              {editingCell === `${node.id}-${i}` ? (
                <input className="edit-input" defaultValue={t.manual || t.auto} autoFocus onBlur={() => setEditingCell(null)} />
              ) : t.manual ? (
                <span style={{ color: 'var(--blue)', fontWeight: 500 }}>
                  {formatCr(t.manual)}<span className="override-tag">EDIT</span>
                </span>
              ) : (
                <span className="editable-cell">click to edit</span>
              )}
            </td>
            <td className="mono" style={{ fontWeight: 600 }}>{formatCr(t.final)}</td>
            <td><Badge status={t.status} /></td>
          </tr>
        )
      })

      if (isExpanded && nodeChildren.length > 0) {
        rows.push(...renderRows(nodeChildren, indent + 1))
      }
      return rows
    })
  }

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1>Target Allocation</h1>
          <p>{QUARTER.name} — {HIERARCHY[nodeId]?.name || 'National'} scope</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-ghost btn-sm">↓ Export Excel</button>
          <button className="btn btn-primary btn-sm">Submit for Approval</button>
        </div>
      </div>

      <div className="info-banner blue">
        ℹ&nbsp;&nbsp;Click any cell under "Manual Override" to enter a custom target. Overrides trigger skip-level approval. Yellow rows indicate active overrides.
      </div>

      <div className="tabs">
        <div className={`tab ${activeCategory === 'all' ? 'active' : ''}`} onClick={() => setActiveCategory('all')}>All Categories</div>
        {CATEGORIES.map(c => (
          <div key={c.id} className={`tab ${activeCategory === c.name ? 'active' : ''}`} onClick={() => setActiveCategory(c.name)}>{c.name}</div>
        ))}
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th style={{ width: 200 }}>Entity</th>
              <th>Category</th>
              <th>Auto Target</th>
              <th>Manual Override</th>
              <th>Final Target</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {children.length > 0 ? renderRows(children) : renderRows([HIERARCHY[nodeId]])}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ─── APPROVALS ───
function Approvals({ user }) {
  const approvals = getApprovalsForUser(user.id)
  const [selectedId, setSelectedId] = useState(approvals[0]?.id || null)
  const selected = approvals.find(a => a.id === selectedId)

  if (approvals.length === 0) {
    return (
      <div>
        <div className="page-header">
          <h1>Approval Queue</h1>
          <p>No pending approvals</p>
        </div>
        <div className="summary-card" style={{ textAlign: 'center', padding: 60 }}>
          <div style={{ fontSize: '2rem', marginBottom: 12 }}>✓</div>
          <div style={{ fontSize: '1rem', fontWeight: 500, marginBottom: 4 }}>All clear</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>No approvals pending your action</div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="page-header">
        <h1>Approval Queue</h1>
        <p>{approvals.length} pending — {approvals.filter(a => !a.slaOk).length > 0 ? `${approvals.filter(a => !a.slaOk).length} breaching SLA` : 'All within SLA'}</p>
      </div>
      <div className="two-col">
        <div className="col-side">
          <div className="approval-list">
            {approvals.map(a => (
              <div key={a.id} className={`approval-item ${selectedId === a.id ? 'selected' : ''} ${!a.slaOk ? 'sla-risk' : ''}`} onClick={() => setSelectedId(a.id)}>
                <div className="top-row">
                  <div>
                    <div className="requester">{a.requestedBy}</div>
                    <div className="requester-role">{a.requestedByRole}</div>
                  </div>
                  {!a.slaOk && <Badge status="rejected" />}
                </div>
                <div style={{ fontSize: '0.8rem', marginTop: 4 }}>
                  {a.node} — {a.category}
                </div>
                <div className="change-row" style={{ color: a.changePct.startsWith('+') ? 'var(--green)' : 'var(--red)' }}>
                  {formatCr(a.autoValue)} → {formatCr(a.overrideValue)} ({a.changePct})
                </div>
                <div className="time">{a.submittedAt}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-main">
          {selected && (
            <div className="approval-detail">
              <h3>Override Request</h3>
              <div className="meta">{selected.requestedBy} — {selected.requestedByRole}</div>
              <div className="detail-grid">
                <div className="dg-item">
                  <div className="dg-label">Node</div>
                  <div className="dg-value" style={{ fontFamily: 'inherit' }}>{selected.node}</div>
                </div>
                <div className="dg-item">
                  <div className="dg-label">Category</div>
                  <div className="dg-value" style={{ fontFamily: 'inherit' }}>{selected.category}</div>
                </div>
                <div className="dg-item">
                  <div className="dg-label">Auto Target</div>
                  <div className="dg-value" style={{ color: 'var(--text-muted)' }}>{formatCr(selected.autoValue)}</div>
                </div>
                <div className="dg-item">
                  <div className="dg-label">Proposed</div>
                  <div className="dg-value" style={{ color: selected.changePct.startsWith('+') ? 'var(--green)' : 'var(--red)' }}>{formatCr(selected.overrideValue)}</div>
                </div>
                <div className="dg-item">
                  <div className="dg-label">Change</div>
                  <div className="dg-value" style={{ color: selected.changePct.startsWith('+') ? 'var(--green)' : 'var(--red)' }}>{selected.changePct}</div>
                </div>
                <div className="dg-item">
                  <div className="dg-label">SLA</div>
                  <div className="dg-value" style={{ color: selected.slaOk ? 'var(--green)' : 'var(--red)', fontFamily: 'inherit', fontSize: '0.85rem' }}>{selected.slaRemaining}</div>
                </div>
              </div>
              <div className="justification-box">
                <div className="jb-label">Justification</div>
                {selected.justification}
              </div>
              {selected.thresholdBreached && (
                <div className="info-banner amber">⚠&nbsp;&nbsp;This override exceeds the configured threshold. Additional scrutiny recommended.</div>
              )}
              <div style={{ marginBottom: 6, fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Your Comments</div>
              <textarea className="comment-box" placeholder="Add comments (required for rejection)..." />
              <div className="action-buttons">
                <button className="btn btn-success">✓ Approve</button>
                <button className="btn btn-danger-outline">✕ Reject</button>
                <button className="btn btn-ghost">Escalate</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── AUDIT TRAIL ───
function AuditTrail() {
  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1>Audit Trail</h1>
          <p>Complete log of all actions in this cycle</p>
        </div>
        <button className="btn btn-ghost btn-sm">↓ Export Logs</button>
      </div>

      <div className="filters-row">
        <select className="filter-select">
          <option>All Actions</option>
          <option>Override</option>
          <option>Approval</option>
          <option>System</option>
        </select>
        <select className="filter-select">
          <option>All Users</option>
          <option>Anand Sharma</option>
          <option>Vikram Singh</option>
          <option>System</option>
        </select>
        <select className="filter-select">
          <option>All Levels</option>
          <option>National</option>
          <option>Region</option>
          <option>Area</option>
          <option>Zone</option>
          <option>DC</option>
        </select>
        <input className="filter-input" placeholder="Search..." />
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>User</th>
              <th>Action</th>
              <th>Node</th>
              <th>Category</th>
              <th>Details</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {AUDIT_LOG.map((log, i) => {
              const actionColor = log.action.includes('Override') ? { bg: '#fffbeb', color: '#92400e' }
                : log.action.includes('Approved') ? { bg: '#ecfdf5', color: '#065f46' }
                : { bg: '#f3f4f6', color: '#4b5563' }
              return (
                <tr key={i}>
                  <td style={{ color: 'var(--text-muted)', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>{log.time}</td>
                  <td style={{ fontWeight: log.user === 'System' ? 400 : 500, color: log.user === 'System' ? 'var(--text-muted)' : 'var(--text)' }}>{log.user}</td>
                  <td>
                    <span style={{ padding: '2px 8px', borderRadius: 3, fontSize: '0.72rem', fontWeight: 500, background: actionColor.bg, color: actionColor.color }}>{log.action}</span>
                  </td>
                  <td>{log.node}</td>
                  <td style={{ color: 'var(--text-muted)' }}>{log.category}</td>
                  <td style={{ fontSize: '0.82rem' }}>{log.detail}</td>
                  <td><Badge status={log.status === 'Done' ? 'finalized' : log.status === 'Approved' ? 'approved' : 'pending_skip_level'} /></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ─── APP ───
export default function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [currentPage, setCurrentPage] = useState('dashboard')

  if (!currentUser) {
    return <Login onLogin={(uid) => { setCurrentUser(USERS[uid]); setCurrentPage('dashboard') }} />
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard user={currentUser} />
      case 'targets': return <Targets user={currentUser} />
      case 'approvals': return <Approvals user={currentUser} />
      case 'audit': return <AuditTrail />
      default: return <Dashboard user={currentUser} />
    }
  }

  return (
    <Layout
      user={currentUser}
      currentPage={currentPage}
      onNav={setCurrentPage}
      onLogout={() => { setCurrentUser(null); setCurrentPage('dashboard') }}
    >
      {renderPage()}
    </Layout>
  )
}
