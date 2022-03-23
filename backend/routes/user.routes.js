const express = require('express')
const router = express.Router()
const { userRegister, userLogin } = require('../controllers/user.controller')

router.post('/', userRegister)
router.post('/login', userLogin)


module.exports = router