# Good First Issue Finder – Gamified Open Source Onboarding Platform

Empowering beginners to discover approachable issues, learn contribution flow, and stay motivated through points, badges, and a leaderboard. This README is a mentor-ready progress update covering features, architecture, and next steps.

## 🧭 Project Overview

- Purpose: Help beginners onboard into open source by finding “good first issues”, learning how to contribute with guided steps, and staying engaged via gamification.
- Why we are building it:
  - First-time contributors often don’t know where to start or how to proceed.
  - Maintainers want more prepared contributors, fewer incomplete PRs, and better community outcomes.
- Problem it solves for beginners:
  - Curated issue discovery that reduces choice paralysis.
  - Clear, actionable guidance for taking an issue from start to PR.
  - Motivation through points, badges, and a leaderboard that celebrates progress.

## ✅ Current Features Completed So Far

This section reflects what is working today, with notes on demo endpoints and planned integrations.

### Frontend

- React setup:
  - Originally CRA-style scaffolding; migrated to Vite for faster dev and simpler tooling while maintaining React structure and components.
  - Current stack: React, Vite, Bootstrap; tests run with Vitest and Testing Library (`jsdom`).
- Landing page:
  - Header: “OpenSource Companion”.
  - Navbar brand: “Good First Issue Finder”.
  - Intro explaining navigation to Issues, Profile, and Leaderboard.
- Routing structure:
  - `"/"` → Landing page.
  - `"/issues"` → Browse issues (cards + modal).
  - `"/profile"` → Profile overview with points and badges.
  - `"/leaderboard"` → Leaderboard with pagination and badge previews.
- Issue cards + modal:
  - `IssueCard` shows title, repository, and beginner-friendly labels.
  - `IssueModal` provides details, links, claim action, and an embedded `GuidancePanel` with steps and tips.
- Basic UI components implemented:
  - `IssueCard`, `IssueModal`, `GuidancePanel`, `Badge`, `LeaderboardPage`, `ProfilePage`.
- Tests (progress):
  - Component tests for `Badge`, `IssueModal`, `LeaderboardPage`.
  - Integration test for app routing and async data flows (`App.routes.test.jsx`).
  - Current status: All tests passing (10/10).

### Backend

- Node.js + Express setup:
  - Server lives in `backend/server.js` using `express`, `cors`, and `dotenv`.
  - Environment variables loaded from `.env` (Mongo connection prepped for future persistence).
- `/api/test` health check:
  - `GET /api/test` returns `{ message: "Backend alive!" }`.
- Demo endpoints (supporting UI during early development):
  - `GET /api/issues` → list of beginner-friendly issue samples.
  - `POST /api/claim/:id` → `{ ok: true, claimedId }` to simulate claiming.
  - `GET /api/profile` → demo profile with `username`, `points`, `avatar`, and badges.
  - `GET /api/leaderboard` → `{ users: [...] }` with avatars, points, and badge previews.

### Dev Environment (Progress Update)

- Running frontend:
  - Vite dev server: `npm start` or `npm run dev` → `http://localhost:5173/`.
  - Vite preview (production build): `npm run build && npm run preview` → `http://localhost:4173/`.
  - CRA note: CRA typically runs on `http://localhost:3000/`; our current setup uses Vite (5173 dev / 4173 preview).
- Running backend:
  - Express dev server: `npm run dev` → `http://localhost:5000/`.
- How the two communicate:
  - Frontend calls relative `/api/*`.
  - Vite dev proxy is configured in `vite.config.js` to forward `/api` → `http://localhost:5000`.

## 👥 Teammate Responsibilities (for Mentor)

Clear ownership to streamline review and delivery.

- Teammate 2
  - Core Feature 1: Issue Selection & Guidance UI
    - Modal design: Accessible overlay, focus handling, keyboard support, and clear calls to action.
    - Guidance panel content: Beginner-friendly rationale, step-by-step plan, and practical tips.
  - Core Feature 2: Gamification UI
    - Points: Display and accumulate points based on contribution actions (demo data today).
    - Badges: Badge component supports locked/unlocked states; shown in Profile and Leaderboard.
    - Leaderboard page: Paginated view with medals for top ranks and badge previews.
  - Testing work
    - Integration tests verifying navigation across routes and async data loading.
    - Component tests for modal behavior, badge states, and leaderboard rendering.
  - Rationale behind assignment
    - Strong UX orientation and ability to balance beginner-friendliness with technical depth. Owning these flows ensures early user value and defines backend needs.

## 🚀 Upcoming High-Impact Features (Roadmap)

- GitHub OAuth onboarding (via `passport-github2`).
- Personalized issue discovery (language, topic, labels, prior activity).
- Issue scoring logic (beginner-friendliness, effort, popularity).
- Contribution progress tracking (claimed → in progress → PR opened → merged).
- Points + leaderboard backend (persistence, weekly/monthly/all-time ranks).
- Anti-abuse checks (rate limits, duplicate claims, flagged behavior safeguards).
- Settings page (preferences, notifications, filters).
- Accessibility improvements (focus management, ARIA roles, keyboard navigation, contrast).
- Performance optimizations (code-splitting, memoization, image strategies, network caching).

## 🏗️ Technical Architecture

### Frontend Folder Structure

- `frontend/`
  - `index.html` — Vite entry.
  - `vite.config.js` — dev proxy and port config.
  - `vitest.config.js` — test environment (`jsdom`, setup files).
  - `public/` — static assets.
  - `src/`
    - `main.jsx` — React root.
    - `App.jsx` — routes and navbar.
    - `pages/` — `IssuesPage.jsx`, `ProfilePage.jsx`, `LeaderboardPage.jsx`.
    - `components/` — `IssueCard.jsx`, `IssueModal.jsx`, `GuidancePanel.jsx`, `Badge.jsx`.
    - `styles.css` — global styles aligned with Bootstrap.
    - `setupTests.js` — Vitest setup (`@testing-library/jest-dom`).
    - `App.test.jsx`, `App.routes.test.jsx`, component tests.

### Backend Folder Structure

- `backend/`
  - `server.js` — Express app and `/api/*` routes.
  - `.env` / `.env.example` — environment configuration.
  - `package.json` — scripts (`start`, `dev`) and dependencies.

### How API Calls Work

- Frontend uses `fetch('/api/...')` under dev and relative paths for production.
- Vite dev proxy forwards `/api` to `http://localhost:5000` to avoid CORS.
- In tests, API calls are stubbed with deterministic responses using Vitest (`vi.stubGlobal('fetch', ...)`).

### Planned GitHub API Integration

- OAuth via `passport-github2` with a backend callback storing session/JWT.
- Use GitHub REST API to query issues labeled `good-first-issue` and enrich UI.
- Secure token handling and respect rate limits (with caching where appropriate).

### State Management Plan

- Short term: React Context + reducer for session, points, and claims.
- Medium term: Consider Redux Toolkit or Zustand if app state grows across pages.

### Diagram (Simplified)

```text
[ React + Vite UI ]
       |
       | fetch /api/*
       v
[ Express API ] --- [ GitHub API ] (future)
       |
       v
[ Persistence (MongoDB) ] (future for points, claims, badges)
```

## 🖼️ Screenshots / UI Flow (Descriptive)

When UI is partially built, this documents the current and planned flow.

- Onboarding (Planned): GitHub login → brief tour → preferences.
- Discover Issues (Implemented): Cards with beginner-friendly labels; filtering planned; modal opens for details.
- Issue Detail (Implemented): Modal with guidance panel, links, and claim action.
- Leaderboard (Implemented): Paginated table and mobile cards; medals for top ranks.
- Profile (Implemented): Demo points and badges with locked/unlocked states.

## 🛠️ How to Run the Project (Step-by-Step)

### Backend (Port 5000)

```bash
cd backend
npm install
# Dev mode (auto-restart)
npm run dev
# Or production-like run
npm start
# Health check
curl http://localhost:5000/api/test
```

### Frontend (Vite Dev on Port 5173)

```bash
cd frontend
npm install
npm start   # alias for `vite`, opens http://localhost:5173

# Build and preview (production bundle)
npm run build
npm run preview  # serves dist/ at http://localhost:4173
```

### Environment Variables

Create `backend/.env` based on `.env.example`:

```env
PORT=5000
MONGO_URI=<your-mongodb-connection-string>
# Future:
# GITHUB_CLIENT_ID=<from GitHub OAuth app>
# GITHUB_CLIENT_SECRET=<from GitHub OAuth app>
# GITHUB_CALLBACK_URL=http://localhost:5000/auth/github/callback
# JWT_SECRET=<random-string>
```

Frontend can optionally use environment variables prefixed with `VITE_` (e.g., `VITE_API_URL=http://localhost:5000`) if not relying on the dev proxy.

## 🤝 Contribution Guidelines

- Branch naming:
  - `feature/<short-title>`
  - `fix/<short-title>`
  - `chore/<short-title>`
- Commit message format (Conventional Commits):
  - `feat: add IssueModal claim flow`
  - `fix: leaderboard pagination bug`
  - `test: add navigation integration test`
- Review flow:
  - Open PR → link issue (if applicable) → request review → ensure tests pass → squash & merge.
- PR checklist:
  - [ ] Clear description with screenshots if UI changes.
  - [ ] Tests added/updated.
  - [ ] No console errors.
  - [ ] Docs updated (README or inline where applicable).

## 🧩 Conclusion

- Achieved:
  - Core UI built: landing, issues with modal + guidance, profile, leaderboard.
  - Backend alive with demo endpoints: `/api/test`, `/api/issues`, `/api/claim/:id`, `/api/profile`, `/api/leaderboard`.
  - Tests implemented and passing (10/10), including routing and component behaviors.
  - Clear architecture and roadmap for OAuth, personalized discovery, and persistence.
- Remaining:
  - GitHub OAuth and API integration.
  - Persistent points, badges, and claims with MongoDB.
  - Dev proxy and `VITE_API_URL` finalization for clean local API calls.
  - Accessibility and performance optimization.
- Why this matters:
  - Lowers the barrier to open source contribution by making the first steps approachable, guided, and rewarding.
- Thanks:
  - Thank you to our mentor for guidance and feedback. Your insights help us focus on high-impact features and iterate effectively.

---

If you want any adjustments (change data shapes, add filters, or expand guidance content), I can align both frontend and backend accordingly.