// ─── QUARTER INFO ───
export const QUARTER = {
  name: 'Q3 FY27',
  fiscalYear: 'FY27',
  quarter: 3,
  startDate: '2026-10-01',
  endDate: '2026-12-31',
  cycleOpenedDate: '2026-08-11',
  cycleDeadline: '2026-08-25',
  status: 'in_progress',
  nationalTarget: 842,
}

export function getDaysToQuarterEnd() {
  const now = new Date()
  const end = new Date(QUARTER.endDate)
  return Math.max(0, Math.ceil((end - now) / 86400000))
}

export function getDaysToCycleDeadline() {
  const now = new Date()
  const end = new Date(QUARTER.cycleDeadline)
  return Math.max(0, Math.ceil((end - now) / 86400000))
}

// ─── CATEGORIES ───
export const CATEGORIES = [
  { id: 'hc', name: 'Hair Care', code: 'HC' },
  { id: 'sc', name: 'Skin Care', code: 'SC' },
  { id: 'home', name: 'Home Care', code: 'HM' },
  { id: 'food', name: 'Foods', code: 'FD' },
]
const CAT_NAMES = CATEGORIES.map(c => c.name)

// ─── USERS ───
export const USERS = {
  director: {
    id: 'director', name: 'Anand Sharma', initials: 'AS',
    role: 'Sales Director', roleKey: 'director',
    email: 'anand.sharma@cpggiant.com', nodeId: 'national',
    reportingTo: null, reportingToName: 'CEO / Board',
    teamSize: 1834, avatar: '#1a56db',
  },
  rh_north: {
    id: 'rh_north', name: 'Priya Menon', initials: 'PM',
    role: 'Regional Head — North', roleKey: 'regional_head',
    email: 'priya.menon@cpggiant.com', nodeId: 'north',
    reportingTo: 'director', reportingToName: 'Anand Sharma (Sales Director)',
    teamSize: 458, avatar: '#7c3aed',
  },
  am_delhi: {
    id: 'am_delhi', name: 'Vikram Singh', initials: 'VS',
    role: 'Area Manager — Delhi NCR', roleKey: 'area_manager',
    email: 'vikram.singh@cpggiant.com', nodeId: 'delhi_ncr',
    reportingTo: 'rh_north', reportingToName: 'Priya Menon (Regional Head, North)',
    teamSize: 92, avatar: '#059669',
  },
  zm_central: {
    id: 'zm_central', name: 'Sunita Rao', initials: 'SR',
    role: 'Zone Manager — Central Delhi', roleKey: 'zone_manager',
    email: 'sunita.rao@cpggiant.com', nodeId: 'central_delhi',
    reportingTo: 'am_delhi', reportingToName: 'Vikram Singh (Area Manager, Delhi NCR)',
    teamSize: 24, avatar: '#d97706',
  },
  dc_cp: {
    id: 'dc_cp', name: 'Rahul Verma', initials: 'RV',
    role: 'DC Manager — Connaught Place', roleKey: 'dc_manager',
    email: 'rahul.verma@cpggiant.com', nodeId: 'cp_dc',
    reportingTo: 'zm_central', reportingToName: 'Sunita Rao (Zone Manager, Central Delhi)',
    teamSize: 6, avatar: '#dc2626',
  },
  finance: {
    id: 'finance', name: 'Kavita Joshi', initials: 'KJ',
    role: 'Finance Controller', roleKey: 'finance',
    email: 'kavita.joshi@cpggiant.com', nodeId: 'national',
    reportingTo: null, reportingToName: 'CFO',
    teamSize: 0, avatar: '#6b7280',
  },
}

// ─── HIERARCHY ───
export const HIERARCHY = {
  national:         { id: 'national',         name: 'National',           level: 0, levelLabel: 'National', children: ['north','south','east','west'] },
  north:            { id: 'north',            name: 'North',              level: 1, levelLabel: 'Region', parentId: 'national', children: ['delhi_ncr','up_east','punjab_hr','rajasthan'], weight: 29.1 },
  south:            { id: 'south',            name: 'South',              level: 1, levelLabel: 'Region', parentId: 'national', children: ['tamil_nadu','karnataka','kerala'], weight: 25.9 },
  east:             { id: 'east',             name: 'East',               level: 1, levelLabel: 'Region', parentId: 'national', children: ['west_bengal','odisha'], weight: 22.1 },
  west:             { id: 'west',             name: 'West',               level: 1, levelLabel: 'Region', parentId: 'national', children: ['maharashtra','gujarat'], weight: 22.9 },
  delhi_ncr:        { id: 'delhi_ncr',        name: 'Delhi NCR',          level: 2, levelLabel: 'Area', parentId: 'north', children: ['central_delhi','south_delhi','noida_grn'], weight: 32.0 },
  up_east:          { id: 'up_east',          name: 'UP East',            level: 2, levelLabel: 'Area', parentId: 'north', children: [], weight: 21.0 },
  punjab_hr:        { id: 'punjab_hr',        name: 'Punjab & Haryana',   level: 2, levelLabel: 'Area', parentId: 'north', children: [], weight: 27.0 },
  rajasthan:        { id: 'rajasthan',        name: 'Rajasthan',          level: 2, levelLabel: 'Area', parentId: 'north', children: [], weight: 20.0 },
  tamil_nadu:       { id: 'tamil_nadu',       name: 'Tamil Nadu',         level: 2, levelLabel: 'Area', parentId: 'south', children: [], weight: 38.0 },
  karnataka:        { id: 'karnataka',        name: 'Karnataka',          level: 2, levelLabel: 'Area', parentId: 'south', children: [], weight: 33.0 },
  kerala:           { id: 'kerala',           name: 'Kerala',             level: 2, levelLabel: 'Area', parentId: 'south', children: [], weight: 29.0 },
  west_bengal:      { id: 'west_bengal',      name: 'West Bengal',        level: 2, levelLabel: 'Area', parentId: 'east', children: [], weight: 55.0 },
  odisha:           { id: 'odisha',           name: 'Odisha',             level: 2, levelLabel: 'Area', parentId: 'east', children: [], weight: 45.0 },
  maharashtra:      { id: 'maharashtra',      name: 'Maharashtra',        level: 2, levelLabel: 'Area', parentId: 'west', children: [], weight: 58.0 },
  gujarat:          { id: 'gujarat',           name: 'Gujarat',            level: 2, levelLabel: 'Area', parentId: 'west', children: [], weight: 42.0 },
  central_delhi:    { id: 'central_delhi',    name: 'Central Delhi',      level: 3, levelLabel: 'Zone', parentId: 'delhi_ncr', children: ['cp_dc','karol_bagh_dc','chandni_chowk_dc'], weight: 38.0 },
  south_delhi:      { id: 'south_delhi',      name: 'South Delhi',        level: 3, levelLabel: 'Zone', parentId: 'delhi_ncr', children: [], weight: 35.0 },
  noida_grn:        { id: 'noida_grn',        name: 'Noida & Gurugram',   level: 3, levelLabel: 'Zone', parentId: 'delhi_ncr', children: [], weight: 27.0 },
  cp_dc:            { id: 'cp_dc',            name: 'Connaught Place DC', level: 4, levelLabel: 'DC', parentId: 'central_delhi', children: [], weight: 40.0 },
  karol_bagh_dc:    { id: 'karol_bagh_dc',    name: 'Karol Bagh DC',      level: 4, levelLabel: 'DC', parentId: 'central_delhi', children: [], weight: 35.0 },
  chandni_chowk_dc: { id: 'chandni_chowk_dc', name: 'Chandni Chowk DC',  level: 4, levelLabel: 'DC', parentId: 'central_delhi', children: [], weight: 25.0 },
}

// ─── NATIONAL CATEGORY TARGETS (starting point) ───
const NATIONAL_TARGETS = {
  'Hair Care': 180.00,
  'Skin Care': 142.00,
  'Home Care': 310.00,
  'Foods':     210.00,
}

// ─── OVERRIDES (manual edits at specific nodes) ───
const OVERRIDES = {
  'north|Foods':             { manual: 63.21, status: 'approved' },
  'delhi_ncr|Hair Care':     { manual: 22.00, status: 'approved' },
  'delhi_ncr|Foods':         { manual: 19.50, status: 'pending_skip_level' },
  'punjab_hr|Hair Care':     { manual: 14.00, status: 'pending_skip_level' },
  'south|Foods':             { manual: 46.50, status: 'pending_skip_level' },
  'east|Foods':              { manual: 56.00, status: 'pending_skip_level' },
  'central_delhi|Home Care': { manual: 12.50, status: 'approved' },
}

// ─── STATUS ASSIGNMENTS (for nodes without overrides) ───
const STATUS_MAP = {
  'national':    'published',
  'north':       'in_progress',
  'south':       'in_progress',
  'east':        'draft',
  'west':        'in_progress',
  'delhi_ncr':   'in_progress',
  'up_east':     'draft',
  'punjab_hr':   'draft',
  'rajasthan':   'draft',
  'tamil_nadu':  'draft',
  'karnataka':   'draft',
  'kerala':      'draft',
  'west_bengal': 'draft',
  'odisha':      'draft',
  'maharashtra': 'in_progress',
  'gujarat':     'draft',
  'central_delhi':    'in_progress',
  'south_delhi':      'draft',
  'noida_grn':        'draft',
  'cp_dc':            'draft',
  'karol_bagh_dc':    'draft',
  'chandni_chowk_dc': 'draft',
}

// Seed for deterministic pseudo-random achievements
function seededAch(nodeId, cat) {
  let h = 0
  const s = nodeId + cat
  for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0
  return 20 + Math.abs(h % 30) // 20-49%
}

// ─── COMPUTE ALL TARGETS (weight-based cascade) ───
const TARGET_CACHE = {}

function computeTargets(nodeId) {
  if (TARGET_CACHE[nodeId]) return TARGET_CACHE[nodeId]

  const node = HIERARCHY[nodeId]
  if (!node) return []

  const results = CAT_NAMES.map(cat => {
    let autoValue
    if (node.level === 0) {
      autoValue = NATIONAL_TARGETS[cat]
    } else {
      // Get parent's FINAL value for this category, then apply weight
      const parentTargets = computeTargets(node.parentId)
      const parentCat = parentTargets.find(t => t.cat === cat)
      const parentFinal = parentCat ? (parentCat.final ?? parentCat.auto) : 0
      autoValue = Math.round((parentFinal * node.weight / 100) * 100) / 100
    }

    const overrideKey = `${nodeId}|${cat}`
    const override = OVERRIDES[overrideKey]
    const manual = override ? override.manual : null
    const status = override ? override.status : (STATUS_MAP[nodeId] || 'draft')
    const final_ = manual && (status === 'approved' || status === 'finalized')
      ? manual
      : (manual && status.startsWith('pending') ? null : autoValue)

    return {
      cat,
      auto: autoValue,
      manual,
      final: final_ ?? autoValue, // for cascade purposes use auto if pending
      finalDisplay: final_,       // for display: null if pending
      status,
      achievement: node.level === 0 ? 0 : seededAch(nodeId, cat),
    }
  })

  TARGET_CACHE[nodeId] = results
  return results
}

// Pre-compute all nodes (top-down order matters)
function precomputeAll() {
  // BFS from national
  const queue = ['national']
  while (queue.length > 0) {
    const id = queue.shift()
    computeTargets(id)
    const node = HIERARCHY[id]
    if (node?.children) queue.push(...node.children)
  }
}
precomputeAll()

export function getTargetsForNode(nodeId) {
  return computeTargets(nodeId).map(t => ({
    cat: t.cat,
    auto: t.auto,
    manual: t.manual,
    final: t.finalDisplay,
    status: t.status,
    achievement: t.achievement,
  }))
}

// ─── APPROVAL REQUESTS ───
export const APPROVALS = [
  {
    id: 'apr_1', requestedBy: 'Vikram Singh', requestedByRole: 'Area Manager, Delhi NCR',
    node: 'Delhi NCR', category: 'Foods', autoValue: +(computeTargets('delhi_ncr').find(t=>t.cat==='Foods').auto.toFixed(2)),
    overrideValue: 19.50, changePct: '+' + ((19.50 / computeTargets('delhi_ncr').find(t=>t.cat==='Foods').auto - 1) * 100).toFixed(1) + '%',
    justification: 'New Reliance Smart outlet opening in Dwarka (Sept). Modern trade partnership with Spencer\'s confirmed for Q3. Historical Q3 shows 15% uplift in packaged foods for Delhi NCR.',
    submittedAt: '2 hours ago', slaRemaining: '46h remaining', slaOk: true, thresholdBreached: false, approverRole: 'director',
  },
  {
    id: 'apr_2', requestedBy: 'Area Manager, Punjab', requestedByRole: 'Area Manager, Punjab & Haryana',
    node: 'Punjab & Haryana', category: 'Hair Care', autoValue: +(computeTargets('punjab_hr').find(t=>t.cat==='Hair Care').auto.toFixed(2)),
    overrideValue: 14.00, changePct: '-' + ((1 - 14.00 / computeTargets('punjab_hr').find(t=>t.cat==='Hair Care').auto) * 100).toFixed(1) + '%',
    justification: 'Key distributor (Sharma Enterprises) contract under renegotiation. Two sub-distributors in Ludhiana and Jalandhar have reduced coverage.',
    submittedAt: '8 hours ago', slaRemaining: '40h remaining', slaOk: true, thresholdBreached: false, approverRole: 'director',
  },
  {
    id: 'apr_3', requestedBy: 'Regional Head, South', requestedByRole: 'Regional Head, South',
    node: 'South Region', category: 'Foods', autoValue: +(computeTargets('south').find(t=>t.cat==='Foods').auto.toFixed(2)),
    overrideValue: 46.50, changePct: '-' + ((1 - 46.50 / computeTargets('south').find(t=>t.cat==='Foods').auto) * 100).toFixed(1) + '%',
    justification: 'Supply chain disruption for packaged snacks — vendor plant shutdown in Hosur. Alternative sourcing will take 6-8 weeks.',
    submittedAt: '1 day ago', slaRemaining: '22h remaining', slaOk: true, thresholdBreached: false, approverRole: 'director',
  },
  {
    id: 'apr_4', requestedBy: 'Regional Head, East', requestedByRole: 'Regional Head, East',
    node: 'East Region', category: 'Foods', autoValue: +(computeTargets('east').find(t=>t.cat==='Foods').auto.toFixed(2)),
    overrideValue: 56.00, changePct: '+' + ((56.00 / computeTargets('east').find(t=>t.cat==='Foods').auto - 1) * 100).toFixed(1) + '%',
    justification: 'Festive season (Durga Puja) falls entirely within Q3. Historical data shows 18-22% spike in packaged foods during this period.',
    submittedAt: '1 day ago', slaRemaining: 'SLA breached (2h)', slaOk: false, thresholdBreached: false, approverRole: 'director',
  },
  {
    id: 'apr_5', requestedBy: 'Sunita Rao', requestedByRole: 'Zone Manager, Central Delhi',
    node: 'Central Delhi', category: 'Home Care', autoValue: +(computeTargets('central_delhi').find(t=>t.cat==='Home Care').auto.toFixed(2)),
    overrideValue: 12.50, changePct: '+' + ((12.50 / computeTargets('central_delhi').find(t=>t.cat==='Home Care').auto - 1) * 100).toFixed(1) + '%',
    justification: 'New apartment complexes in Rajendra Place area. Three residential societies with 800+ units each.',
    submittedAt: '5 hours ago', slaRemaining: '43h remaining', slaOk: true, thresholdBreached: false, approverRole: 'am_delhi',
  },
]

// ─── AUDIT LOG ───
export const AUDIT_LOG = [
  { time: 'Aug 13, 10:42 AM', user: 'Vikram Singh', action: 'Override Submitted', node: 'Delhi NCR', category: 'Foods', detail: '₹' + computeTargets('delhi_ncr').find(t=>t.cat==='Foods').auto.toFixed(2) + ' Cr → ₹19.50 Cr', status: 'Pending' },
  { time: 'Aug 13, 10:38 AM', user: 'System', action: 'Auto-Distribute', node: 'North Region', category: 'All', detail: 'Distributed ₹' + computeTargets('north').reduce((s,t) => s + t.auto, 0).toFixed(1) + ' Cr across 4 Areas', status: 'Done' },
  { time: 'Aug 13, 09:15 AM', user: 'Anand Sharma', action: 'National Target Set', node: 'National', category: 'All', detail: '₹842 Cr total across 4 categories', status: 'Done' },
  { time: 'Aug 12, 04:30 PM', user: 'Area Mgr, Punjab', action: 'Override Submitted', node: 'Punjab & Haryana', category: 'Hair Care', detail: '₹' + computeTargets('punjab_hr').find(t=>t.cat==='Hair Care').auto.toFixed(2) + ' Cr → ₹14.00 Cr', status: 'Pending' },
  { time: 'Aug 12, 03:50 PM', user: 'Anand Sharma', action: 'Approved', node: 'Delhi NCR', category: 'Hair Care', detail: 'Override ₹' + computeTargets('delhi_ncr').find(t=>t.cat==='Hair Care').auto.toFixed(2) + ' → ₹22.00 Cr approved', status: 'Done' },
  { time: 'Aug 12, 02:10 PM', user: 'Vikram Singh', action: 'Override Submitted', node: 'Delhi NCR', category: 'Hair Care', detail: '₹' + computeTargets('delhi_ncr').find(t=>t.cat==='Hair Care').auto.toFixed(2) + ' Cr → ₹22.00 Cr', status: 'Approved' },
  { time: 'Aug 12, 01:15 PM', user: 'Sunita Rao', action: 'Override Submitted', node: 'Central Delhi', category: 'Home Care', detail: '₹' + computeTargets('central_delhi').find(t=>t.cat==='Home Care').auto.toFixed(2) + ' Cr → ₹12.50 Cr', status: 'Approved' },
  { time: 'Aug 12, 11:00 AM', user: 'System', action: 'Cycle Created', node: 'National', category: 'All', detail: 'Q3 FY27 cycle initialized', status: 'Done' },
  { time: 'Aug 11, 05:20 PM', user: 'Admin', action: 'Hierarchy Updated', node: 'East Region', category: 'All', detail: 'Added 2 new DCs under Jharkhand Zone', status: 'Done' },
  { time: 'Aug 11, 03:00 PM', user: 'Priya Menon', action: 'Approved', node: 'North Region', category: 'Foods', detail: 'Override ₹' + computeTargets('north').find(t=>t.cat==='Foods').auto.toFixed(2) + ' → ₹63.21 Cr approved', status: 'Done' },
  { time: 'Aug 11, 01:45 PM', user: 'Kavita Joshi', action: 'Actuals Uploaded', node: 'National', category: 'All', detail: 'July 2026 actuals — 1,834 rows processed', status: 'Done' },
  { time: 'Aug 11, 10:30 AM', user: 'System', action: 'Auto-Distribute', node: 'South Region', category: 'All', detail: 'Distributed ₹' + computeTargets('south').reduce((s,t) => s + t.auto, 0).toFixed(1) + ' Cr across 3 Areas', status: 'Done' },
]

// ─── HELPERS ───
export function getNodeChildren(nodeId) {
  const node = HIERARCHY[nodeId]
  if (!node?.children) return []
  return node.children.map(cid => HIERARCHY[cid]).filter(Boolean)
}

export function getApprovalsForUser(userId) {
  return APPROVALS.filter(a => a.approverRole === userId)
}

export function formatCr(val) {
  if (val == null) return '—'
  if (Math.abs(val) >= 1) return '₹' + val.toFixed(1) + ' Cr'
  return '₹' + (val * 100).toFixed(1) + ' L'
}

export function getStatusInfo(status) {
  const map = {
    draft:                     { label: 'Draft',            color: '#6b7280', bg: '#f3f4f6' },
    published:                 { label: 'Published',        color: '#1a56db', bg: '#eff6ff' },
    in_progress:               { label: 'In Progress',      color: '#1a56db', bg: '#eff6ff' },
    pending_skip_level:        { label: 'Pending Approval', color: '#d97706', bg: '#fffbeb' },
    pending_threshold_review:  { label: 'Threshold Review', color: '#d97706', bg: '#fffbeb' },
    approved:                  { label: 'Approved',         color: '#059669', bg: '#ecfdf5' },
    rejected:                  { label: 'Rejected',         color: '#dc2626', bg: '#fef2f2' },
    finalized:                 { label: 'Finalized',        color: '#059669', bg: '#ecfdf5' },
    recalculation_conflict:    { label: 'Conflict',         color: '#dc2626', bg: '#fef2f2' },
  }
  return map[status] || map.draft
}
