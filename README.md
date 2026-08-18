# SMART Target Setting Tool — Demo

Interactive wireframe demo for the CPG Giant's SMART Target Setting Tool case study.

## What's included

- **Login screen** — Select from 7 user profiles (Director, Regional Head, Area Manager, Zone Manager, DC Manager, DC Sales Representative, Finance)
- **Dashboard** — Role-specific summary with reporting manager, quarter status/lifecycle stage, quarter countdown, target overview, and pending approvals
- **Target Allocation Grid** — Hierarchical tree (Region → Area → Zone → DC → Rep) with category tabs, inline editing, override and threshold-conflict indicators
- **Approval Queue** — List + detail panel with justification, SLA tracking, threshold-breach flagging, approve/reject actions
- **Audit Trail** — Filterable log of all system actions, scoped to what actually affects each user's own hierarchy chain (not everyone's)

Each user sees a different view scoped to their hierarchy position. Allocation weights are set **per Category** (not one blended weight per node), matching the case study's own worked example: North's Hair Care/Skin Care/Home Care/Foods weights (32.0/24.5/18.0/30.0%) reproduce its ₹57.60 Cr / ₹34.79 Cr / ₹55.80 Cr / ₹63.00 Cr targets off a ₹842 Cr national number.

## Deploy to GitHub Pages

### Option 1: Use the pre-built `docs/` folder (fastest)

1. Push this entire repo to GitHub
2. Go to **Settings → Pages**
3. Under "Source", select **Deploy from a branch**
4. Set branch to `main` and folder to `/docs`
5. Click Save — your site will be live in 1-2 minutes

### Option 2: Rebuild from source

```bash
npm install
npm run build     # outputs to docs/
```

Then push and configure GitHub Pages as above.

## Local development

```bash
npm install
npm run dev       # starts dev server at localhost:5173
```

## Demo users

| User | Role | Sees |
|------|------|------|
| Anand Sharma | Sales Director | National view, all region progress, all approvals |
| Priya Menon | Regional Head (North) | North region targets, area-level overrides |
| Vikram Singh | Area Manager (Delhi NCR) | Delhi NCR targets, zone-level overrides, 1 pending approval |
| Sunita Rao | Zone Manager (Central Delhi) | Central Delhi targets, DC-level breakdown |
| Rahul Verma | DC Manager (Connaught Place) | DC-level targets with SKU breakdown option |
| Arjun Nair | DC Sales Representative (Connaught Place) | Read-only "My Target" view by Category + achievement %, no edit/approval access |
| Kavita Joshi | Finance Controller | Audit trail access, read-only targets |

## Edge cases demonstrated

- **Category-specific weights** — the same node has a different allocation share per Category, not one blended split.
- **Threshold breach** — an override outside the configured band (Area: 15%/₹5cr increase, 10%/₹3cr decrease; illustrative Region ±10% / DC ±20% bands elsewhere) is flagged in the Approval detail panel.
- **SLA breach** — an approval past its 48h SLA shows a breached-SLA badge (East Region, Foods).
- **Recalculation conflict** — West's already-approved Home Care override no longer reconciles after the national target changed; shown as a red "Conflict" status in the Target Allocation Grid and Audit Trail rather than being silently overwritten.
- **Scoped audit trail** — each user's Audit Trail is filtered to their own node, its ancestors (parent-level changes cascade down into their target), and its descendants (their own team's actions) — not the whole org's log.
- **Read-only DC Sales Rep** — no Targets/Approvals nav access, matching the case study's "no edit access" role definition.

## Tech stack

- React 18 + Vite 6
- Plain CSS (no frameworks)
- Static mock data (no backend)
