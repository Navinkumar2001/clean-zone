const express = require('express')
const cors = require('cors')

const app = express()
const PORT = 3001

// Middleware
app.use(cors())
app.use(express.json())

// Local storage for users
const users = [
  { id: 1, name: 'Demo User', email: 'demo@cleanzone.com', password: 'demo123', phone: '9876543210', state: 'Tamil Nadu', city: 'Salem', address: '123 Main St', joinedDate: '2024-01-01' }
]

// Auth Routes
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body
  
  const user = users.find(u => u.email === email && u.password === password)
  
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }
  
  const { password: _, ...userWithoutPassword } = user
  res.json(userWithoutPassword)
})

app.post('/api/auth/signup', (req, res) => {
  const { name, email, password } = req.body
  
  const existingUser = users.find(u => u.email === email)
  if (existingUser) {
    return res.status(400).json({ error: 'User already exists' })
  }
  
  const newUser = {
    id: users.length + 1,
    name,
    email,
    password,
    phone: '',
    state: '',
    city: '',
    address: '',
    joinedDate: new Date().toISOString()
  }
  
  users.push(newUser)
  const { password: _, ...userWithoutPassword } = newUser
  res.json(userWithoutPassword)
})

// Debug endpoint to view users
app.get('/api/debug/users', (req, res) => {
  res.json(users.map(u => ({ ...u, password: undefined })))
})

app.listen(PORT, () => {
  console.log(`🌱 CleanZone Server running on port ${PORT}`)
  console.log(`💾 Using local storage for users`)
  console.log(`🔍 View users: http://localhost:${PORT}/api/debug/users`)
})