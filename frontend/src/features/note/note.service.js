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

async function addNote(ticketId, noteData) {

}

function _config(token) {
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
}