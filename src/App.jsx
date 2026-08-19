import { useState } from 'react'
import {
  USERS, QUARTER, HIERARCHY, CATEGORIES, APPROVALS, CYCLE_STATES,
  getTargetsForNode, getNodeChildren, getApprovalsForUser, getAuditLogForUser,
  formatCr, getStatusInfo, getDaysToQuarterEnd, getDaysToCycleDeadline,
} from './data'

// ─── LOGIN ───
function Login({ onLogin }) {
  const userList = ['director', 'rh_north', 'am_delhi', 'zm_central', 'dc_cp', 'rep_cp', 'finance']
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
  if (user.roleKey === 'dc_sales_rep') {
    // DC Sales Rep is read-only: no edit access to targets, no approval role.
    // Dashboard already shows their target by Category + achievement %.
    navItems.splice(1, 2) // drop Targets and Approvals
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
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1>{QUARTER.name} Target Setting</h1>
          <p>Cycle opened Aug 11 — Deadline Aug 25, 2026</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <Badge status={QUARTER.status} />
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 4 }}>
            {CYCLE_STATES.find(s => s.key === QUARTER.status)?.description}
          </div>
        </div>
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
            <div className="field-value mono">
              {user.teamSize > 0 ? `${user.teamSize} people` : user.roleKey === 'dc_sales_rep' ? 'Individual contributor' : 'Staff function'}
            </div>
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
  // Session-only overrides typed in by the user — not persisted anywhere,
  // this is a static-data demo with no backend. Keyed by "nodeId|Category".
  const [sessionOverrides, setSessionOverrides] = useState({})

  const nodeId = user.nodeId
  const children = getNodeChildren(nodeId)

  const toggleExpand = (id) => {
    setExpanded(e => ({ ...e, [id]: !e[id] }))
  }

  const commitOverride = (overrideKey, rawValue) => {
    const num = parseFloat(rawValue)
    if (isNaN(num) || num < 0) return // reject invalid/negative input, leave unchanged
    setSessionOverrides(prev => ({ ...prev, [overrideKey]: Math.round(num * 100) / 100 }))
  }

  const renderRows = (nodes, indent = 0) => {
    return nodes.flatMap(node => {
      const targets = getTargetsForNode(node.id)
      const catTargets = activeCategory === 'all' ? targets : targets.filter(t => t.cat === activeCategory)
      const nodeChildren = getNodeChildren(node.id)
      const isExpanded = expanded[node.id]
      const rows = []

      catTargets.forEach((t, i) => {
        const overrideKey = `${node.id}|${t.cat}`
        const sessionValue = sessionOverrides[overrideKey]
        // A value typed this session takes precedence over the seed data,
        // and always reads as a fresh override pending skip-level approval.
        const manual = sessionValue ?? t.manual
        const final = sessionValue ?? t.final
        const status = sessionValue != null ? 'pending_skip_level' : t.status
        const isOverride = manual !== null && manual !== undefined
        const cellId = `${node.id}-${i}`

        rows.push(
          <tr key={cellId} className={isOverride ? 'override-row' : ''}>
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
            <td className="mono" onClick={() => setEditingCell(cellId)}>
              {editingCell === cellId ? (
                <input
                  className="edit-input"
                  type="number"
                  step="0.01"
                  min="0"
                  defaultValue={manual ?? t.auto}
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') e.currentTarget.blur()
                    if (e.key === 'Escape') { e.currentTarget.dataset.cancelled = 'true'; e.currentTarget.blur() }
                  }}
                  onBlur={(e) => {
                    if (e.target.dataset.cancelled !== 'true') commitOverride(overrideKey, e.target.value)
                    setEditingCell(null)
                  }}
                />
              ) : isOverride ? (
                <span style={{ color: 'var(--blue)', fontWeight: 500 }}>
                  {formatCr(manual)}<span className="override-tag">EDIT</span>
                </span>
              ) : (
                <span className="editable-cell">click to edit</span>
              )}
            </td>
            <td className="mono" style={{ fontWeight: 600 }}>{formatCr(final)}</td>
            <td><Badge status={status} /></td>
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

// ─── MULTI-SELECT FILTER DROPDOWN ───
function MultiFilter({ label, options, selected, onToggle }) {
  const [open, setOpen] = useState(false)
  const allSelected = selected.length === 0
  const displayLabel = allSelected ? `All ${label}` : selected.length === 1 ? selected[0] : `${selected.length} ${label}`
  return (
    <div style={{ position: 'relative' }}>
      <div
        className="filter-select"
        style={{ cursor: 'pointer', minWidth: 140, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, userSelect: 'none' }}
        onClick={() => setOpen(!open)}
      >
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{displayLabel}</span>
        <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>{open ? '▲' : '▼'}</span>
      </div>
      {open && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, marginTop: 4,
          background: '#fff', border: '1px solid var(--border)', borderRadius: 6,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)', zIndex: 20,
          minWidth: 180, maxHeight: 240, overflowY: 'auto', padding: '4px 0',
        }}>
          <div
            style={{ padding: '7px 14px', fontSize: '0.8rem', cursor: 'pointer', color: allSelected ? 'var(--blue)' : 'var(--text)', fontWeight: allSelected ? 600 : 400, background: allSelected ? 'var(--blue-light)' : 'transparent' }}
            onClick={() => { onToggle(null); setOpen(false) }}
          >
            All {label}
          </div>
          {options.map(opt => {
            const isChecked = selected.includes(opt)
            return (
              <div
                key={opt}
                style={{ padding: '7px 14px', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, background: isChecked ? '#f0f6ff' : 'transparent' }}
                onClick={() => onToggle(opt)}
              >
                <span style={{
                  width: 14, height: 14, borderRadius: 3, flexShrink: 0,
                  border: isChecked ? '2px solid var(--blue)' : '2px solid var(--border-strong)',
                  background: isChecked ? 'var(--blue)' : '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontSize: '0.6rem', fontWeight: 700,
                }}>{isChecked ? '✓' : ''}</span>
                {opt}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

// ─── AUDIT TRAIL ───
function AuditTrail({ user }) {
  const [actionFilter, setActionFilter] = useState([])
  const [userFilter, setUserFilter] = useState([])
  const [searchText, setSearchText] = useState('')

  const scopedLog = getAuditLogForUser(user)
  const allActions = [...new Set(scopedLog.map(l => l.action))]
  const allUsers = [...new Set(scopedLog.map(l => l.user))]

  const toggleFilter = (arr, setArr) => (val) => {
    if (val === null) { setArr([]); return }
    setArr(prev => prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val])
  }

  const filtered = scopedLog.filter(log => {
    if (actionFilter.length > 0 && !actionFilter.includes(log.action)) return false
    if (userFilter.length > 0 && !userFilter.includes(log.user)) return false
    if (searchText) {
      const s = searchText.toLowerCase()
      return (log.node + log.detail + log.category + log.user).toLowerCase().includes(s)
    }
    return true
  })

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1>Audit Trail</h1>
          <p>Actions affecting {HIERARCHY[user.nodeId]?.name || 'your'} targets ({filtered.length} of {scopedLog.length} entries shown)</p>
        </div>
        <button className="btn btn-ghost btn-sm">↓ Export Logs</button>
      </div>

      <div className="filters-row">
        <MultiFilter label="Actions" options={allActions} selected={actionFilter} onToggle={toggleFilter(actionFilter, setActionFilter)} />
        <MultiFilter label="Users" options={allUsers} selected={userFilter} onToggle={toggleFilter(userFilter, setUserFilter)} />
        <input className="filter-input" placeholder="Search nodes, details..." value={searchText} onChange={e => setSearchText(e.target.value)} />
        {(actionFilter.length > 0 || userFilter.length > 0 || searchText) && (
          <button className="btn btn-ghost btn-sm" onClick={() => { setActionFilter([]); setUserFilter([]); setSearchText('') }}>Clear filters</button>
        )}
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
            {filtered.length === 0 ? (
              <tr><td colSpan={7} style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)' }}>No entries match the current filters</td></tr>
            ) : filtered.map((log, i) => {
              const actionColor = log.action.includes('Override') ? { bg: '#fffbeb', color: '#92400e' }
                : log.action.includes('Approved') ? { bg: '#ecfdf5', color: '#065f46' }
                : log.action.includes('Actuals') ? { bg: '#eff6ff', color: '#1a56db' }
                : { bg: '#f3f4f6', color: '#4b5563' }
              return (
                <tr key={i}>
                  <td style={{ color: 'var(--text-muted)', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>{log.time}</td>
                  <td style={{ fontWeight: log.user === 'System' || log.user === 'Admin' ? 400 : 500, color: log.user === 'System' ? 'var(--text-muted)' : 'var(--text)' }}>{log.user}</td>
                  <td>
                    <span style={{ padding: '2px 8px', borderRadius: 3, fontSize: '0.72rem', fontWeight: 500, background: actionColor.bg, color: actionColor.color }}>{log.action}</span>
                  </td>
                  <td>{log.node}</td>
                  <td style={{ color: 'var(--text-muted)' }}>{log.category}</td>
                  <td style={{ fontSize: '0.82rem' }}>{log.detail}</td>
                  <td><Badge status={
                    log.status === 'Done' ? 'finalized'
                      : log.status === 'Approved' ? 'approved'
                      : log.status === 'Conflict' ? 'recalculation_conflict'
                      : 'pending_skip_level'
                  } /></td>
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
      case 'audit': return <AuditTrail user={currentUser} />
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
