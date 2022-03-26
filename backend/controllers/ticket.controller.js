const asyncHandler = require('express-async-handler')
const User = require('../models/user.model')
const Ticket = require('../models/ticket.model')

// @desc Get user tickets
// @route GET /api/ticket
// @access Private
const getTickets = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }
    const tickets = await Ticket.find({ user: user._id })
    res.status(200).json(tickets)
})

// @desc Get user ticket by id
// @route GET /api/ticket/:id
// @access Private
const getById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const ticket = await Ticket.findById(req.params.id)

    if (!ticket) {
        res.status(404)
        throw new Error('Ticket not found')
    }

    if (ticket.user.toString() !== user._id.toString()) {
        res.status(401)
        throw new Error('Unauthorized')
    }

    res.status(200).json(ticket)
})

// @desc Remove ticket by id
// @route DELETE /api/ticket/:id
// @access Private
const removeTicket = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const ticket = await Ticket.findById(req.params.id)

    if (!ticket) {
        res.status(404)
        throw new Error('Ticket not found')
    }

    if (ticket.user.toString() !== user._id.toString()) {
        res.status(401)
        throw new Error('Unauthorized')
    }

    await ticket.remove()

    res.status(200).json({ success: true })
})

// @desc Update ticket by id
// @route PUT /api/ticket/:id
// @access Private
const updateTicket = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const ticket = await Ticket.findById(req.params.id)

    if (!ticket) {
        res.status(404)
        throw new Error('Ticket not found')
    }

    if (ticket.user.toString() !== user._id.toString()) {
        res.status(401)
        throw new Error('Unauthorized')
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.status(200).json(updatedTicket)
})

// @desc Create a ticket
// @route POST /api/tickets
// @access Private
const createTicket = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (!user) {
        res.status(400)
        throw new Error('User not found')
    }

    const { product, description } = req.body
    if (!product || !description) {
        res.status(403)
        throw new Error('Please fill product and description')
    }

    const ticket = await Ticket.create({
        product,
        description,
        user: user._id,
        status: 'new'
    })


    res.status(201).json(ticket)
})

module.exports = {
    getTickets,
    getById,
    createTicket,
    updateTicket,
    removeTicket

}
