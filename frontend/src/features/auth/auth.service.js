import axios from 'axios'

const API_URL = '/api/user'

export const authService = {
    register,
    logout,
    login,
}

async function register(userData) {
    const res = await axios.post(API_URL, userData)
    if (res.data) {
        localStorage.setItem('user', JSON.stringify(res.data))
    }
    return res.data
}

async function login(credentials) {
    const res = await axios.post(`${API_URL}/login`, credentials)
    if (res.data) {
        localStorage.setItem('user', JSON.stringify(res.data))
    }
    return res.data
}

function logout() {
    localStorage.removeItem('user')
}

