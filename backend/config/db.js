const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`)
    console.log('⚠️  Running without database — contact form and projects API unavailable')
    // Do NOT exit — let the server keep running so frontend still works
  }
}

module.exports = connectDB
