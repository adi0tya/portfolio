# Aditya Dash — Portfolio

Full-stack portfolio built with React + Vite (frontend) and Node.js + Express + MongoDB (backend).

## Project Structure

```
aditya-portfolio/
├── frontend/          # React + Vite app
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── sections/
│   │   │   ├── three/
│   │   │   └── ui/
│   │   ├── data/
│   │   └── services/
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── .env
└── backend/           # Node.js + Express + MongoDB
    ├── config/
    ├── models/
    ├── routes/
    ├── server.js
    ├── package.json
    └── .env
```

## Running Locally

### Backend
```bash
cd backend
npm install
node server.js
# Runs on http://localhost:5000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

## Environment Variables

**backend/.env**
```
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.vc13mcy.mongodb.net/portfolio?retryWrites=true&w=majority&appName=Cluster0
PORT=5000
```

**frontend/.env**
```
VITE_API_URL=http://localhost:5000
```
