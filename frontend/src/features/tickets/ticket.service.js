
import axios from 'axios'

const API_URL = '/api/ticket/'

export const ticketService = {
    createTicket,
    query,
    getById,
    closeTicket,
}

async function createTicket(ticketData, token) {
    const config = _config(token)
    const res = await axios.post(API_URL, ticketData, config)
    return res.data
}

async function query(token) {
    const config = _config(token)
    const res = await axios.get(API_URL, config)
    return res.data
}

async function getById(ticketId, token) {
    const config = _config(token)
    const res = await axios.get(`${API_URL}${ticketId}`, config)
    return res.data
}

async function closeTicket(ticketId, token) {
    const config = _config(token)
    const res = await axios.put(`${API_URL}${ticketId}`, { status: 'closed' }, config)
    return res.data
}

function _config(token) {
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
}

