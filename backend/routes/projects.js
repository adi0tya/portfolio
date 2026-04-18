const express = require('express')
const router  = express.Router()
const Project = require('../models/Project')

// GET /api/projects — fetch all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 })
    res.json({ success: true, data: projects })
  } catch (error) {
    console.error('GET /api/projects error:', error.message)
    res.status(500).json({ success: false, message: 'Server error' })
  }
})

// POST /api/projects — add a new project
router.post('/', async (req, res) => {
  try {
    const { title, description, techStack, image, liveLink, githubLink } = req.body

    if (!title || !description) {
      return res.status(400).json({ success: false, message: 'Title and description are required' })
    }

    const project = await Project.create({ title, description, techStack, image, liveLink, githubLink })
    res.status(201).json({ success: true, data: project })
  } catch (error) {
    console.error('POST /api/projects error:', error.message)
    res.status(500).json({ success: false, message: 'Server error' })
  }
})

module.exports = router
