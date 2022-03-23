const express = require('express')
const router = express.Router()
const { userRegister, userLogin, getMe } = require('../controllers/user.controller')
const { protect } = require('../middleware/auth.middleware')

router.post('/', userRegister)
router.post('/login', userLogin)
router.get('/me', protect, getMe)


module.exports = router