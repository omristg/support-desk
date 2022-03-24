
import axios from 'axios'

const API_URL = '/api/ticket/'

export const ticketService = {
    createTicket
}

async function createTicket(ticketData, token) {
    const config = _config(token)
    const res = await axios.post(API_URL, ticketData, config)
    return res.data
}

function _config(token) {
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
}

