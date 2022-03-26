import axios from 'axios'

const API_URL = '/api/ticket/'

export const noteService = {
    getNotes,
    addNote
}

async function getNotes(ticketId, token) {
    const config = _config(token)
    const res = await axios.get(`${API_URL}${ticketId}/note`, config)
    return res.data
}

async function addNote(noteText, ticketId, token) {
    const config = _config(token)
    const res = await axios.post(`${API_URL}${ticketId}/note`, { text: noteText }, config)
    return res.data
}

function _config(token) {
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
}