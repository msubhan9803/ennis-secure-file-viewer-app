# Take-Home: Secure Document Link Generator

## Introduction
Thanks for taking the time! This exercise evaluates practical full-stack skills by building a small feature common in fintech: generating secure, temporary document links. We want to see your API design, state management, and how you wire a React frontend to a backend.

**Timebox:** Aim for 1–2 hours. We value a clean, working solution over completeness.

---

## Tech Constraints (Required)
**Runtime/tooling:** Bun  
**Backend:** NestJS (run with Bun)  
**Frontend:** React + TypeScript (Vite or preferred setup, run with Bun)  
**Data store:** Bun’s built-in SQLite driver (`bun:sqlite`) with an in-memory database  
Example: `new Database(":memory:")`  
**No external DBs** (e.g., Postgres) for this test.

**Rationale:** Matches our stack direction (TypeScript + Bun) and tests comfort with lightweight persistence.

---

## Scenario
Users often access sensitive documents (statements, tax forms). Instead of linking directly to files, we issue one-time, secure links that reveal only the document name when redeemed.

---

## Core Requirements

### Backend (NestJS + Bun)
Create a NestJS app exposing two endpoints. Persist link metadata in SQLite (in-memory) via `bun:sqlite`.

#### `POST /api/generate-link`
- Generate a cryptographically strong token (32+ random bytes hex/base64url).
- Insert into SQLite (in-memory).
- Return `{ "link": "http://localhost:3000/docs/view/<token>" }`
- Adjust host/port if your backend runs elsewhere.

#### `GET /api/docs/view/:token`
- Look up token in SQLite.
- **One-time use required.**
- If token not found or already redeemed, return `404` with `{ "error": "Invalid or expired link." }`

**Notes:**
- Keep SQLite in-memory (no file backing).
- Keep code small, clean, and readable.

---

## Frontend (React + TypeScript, run with Bun)

### UI
Display a hardcoded list:
- `2024-Q3-Statement.pdf`
- `2023-Tax-Form-1099.pdf`

Each row has a **“Generate Secure Link”** button.

### Behavior
- Clicking generates a `POST` to `/api/generate-link` with the selected `documentName`.
- On success, display the returned secure link under that document (allow copy).

#### Bonus (Viewing Page)
**Route:** `/docs/view/:token`
- On mount, call `GET /api/docs/view/:token`.
- If 200 → display:  
  `You are now securely viewing: <documentName>`
- If 404 → display:  
  `Invalid or expired link.`

---

## Running with Bun

### Backend
```bash
bun install
bun run start:dev
