const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/auth.middleware')

const { getTickets, getById, createTicket, updateTicket, removeTicket } = require('../controllers/ticket.controller')

const noteRouter = require('./note.routes')
router.use('/:ticketId/note', noteRouter)

router.route('/')
    .get(protect, getTickets)
    .post(protect, createTicket)

router.route('/:id')
    .get(protect, getById)
    .delete(protect, removeTicket)
    .put(protect, updateTicket)

module.exports = router