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
  const diff = Math.ceil((end - now) / (1000 * 60 * 60 * 24))
  return diff > 0 ? diff : 0
}

export function getDaysToCycleDeadline() {
  const now = new Date()
  const end = new Date(QUARTER.cycleDeadline)
  const diff = Math.ceil((end - now) / (1000 * 60 * 60 * 24))
  return diff > 0 ? diff : 0
}

// ─── CATEGORIES ───
export const CATEGORIES = [
  { id: 'hc', name: 'Hair Care', code: 'HC' },
  { id: 'sc', name: 'Skin Care', code: 'SC' },
  { id: 'home', name: 'Home Care', code: 'HM' },
  { id: 'food', name: 'Foods', code: 'FD' },
]

// ─── USERS ───
export const USERS = {
  director: {
    id: 'director',
    name: 'Anand Sharma',
    initials: 'AS',
    role: 'Sales Director',
    roleKey: 'director',
    email: 'anand.sharma@cpggiant.com',
    nodeId: 'national',
    reportingTo: null,
    reportingToName: 'CEO / Board',
    teamSize: 1834,
    avatar: '#1a56db',
  },
  rh_north: {
    id: 'rh_north',
    name: 'Priya Menon',
    initials: 'PM',
    role: 'Regional Head — North',
    roleKey: 'regional_head',
    email: 'priya.menon@cpggiant.com',
    nodeId: 'north',
    reportingTo: 'director',
    reportingToName: 'Anand Sharma (Sales Director)',
    teamSize: 458,
    avatar: '#7c3aed',
  },
  am_delhi: {
    id: 'am_delhi',
    name: 'Vikram Singh',
    initials: 'VS',
    role: 'Area Manager — Delhi NCR',
    roleKey: 'area_manager',
    email: 'vikram.singh@cpggiant.com',
    nodeId: 'delhi_ncr',
    reportingTo: 'rh_north',
    reportingToName: 'Priya Menon (Regional Head, North)',
    teamSize: 92,
    avatar: '#059669',
  },
  zm_central: {
    id: 'zm_central',
    name: 'Sunita Rao',
    initials: 'SR',
    role: 'Zone Manager — Central Delhi',
    roleKey: 'zone_manager',
    email: 'sunita.rao@cpggiant.com',
    nodeId: 'central_delhi',
    reportingTo: 'am_delhi',
    reportingToName: 'Vikram Singh (Area Manager, Delhi NCR)',
    teamSize: 24,
    avatar: '#d97706',
  },
  dc_cp: {
    id: 'dc_cp',
    name: 'Rahul Verma',
    initials: 'RV',
    role: 'DC Manager — Connaught Place',
    roleKey: 'dc_manager',
    email: 'rahul.verma@cpggiant.com',
    nodeId: 'cp_dc',
    reportingTo: 'zm_central',
    reportingToName: 'Sunita Rao (Zone Manager, Central Delhi)',
    teamSize: 6,
    avatar: '#dc2626',
  },
  finance: {
    id: 'finance',
    name: 'Kavita Joshi',
    initials: 'KJ',
    role: 'Finance Controller',
    roleKey: 'finance',
    email: 'kavita.joshi@cpggiant.com',
    nodeId: 'national',
    reportingTo: null,
    reportingToName: 'CFO',
    teamSize: 0,
    avatar: '#6b7280',
  },
}

// ─── HIERARCHY ───
export const HIERARCHY = {
  national: {
    id: 'national', name: 'National', level: 0, levelLabel: 'National',
    children: ['north', 'south', 'east', 'west'],
  },
  north: {
    id: 'north', name: 'North', level: 1, levelLabel: 'Region',
    parentId: 'national',
    children: ['delhi_ncr', 'up_east', 'punjab_hr', 'rajasthan'],
    weight: 29.1,
  },
  south: {
    id: 'south', name: 'South', level: 1, levelLabel: 'Region',
    parentId: 'national',
    children: ['tamil_nadu', 'karnataka', 'kerala'],
    weight: 25.9,
  },
  east: {
    id: 'east', name: 'East', level: 1, levelLabel: 'Region',
    parentId: 'national',
    children: ['west_bengal', 'odisha'],
    weight: 22.1,
  },
  west: {
    id: 'west', name: 'West', level: 1, levelLabel: 'Region',
    parentId: 'national',
    children: ['maharashtra', 'gujarat'],
    weight: 22.9,
  },
  delhi_ncr: {
    id: 'delhi_ncr', name: 'Delhi NCR', level: 2, levelLabel: 'Area',
    parentId: 'north',
    children: ['central_delhi', 'south_delhi', 'noida_grn'],
    weight: 32.0,
  },
  up_east: {
    id: 'up_east', name: 'UP East', level: 2, levelLabel: 'Area',
    parentId: 'north', children: [], weight: 21.0,
  },
  punjab_hr: {
    id: 'punjab_hr', name: 'Punjab & Haryana', level: 2, levelLabel: 'Area',
    parentId: 'north', children: [], weight: 27.0,
  },
  rajasthan: {
    id: 'rajasthan', name: 'Rajasthan', level: 2, levelLabel: 'Area',
    parentId: 'north', children: [], weight: 20.0,
  },
  tamil_nadu: {
    id: 'tamil_nadu', name: 'Tamil Nadu', level: 2, levelLabel: 'Area',
    parentId: 'south', children: [], weight: 38.0,
  },
  karnataka: {
    id: 'karnataka', name: 'Karnataka', level: 2, levelLabel: 'Area',
    parentId: 'south', children: [], weight: 33.0,
  },
  kerala: {
    id: 'kerala', name: 'Kerala', level: 2, levelLabel: 'Area',
    parentId: 'south', children: [], weight: 29.0,
  },
  west_bengal: {
    id: 'west_bengal', name: 'West Bengal', level: 2, levelLabel: 'Area',
    parentId: 'east', children: [], weight: 55.0,
  },
  odisha: {
    id: 'odisha', name: 'Odisha', level: 2, levelLabel: 'Area',
    parentId: 'east', children: [], weight: 45.0,
  },
  maharashtra: {
    id: 'maharashtra', name: 'Maharashtra', level: 2, levelLabel: 'Area',
    parentId: 'west', children: [], weight: 58.0,
  },
  gujarat: {
    id: 'gujarat', name: 'Gujarat', level: 2, levelLabel: 'Area',
    parentId: 'west', children: [], weight: 42.0,
  },
  central_delhi: {
    id: 'central_delhi', name: 'Central Delhi', level: 3, levelLabel: 'Zone',
    parentId: 'delhi_ncr',
    children: ['cp_dc', 'karol_bagh_dc', 'chandni_chowk_dc'],
    weight: 38.0,
  },
  south_delhi: {
    id: 'south_delhi', name: 'South Delhi', level: 3, levelLabel: 'Zone',
    parentId: 'delhi_ncr', children: [], weight: 35.0,
  },
  noida_grn: {
    id: 'noida_grn', name: 'Noida & Gurugram', level: 3, levelLabel: 'Zone',
    parentId: 'delhi_ncr', children: [], weight: 27.0,
  },
  cp_dc: {
    id: 'cp_dc', name: 'Connaught Place DC', level: 4, levelLabel: 'DC',
    parentId: 'central_delhi', children: [], weight: 40.0,
  },
  karol_bagh_dc: {
    id: 'karol_bagh_dc', name: 'Karol Bagh DC', level: 4, levelLabel: 'DC',
    parentId: 'central_delhi', children: [], weight: 35.0,
  },
  chandni_chowk_dc: {
    id: 'chandni_chowk_dc', name: 'Chandni Chowk DC', level: 4, levelLabel: 'DC',
    parentId: 'central_delhi', children: [], weight: 25.0,
  },
}

// ─── TARGET DATA ───
export function getTargetsForNode(nodeId) {
  const targets = {
    national: [
      { cat: 'Hair Care', auto: 180.00, manual: null, final: 180.00, status: 'published', achievement: 0 },
      { cat: 'Skin Care', auto: 142.00, manual: null, final: 142.00, status: 'published', achievement: 0 },
      { cat: 'Home Care', auto: 310.00, manual: null, final: 310.00, status: 'published', achievement: 0 },
      { cat: 'Foods', auto: 210.00, manual: null, final: 210.00, status: 'published', achievement: 0 },
    ],
    north: [
      { cat: 'Hair Care', auto: 57.60, manual: null, final: 57.60, status: 'in_progress', achievement: 34 },
      { cat: 'Skin Care', auto: 41.32, manual: null, final: 41.32, status: 'finalized', achievement: 29 },
      { cat: 'Home Care', auto: 90.21, manual: null, final: 90.21, status: 'in_progress', achievement: 41 },
      { cat: 'Foods', auto: 56.10, manual: 58.50, final: 58.50, status: 'approved', achievement: 22 },
    ],
    south: [
      { cat: 'Hair Care', auto: 51.30, manual: null, final: 51.30, status: 'in_progress', achievement: 28 },
      { cat: 'Skin Care', auto: 36.78, manual: null, final: 36.78, status: 'draft', achievement: 31 },
      { cat: 'Home Care', auto: 80.29, manual: null, final: 80.29, status: 'draft', achievement: 38 },
      { cat: 'Foods', auto: 49.98, manual: 46.50, final: null, status: 'pending_skip_level', achievement: 25 },
    ],
    east: [
      { cat: 'Hair Care', auto: 32.40, manual: null, final: 32.40, status: 'draft', achievement: 0 },
      { cat: 'Skin Care', auto: 31.38, manual: null, final: 31.38, status: 'draft', achievement: 0 },
      { cat: 'Home Care', auto: 68.51, manual: null, final: 68.51, status: 'draft', achievement: 0 },
      { cat: 'Foods', auto: 53.82, manual: 56.00, final: null, status: 'pending_skip_level', achievement: 0 },
    ],
    west: [
      { cat: 'Hair Care', auto: 38.70, manual: null, final: 38.70, status: 'in_progress', achievement: 32 },
      { cat: 'Skin Care', auto: 32.52, manual: null, final: 32.52, status: 'in_progress', achievement: 27 },
      { cat: 'Home Care', auto: 70.99, manual: null, final: 70.99, status: 'draft', achievement: 35 },
      { cat: 'Foods', auto: 50.10, manual: null, final: 50.10, status: 'draft', achievement: 19 },
    ],
    delhi_ncr: [
      { cat: 'Hair Care', auto: 18.43, manual: 22.00, final: 22.00, status: 'approved', achievement: 38 },
      { cat: 'Skin Care', auto: 13.22, manual: null, final: 13.22, status: 'finalized', achievement: 42 },
      { cat: 'Home Care', auto: 28.87, manual: null, final: 28.87, status: 'in_progress', achievement: 35 },
      { cat: 'Foods', auto: 17.95, manual: 19.50, final: null, status: 'pending_skip_level', achievement: 28 },
    ],
    up_east: [
      { cat: 'Hair Care', auto: 12.10, manual: null, final: 12.10, status: 'draft', achievement: 31 },
      { cat: 'Skin Care', auto: 8.68, manual: null, final: 8.68, status: 'draft', achievement: 26 },
      { cat: 'Home Care', auto: 18.94, manual: null, final: 18.94, status: 'draft', achievement: 33 },
      { cat: 'Foods', auto: 11.78, manual: null, final: 11.78, status: 'draft', achievement: 20 },
    ],
    punjab_hr: [
      { cat: 'Hair Care', auto: 15.55, manual: 14.00, final: null, status: 'pending_skip_level', achievement: 29 },
      { cat: 'Skin Care', auto: 11.16, manual: null, final: 11.16, status: 'finalized', achievement: 35 },
      { cat: 'Home Care', auto: 24.36, manual: null, final: 24.36, status: 'draft', achievement: 40 },
      { cat: 'Foods', auto: 15.15, manual: null, final: 15.15, status: 'draft', achievement: 24 },
    ],
    rajasthan: [
      { cat: 'Hair Care', auto: 11.52, manual: null, final: 11.52, status: 'draft', achievement: 27 },
      { cat: 'Skin Care', auto: 8.27, manual: null, final: 8.27, status: 'draft', achievement: 30 },
      { cat: 'Home Care', auto: 18.04, manual: null, final: 18.04, status: 'draft', achievement: 36 },
      { cat: 'Foods', auto: 11.22, manual: null, final: 11.22, status: 'draft', achievement: 18 },
    ],
    central_delhi: [
      { cat: 'Hair Care', auto: 8.36, manual: null, final: 8.36, status: 'in_progress', achievement: 40 },
      { cat: 'Skin Care', auto: 5.02, manual: null, final: 5.02, status: 'finalized', achievement: 45 },
      { cat: 'Home Care', auto: 10.97, manual: 12.00, final: 12.00, status: 'approved', achievement: 37 },
      { cat: 'Foods', auto: 7.41, manual: null, final: 7.41, status: 'draft', achievement: 30 },
    ],
    cp_dc: [
      { cat: 'Hair Care', auto: 3.34, manual: null, final: 3.34, status: 'draft', achievement: 42 },
      { cat: 'Skin Care', auto: 2.01, manual: null, final: 2.01, status: 'finalized', achievement: 48 },
      { cat: 'Home Care', auto: 4.80, manual: null, final: 4.80, status: 'draft', achievement: 39 },
      { cat: 'Foods', auto: 2.96, manual: null, final: 2.96, status: 'draft', achievement: 33 },
    ],
  }
  return targets[nodeId] || targets['national']
}

// ─── APPROVAL REQUESTS ───
export const APPROVALS = [
  {
    id: 'apr_1',
    requestedBy: 'Vikram Singh',
    requestedByRole: 'Area Manager, Delhi NCR',
    node: 'Delhi NCR',
    category: 'Foods',
    autoValue: 17.95,
    overrideValue: 19.50,
    changePct: '+8.6%',
    justification: 'New Reliance Smart outlet opening in Dwarka (Sept). Modern trade partnership with Spencer\'s confirmed for Q3. Historical Q3 shows 15% uplift in packaged foods for Delhi NCR.',
    submittedAt: '2 hours ago',
    slaRemaining: '46h remaining',
    slaOk: true,
    thresholdBreached: false,
    approverRole: 'director',
  },
  {
    id: 'apr_2',
    requestedBy: 'Area Manager, Punjab',
    requestedByRole: 'Area Manager, Punjab & Haryana',
    node: 'Punjab & Haryana',
    category: 'Hair Care',
    autoValue: 15.55,
    overrideValue: 14.00,
    changePct: '-10.0%',
    justification: 'Key distributor (Sharma Enterprises) contract under renegotiation. Two sub-distributors in Ludhiana and Jalandhar have reduced coverage. Expecting resolution by mid-Q3 but conservative target is prudent.',
    submittedAt: '8 hours ago',
    slaRemaining: '40h remaining',
    slaOk: true,
    thresholdBreached: false,
    approverRole: 'director',
  },
  {
    id: 'apr_3',
    requestedBy: 'Regional Head, South',
    requestedByRole: 'Regional Head, South',
    node: 'South Region',
    category: 'Foods',
    autoValue: 49.98,
    overrideValue: 46.50,
    changePct: '-7.0%',
    justification: 'Supply chain disruption for packaged snacks — vendor plant shutdown in Hosur. Alternative sourcing will take 6-8 weeks. Reducing Foods target to account for stock-out period.',
    submittedAt: '1 day ago',
    slaRemaining: '22h remaining',
    slaOk: true,
    thresholdBreached: false,
    approverRole: 'director',
  },
  {
    id: 'apr_4',
    requestedBy: 'Regional Head, East',
    requestedByRole: 'Regional Head, East',
    node: 'East Region',
    category: 'Foods',
    autoValue: 53.82,
    overrideValue: 56.00,
    changePct: '+4.1%',
    justification: 'Festive season (Durga Puja) falls entirely within Q3 this year. Historical data shows 18-22% spike in packaged foods during this period in East. Conservative bump.',
    submittedAt: '1 day ago',
    slaRemaining: 'SLA breached (2h)',
    slaOk: false,
    thresholdBreached: false,
    approverRole: 'director',
  },
  {
    id: 'apr_5',
    requestedBy: 'Sunita Rao',
    requestedByRole: 'Zone Manager, Central Delhi',
    node: 'Central Delhi',
    category: 'Home Care',
    autoValue: 10.97,
    overrideValue: 12.00,
    changePct: '+9.4%',
    justification: 'New apartment complexes in Rajendra Place area. Three residential societies with 800+ units each. Already signed up with 2 for bulk monthly supply. Home Care demand is strong.',
    submittedAt: '5 hours ago',
    slaRemaining: '43h remaining',
    slaOk: true,
    thresholdBreached: false,
    approverRole: 'am_delhi',
  },
]

// ─── AUDIT LOG ───
export const AUDIT_LOG = [
  { time: 'Aug 13, 10:42 AM', user: 'Vikram Singh', action: 'Override Submitted', node: 'Delhi NCR', category: 'Foods', detail: '₹17.95 Cr → ₹19.50 Cr', status: 'Pending' },
  { time: 'Aug 13, 10:38 AM', user: 'System', action: 'Auto-Distribute', node: 'North Region', category: 'All', detail: 'Distributed ₹245.23 Cr across 4 Areas', status: 'Done' },
  { time: 'Aug 13, 09:15 AM', user: 'Anand Sharma', action: 'National Target Set', node: 'National', category: 'All', detail: '₹842 Cr total across 4 categories', status: 'Done' },
  { time: 'Aug 12, 04:30 PM', user: 'Area Mgr, Punjab', action: 'Override Submitted', node: 'Punjab & Haryana', category: 'Hair Care', detail: '₹15.55 Cr → ₹14.00 Cr', status: 'Pending' },
  { time: 'Aug 12, 03:50 PM', user: 'Anand Sharma', action: 'Approved', node: 'Delhi NCR', category: 'Hair Care', detail: 'Override ₹18.43 → ₹22.00 Cr approved', status: 'Done' },
  { time: 'Aug 12, 02:10 PM', user: 'Vikram Singh', action: 'Override Submitted', node: 'Delhi NCR', category: 'Hair Care', detail: '₹18.43 Cr → ₹22.00 Cr', status: 'Approved' },
  { time: 'Aug 12, 11:00 AM', user: 'System', action: 'Cycle Created', node: 'National', category: '—', detail: 'Q3 FY27 cycle initialized', status: 'Done' },
  { time: 'Aug 11, 05:20 PM', user: 'Admin', action: 'Hierarchy Updated', node: 'East Region', category: '—', detail: 'Added 2 new DCs under Jharkhand Zone', status: 'Done' },
  { time: 'Aug 11, 03:00 PM', user: 'Sunita Rao', action: 'Override Submitted', node: 'Central Delhi', category: 'Home Care', detail: '₹10.97 Cr → ₹12.00 Cr', status: 'Approved' },
  { time: 'Aug 11, 01:45 PM', user: 'Kavita Joshi', action: 'Actuals Uploaded', node: 'National', category: 'All', detail: 'July 2026 actuals — 1,834 rows processed', status: 'Done' },
]

// ─── HELPER ───
export function getNodeChildren(nodeId) {
  const node = HIERARCHY[nodeId]
  if (!node || !node.children) return []
  return node.children.map(cid => HIERARCHY[cid]).filter(Boolean)
}

export function getApprovalsForUser(userId) {
  const user = USERS[userId]
  if (!user) return []
  return APPROVALS.filter(a => a.approverRole === userId)
}

export function formatCr(val) {
  if (val == null) return '—'
  if (val >= 1) return `₹${val.toFixed(1)} Cr`
  return `₹${(val * 100).toFixed(1)} L`
}

export function getStatusInfo(status) {
  const map = {
    draft: { label: 'Draft', color: '#6b7280', bg: '#f3f4f6' },
    published: { label: 'Published', color: '#1a56db', bg: '#eff6ff' },
    in_progress: { label: 'In Progress', color: '#1a56db', bg: '#eff6ff' },
    pending_skip_level: { label: 'Pending Approval', color: '#d97706', bg: '#fffbeb' },
    pending_threshold_review: { label: 'Threshold Review', color: '#d97706', bg: '#fffbeb' },
    approved: { label: 'Approved', color: '#059669', bg: '#ecfdf5' },
    rejected: { label: 'Rejected', color: '#dc2626', bg: '#fef2f2' },
    finalized: { label: 'Finalized', color: '#059669', bg: '#ecfdf5' },
    recalculation_conflict: { label: 'Conflict', color: '#dc2626', bg: '#fef2f2' },
  }
  return map[status] || map.draft
}
