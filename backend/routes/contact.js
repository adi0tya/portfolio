const express = require('express')
const router  = express.Router()
const Contact = require('../models/Contact')

// POST /api/contact — save contact form submission
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email, and message are required' })
    }

    const contact = await Contact.create({ name, email, message })
    res.status(201).json({ success: true, message: 'Message received! I will get back to you soon.', data: contact })
  } catch (error) {
    console.error('POST /api/contact error:', error.message)
    res.status(500).json({ success: false, message: 'Server error' })
  }
})

module.exports = router
