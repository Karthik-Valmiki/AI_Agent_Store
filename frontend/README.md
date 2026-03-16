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
