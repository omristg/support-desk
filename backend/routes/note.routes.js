const express = require('express')
const router = express.Router({ mergeParams: true })

const { protect } = require('../middleware/auth.middleware')
const { getNotes, addNote, updateNote } = require('../controllers/note.controller')

router.route('/')
    .get(protect, getNotes)
    .post(protect, addNote)


router.route('/:noteId')
    .put(protect, updateNote)

module.exports = router