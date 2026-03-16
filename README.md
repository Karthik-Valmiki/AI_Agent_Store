# AI Agent Marketplace

A full-stack marketplace for discovering and publishing AI agents — built with **React + Vite** on the frontend and **FastAPI + PostgreSQL** on the backend.

---

## Tech Stack

- **Frontend:** React, Vite
- **Backend:** FastAPI, Python
- **Database:** PostgreSQL
- **Auth:** JWT (HS256)

---

## Prerequisites

- Node.js 18+
- Python 3.9+
- PostgreSQL 14+

---

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd <project-directory>
```

### 2. Set up the database

```bash
psql -U postgres
```

```sql
CREATE DATABASE agent_store;
\q
```

### 3. Configure the backend

```bash
cd backend
```

Create a `.env` file:

```env
DATABASE_URL=postgresql://postgres:<your_password>@localhost:5432/agent_store
SECRET_KEY=your-secret-key-minimum-32-characters-long
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Initialize the database and start the server:

```bash
# macOS / Linux
python init_db.py
uvicorn app.main:app --reload

# Windows
start.bat
```

> Backend runs at **http://localhost:8000**

### 4. Set up the frontend

```bash
cd frontend
npm install
npm run dev
```

> Frontend runs at **http://localhost:3000**

---

## Environment Variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `SECRET_KEY` | JWT signing secret (min. 32 chars) |
| `ALGORITHM` | JWT algorithm — `HS256` |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | Token expiry duration |

---

## API Reference

Base URL: `http://localhost:8000/api`

Protected routes require: `Authorization: Bearer <token>`

### Auth

```
POST   /auth/register           Register a new user
POST   /auth/login              Login and receive JWT token
```

### Agents

```
GET    /agents/                 List all agents
POST   /agents/                 Create an agent (developer only)
GET    /agents/recommended      Get personalized recommendations
GET    /agents/trending         Get trending agents
GET    /agents/{id}             Get agent details
```

### Interactions

```
POST   /interactions/track                      Track an interaction
POST   /interactions/ratings                    Submit a rating
GET    /interactions/ratings?agent_id={id}      Get ratings for an agent
GET    /interactions/stats                      Get user statistics
```

### Test

```
GET    /test/db-connection      Verify database connection
GET    /test/cors-test          Verify CORS configuration
```

---

## Database Schema

### `users`

```
id                  PK
username            unique
email               unique
hashed_password
role                developer | consumer
bio
created_at
```

### `agents`

```
id                  PK
name
description
category
developer_id        FK → users.id
version
api_endpoint
is_active
downloads
average_rating
created_at
updated_at
```

### `interactions`

```
id                  PK
user_id             FK → users.id
agent_id            FK → agents.id
interaction_type    view | download | use
created_at
```

### `ratings`

```
id                  PK
user_id             FK → users.id
agent_id            FK → agents.id
score               1–5
review
created_at
```

---

## API Documentation

- **Swagger UI:** http://localhost:8000/docs
- **ReDoc:** http://localhost:8000/redoc

---

## Production Build

```bash
cd frontend
npm run build
```

Output: `frontend/dist/`

---

## Troubleshooting

**Database connection fails**
Verify PostgreSQL is running and the credentials in `.env` are correct. Confirm the `agent_store` database exists:
```bash
psql -U postgres -l
```

**Port already in use**
Change the backend port: `uvicorn app.main:app --reload --port 8001`
Then update `API_URL` in `frontend/src/services/api.js` to match.

**npm install fails**
Delete `node_modules/` and `package-lock.json`, then run `npm install` again.

**Voice search not working**
Voice search uses the Web Speech API — supported in Google Chrome only. Ensure microphone permissions are granted.