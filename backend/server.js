require('dotenv').config()
const express    = require('express')
const cors       = require('cors')
const connectDB  = require('./config/db')

// ── Connect to MongoDB ─────────────────────────────────────────────────────
connectDB()

const app = express()

// ── Middleware ─────────────────────────────────────────────────────────────
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
}))
app.use(express.json())

// ── Routes ─────────────────────────────────────────────────────────────────
app.use('/api/projects', require('./routes/projects'))
app.use('/api/contact',  require('./routes/contact'))

// ── Health check ───────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Portfolio API is running' })
})

// ── 404 handler ────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' })
})

// ── Start server ───────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})
