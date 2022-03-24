
require('dotenv').config()
require('colors')
const express = require('express')
const connectDB = require('./config/db')
const { errorHandler } = require('./middleware/error.middleware')

const PORT = process.env.PORT

connectDB()
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.get('/', (req, res) => {
    res.send('Hello')
})

// Routes
const userRoutes = require('./routes/user.routes')
const ticketRoutes = require('./routes/ticket.routes')

app.use('/api/user', userRoutes)
app.use('/api/ticket', ticketRoutes)

app.use(errorHandler)



app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`)
})