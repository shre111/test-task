# Assessment Management Application

A MERN-stack application to create structured assessments, take them, and view responses. Authenticated users build assessments as a **Category → Factor → Question** hierarchy, launch them to collect answers, and review submitted responses in structured reports.

- **Live App:** _add deployed URL_
- **API:** _add deployed API URL_

## Features

- **Authentication** — register / login with JWT; all app sections require a logged-in user.
- **Builder** — accordion hierarchy of Category → Factor → Questions with inline edit at every level.
- **Question settings** — a popup defines question types (multiple choice, rating, text, yes/no) and how many of each to add.
- **Load Categories** — reuse previously saved categories by selecting and appending them to the current builder.
- **Save & listing** — saving validates and persists the assessment, resets the builder, and redirects to the Assessments list.
- **Launch Pad** — take a selected assessment; answers render per question type and are validated before submission.
- **Reports** — submitted responses displayed grouped by category and factor.

## Tech Stack

| Layer    | Technology                          |
| -------- | ----------------------------------- |
| Frontend | Vite, React, React Router, Tailwind |
| Backend  | Node.js, Express                    |
| Database | MongoDB with Mongoose               |
| Auth     | JSON Web Tokens, bcrypt             |

## Project Structure

```
.
├── client/                 # React frontend (Vite + Tailwind)
│   └── src/
│       ├── api/            # Axios client with auth interceptor
│       ├── components/     # Reusable UI (modals, accordion items, inputs)
│       ├── context/        # AuthContext (token + user)
│       └── pages/          # Builder, Assessments, LaunchPad, Reports, auth
└── server/                 # Express API
    └── src/
        ├── config/         # MongoDB connection
        ├── controllers/    # Route handlers
        ├── middleware/     # JWT auth guard
        ├── models/         # User, Category, Assessment, Response
        └── routes/         # /api/auth, /categories, /assessments, /responses
```

## Setup

### Prerequisites

- Node.js 18+
- A MongoDB connection string (local `mongod` or MongoDB Atlas)

### 1. Backend

```bash
cd server
npm install
cp .env.example .env       # then fill in the values
npm run dev                # starts on http://localhost:5000
```

`server/.env`:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/assessment
JWT_SECRET=a_long_random_secret
CLIENT_URL=http://localhost:5173
```

### 2. Frontend

```bash
cd client
npm install
cp .env.example .env        # VITE_API_URL defaults to http://localhost:5000/api
npm run dev                 # starts on http://localhost:5173
```

Open http://localhost:5173, register an account, and start building.

## API Overview

| Method | Endpoint              | Description                          |
| ------ | --------------------- | ------------------------------------ |
| POST   | `/api/auth/register`  | Register, returns JWT                |
| POST   | `/api/auth/login`     | Login, returns JWT                   |
| GET    | `/api/auth/me`        | Current user (protected)             |
| GET    | `/api/categories`     | List saved categories (Load)         |
| POST   | `/api/categories`     | Create a category                    |
| GET    | `/api/assessments`    | List assessments                     |
| POST   | `/api/assessments`    | Save assessment + categories         |
| GET    | `/api/assessments/:id`| Get one assessment                   |
| POST   | `/api/responses`      | Submit a response                    |
| GET    | `/api/responses`      | List submitted responses (Reports)   |

All routes except register/login require an `Authorization: Bearer <token>` header.

## Architecture Overview

- **Hierarchy as embedded documents.** A `Category` embeds `Factor` subdocuments, which embed `Question` subdocuments. This keeps the whole tree in one document and matches the accordion UI exactly.
- **Assessments snapshot their content.** When saved, an `Assessment` stores a copy of the category tree rather than referencing categories. Editing or reusing a category later never mutates an already-saved assessment.
- **Categories are upserted for reuse.** Saving an assessment upserts each category (by name, per user) into the `Category` collection, which powers Load Categories.
- **Responses are denormalized.** Each `Response` stores the assessment title and, per answer, the category, factor, question text, type, and value — so Reports render without re-joining the original assessment.
- **Auth.** Passwords are bcrypt-hashed; a JWT is issued on register/login, stored in `localStorage`, and attached by an Axios interceptor. A `protect` middleware guards API routes and the frontend guards routes via `ProtectedRoute`.

## Key Decisions

- **Monorepo** with separate `client` and `server` for a single source repo and independent deploys.
- **Builder state is local** until save — fast, no per-keystroke writes; one atomic POST persists everything.
- **Question settings generate empty slots** of the chosen types/counts, which the user then fills in, separating configuration from authoring as the brief describes.
- **Tailwind** for quick, consistent styling of the nested accordion and modals.
- **Open CORS** for ease of evaluation; tighten to `CLIENT_URL` for production hardening.

## Deployment

- **Frontend → Vercel:** root directory `client`, framework Vite, build `npm run build`, output `dist`. `client/vercel.json` rewrites all routes to `index.html` for SPA routing. Set `VITE_API_URL` to the deployed API URL + `/api`.
- **Backend → Render:** see `render.yaml` (root directory `server`). Set `MONGO_URI` and `JWT_SECRET` env vars. Use a MongoDB Atlas connection string for `MONGO_URI`.

## AI Usage Summary

This project was built with **Claude Code** as the AI-assisted development tool.

**Tools used**

- Claude Code (Anthropic) — scaffolding, model/controller/component generation, and integration testing.

**Sample prompts**

- "Build a MERN Assessment Management app: JWT auth, a Builder with a Category → Factor → Question accordion, a question-settings popup for types and counts, Load Categories, save + listing, Launch Pad, and Reports."
- "Model the Category → Factor → Question hierarchy in Mongoose using embedded subdocuments, and snapshot the tree onto saved assessments."
- "Add a Launch Pad that renders each question by type (rating, multiple choice, text, yes/no), validates completeness, and submits a denormalized response."

**Generated vs. manually implemented**

- _AI-generated:_ project scaffold, Express models/controllers/routes, React pages and components, Tailwind styling, and integration test scripts.
- _Manually directed/reviewed:_ data-model design (embedding vs. referencing, category reuse via upsert, denormalized responses), the incremental issue → branch → PR → merge workflow, and verification of each layer with model, save-flow, response, and full HTTP end-to-end tests before merging.
