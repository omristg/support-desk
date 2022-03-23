import axios from 'axios'

const API_URL = '/api/user'

export const userService = {
    register,
    logout,
}

async function register(userData) {
    const res = await axios.post(API_URL, userData)
    if (res.data) {
        localStorage.setItem('user', JSON.stringify(res.data))
    }
    return res.data
}

function logout() {
    localStorage.removeItem('user')
}