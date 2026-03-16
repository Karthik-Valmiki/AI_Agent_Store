# AI Agent Marketplace - Frontend (React + Vite)

## Quick Start

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

Frontend will run on: http://localhost:3000

## Features

### For All Users
- Browse AI agents marketplace
- Filter by category
- Search agents by name/description
- Voice search (Chrome only)
- View agent details

### For Consumers
- Get personalized recommendations
- Track interactions
- Rate agents
- View usage statistics

### For Developers
- Publish new agents
- View agent statistics
- Track downloads and ratings
- Manage published agents


## API Integration

Backend API URL: `http://localhost:8000/api`

### Authentication Flow
1. User registers/logs in
2. JWT token stored in localStorage
3. Token sent with every API request
4. Auto-redirect to login on 401 error

### Voice Search
- Uses Web Speech API
- Chrome browser required
- Click microphone button to activate
- Speaks search query

## Environment

No environment variables needed. API URL is hardcoded in `src/services/api.js`

To change API URL, edit:
```javascript
const API_URL = 'http://localhost:8000/api';
```

## Build for Production

```bash
npm run build
```

Output in `dist/` folder

## Troubleshooting

### npm install fails
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

### Port 3000 already in use
- Edit `vite.config.js` and change port
- Or kill process using port 3000

### Voice search not working
- Use Google Chrome browser
- Allow microphone permissions
- Check browser console for errors

### API connection fails
- Ensure backend is running on port 8000
- Check browser console for CORS errors
- Verify API URL in `src/services/api.js`


# AI Agent Marketplace - Backend (FastAPI)

## Quick Start

### 1. Create PostgreSQL Database
```bash
psql -U postgres
CREATE DATABASE agent_store;
\q
```

### 2. Install Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 3. Start Server
```bash
# Windows
start.bat

# Linux/Mac
python init_db.py
uvicorn app.main:app --reload
```

## API Endpoints

### Test Endpoints
- `GET /api/test/db-connection` - Test database connection
- `GET /api/test/cors-test` - Test CORS configuration

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Agents
- `GET /api/agents/` - List all agents
- `POST /api/agents/` - Create agent (developer only)
- `GET /api/agents/recommended` - Get recommendations
- `GET /api/agents/trending` - Get trending agents
- `GET /api/agents/{id}` - Get agent details

### Interactions
- `POST /api/interactions/track` - Track interaction
- `POST /api/interactions/ratings` - Create rating
- `GET /api/interactions/ratings?agent_id={id}` - Get ratings
- `GET /api/interactions/stats` - Get user stats

## Database Schema

### Users Table
- id (Primary Key)
- username (Unique)
- email (Unique)
- hashed_password
- role (developer/consumer)
- bio
- created_at

### Agents Table
- id (Primary Key)
- name
- description
- category
- developer_id (Foreign Key -> users.id)
- version
- api_endpoint
- is_active
- downloads
- average_rating
- created_at
- updated_at

### Interactions Table
- id (Primary Key)
- user_id (Foreign Key -> users.id)
- agent_id (Foreign Key -> agents.id)
- interaction_type (view/download/use)
- created_at

### Ratings Table
- id (Primary Key)
- user_id (Foreign Key -> users.id)
- agent_id (Foreign Key -> agents.id)
- score (1-5)
- review
- created_at

## Environment Variables (.env)
```
DATABASE_URL=postgresql://postgres:first123@localhost:5432/agent_store
SECRET_KEY=your-secret-key-change-in-production-min-32-characters-long
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440
```

## Testing

### Test Database Connection
```bash
python init_db.py
```

### Access API Documentation
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Troubleshooting

### Database Connection Error
- Ensure PostgreSQL is running
- Verify database 'agent_store' exists
- Check credentials in .env file

### Import Errors
- Run: `pip install -r requirements.txt`

### Port Already in Use
- Change port: `uvicorn app.main:app --reload --port 8001`
