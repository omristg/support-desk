
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
app.use('/api/user', require('./routes/user.routes'))

app.use(errorHandler)



app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`)
})