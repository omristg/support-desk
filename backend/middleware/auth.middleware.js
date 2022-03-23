const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

const protect = asyncHandler(async (req, res, next) => {
    let token
    if (req.headers.authorization?.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded._id).select('-password')
            next()
        } catch (error) {
            res.status(401)
            throw new Error('Unauthorized')
        }
    }
    if (!token) {
        res.status(401)
        throw new Error('Unauthorized')
    }
})
module.exports = {
    protect
}
