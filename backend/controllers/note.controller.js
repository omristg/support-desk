const asyncHandler = require('express-async-handler')
const User = require('../models/user.model')
const Ticket = require('../models/ticket.model')
const Note = require('../models/note.model')

// @desc Get notes for a ticket
// @route GET /api/ticket/:ticketId/note
// @access Private
const getNotes = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }
    const ticket = await Ticket.findById(req.params.ticketId)

    if (ticket.user.toString() !== user._id.toString()) {
        res.status(401)
        throw new Error('User not authorized')
    }
    const notes = await Note.find({ ticket: req.params.ticketId })
    res.status(200).json(notes)
})

// @desc Create note for a ticket
// @route POST /api/ticket/:ticketId/note
// @access Private
const addNote = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }
    const ticket = await Ticket.findById(req.params.ticketId)
    if (ticket.user.toString() !== user._id.toString()) {
        res.status(401)
        throw new Error('User not authorized')
    }
    const note = await Note.create({
        ticket: ticket._id,
        user: user._id,
        text: req.body.text,
        isStaff: false
    })
    res.status(200).json(note,)
})

// @desc Create note for a ticket
// @route POST /api/ticket/:ticketId/note
// @access Private
const updateNote = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }
    const ticket = await Ticket.findById(req.params.ticketId)
    if (ticket.user.toString() !== user._id.toString()) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const { noteId } = req.params

    const updatedNote = await Note.findByIdAndUpdate(noteId, {
        isStaff: true
    })
    res.status(200).json(updatedNote)
})

module.exports = {
    getNotes,
    addNote,
    updateNote,
}
