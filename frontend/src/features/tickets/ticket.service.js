
import axios from 'axios'

const API_URL = '/api/ticket/'

export const ticketService = {
    createTicket,
    query,
}

async function createTicket(ticketData, token) {
    const config = _config(token)
    const res = await axios.post(API_URL, ticketData, config)
    return res.data
}

async function query(token) {
    const config = _config(token)
    const res = await axios.get(API_URL, config)
    const tickets = res.data
    console.log(tickets);
    return tickets
}

function _config(token) {
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
}

