# Security Partner Enablement Program Hub

Interactive portfolio dashboard for a Microsoft MCAPS-Core Program Manager role. The app uses realistic synthetic data to show how Security and Partner Enablement initiatives can be managed across technical architects, platform providers, partner program leaders, engineering and business stakeholders, vendors, and service owners.

## What it demonstrates

- Executive program dashboard with workstream status, owners, dates, risks, blockers, dependencies, and success criteria.
- Agile operating rhythm with sprint goal, prioritized backlog, aging blockers, action items, ceremony notes, decisions, and delivery predictability.
- Demo platform readiness tracking for Defender, Sentinel, Entra, Purview, and Intune demos/labs.
- Partner workshop readiness planning with checklist completion and readiness scores.
- Simulated AI executive update generation from local mock data.
- Operational insights automatically surfaced from the same synthetic records.
- Concise role-fit mapping to show how the product supports program execution, partner enablement, executive reporting, and continuous improvement.

## MCAPS-Core Program Manager relevance

| Job requirement theme | App feature mapping |
| --- | --- |
| End-to-end execution | Workstreams include milestones, owners, dependencies, blockers, and success criteria. |
| Agile rhythm | Backlog board, sprint goal, aging blockers, actions, decisions, and predictability indicator. |
| Demo platform readiness | Prominent readiness tracker for security demo/lab platforms. |
| Partner enablement | Workshop readiness planner with audience, content, environment, vendor, architect, and follow-up checks. |
| Stakeholder management | Owners, platform dependencies, service owner blockers, and decision points are visible in one dashboard. |
| Executive communication | Generated weekly update summarizes on-track work, blockers, decisions, changes, risks, and next actions. |
| Operational insights | Local logic surfaces blocker patterns and readiness risks from the mock data. |

## Data note

All data is synthetic and for portfolio/demo purposes. This is not a Microsoft internal tool and does not use Microsoft logos, official assets, or proprietary data.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Build

```bash
npm run build
```

## Deploy

This static Vite app can be deployed to GitHub Pages, Netlify, Vercel, Cloudflare Pages, or any simple static host.

For GitHub Pages:

1. Commit the repository.
2. Push it to GitHub.
3. Configure Pages to deploy from a GitHub Actions workflow or from the generated `dist` output.
4. Run `npm run build` before publishing the `dist` directory.
