require('dotenv').config()
require('colors')
const express = require('express')
const path = require('path')
const connectDB = require('./config/db')
const { errorHandler } = require('./middleware/error.middleware')


const PORT = 5000

connectDB()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes
const userRoutes = require('./routes/user.routes')
const ticketRoutes = require('./routes/ticket.routes')

app.use('/api/user', userRoutes)
app.use('/api/ticket', ticketRoutes)

// Serve Frontend
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    
    app.get('*', (_, res) => {
        res.sendFile(path.join(__dirname, '../frontend/build/index.html'))
    })
} else {
    app.get('/', (req, res) => {
        res.status(200).json({ message: 'Welcome to the Support Desk API' })
    })
}


app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`)
})