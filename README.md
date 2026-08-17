# SMART Target Setting Tool — Demo

Interactive wireframe demo for the CPG Giant's SMART Target Setting Tool case study.

## What's included

- **Login screen** — Select from 6 user profiles (Director, Regional Head, Area Manager, Zone Manager, DC Manager, Finance)
- **Dashboard** — Role-specific summary with reporting manager, quarter countdown, target overview, and pending approvals
- **Target Allocation Grid** — Hierarchical tree with category tabs, inline editing, override indicators
- **Approval Queue** — List + detail panel with justification, SLA tracking, approve/reject actions
- **Audit Trail** — Filterable log of all system actions

Each user sees a different view scoped to their hierarchy position.

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
| Kavita Joshi | Finance Controller | Audit trail access, read-only targets |

## Tech stack

- React 18 + Vite 6
- Plain CSS (no frameworks)
- Static mock data (no backend)
