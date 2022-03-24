const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/auth.middleware')

const { getTickets, getById, createTicket, updateTicket, removeTicket } = require('../controllers/ticket.controller')

router.route('/')
    .get(protect, getTickets)
    .post(protect, createTicket)

router.get('/:id', protect, getById)
router.delete('/:id', protect, removeTicket)
router.put('/:id', protect, updateTicket)

module.exports = router