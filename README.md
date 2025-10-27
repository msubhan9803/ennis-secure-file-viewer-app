# Ennis-Puentes Monorepo (Bun + React + NestJS)

This repo contains two apps:

- frontend: React + Vite + TypeScript
- backend: NestJS (running on Bun)

## Prerequisites

- Bun installed: https://bun.sh

## Setup

Install dependencies in both apps:

```bash
cd backend && bun install
cd ../frontend && bun install
```

## Running

- Backend (http://localhost:3000):

```bash
cd backend
bun run dev
```

- Frontend (http://localhost:5173):

```bash
cd frontend
bun run dev
```

The frontend expects `VITE_API_URL` to point to the backend.
If not set, it defaults to `http://localhost:3000`.

## Build

```bash
cd backend && bun run build
cd ../frontend && bun run build
```
