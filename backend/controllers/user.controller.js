const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const User = require('../models/user.model')

const userRegister = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body
    if (!username || !email || !password) {
        res.status(400)
        throw new Error('Please enter all the fields')
    }

    // Find if user already exists
    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    // bcrypt the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Creaate user 
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

const userLogin = asyncHandler(async (req, res) => {
    res.send('Login User')
})

module.exports = {
    userRegister,
    userLogin
}