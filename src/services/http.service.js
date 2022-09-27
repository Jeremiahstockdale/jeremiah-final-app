import axios from 'axios';
const URL = 'http://localhost:8080/api'

export function login({ username, password }) {
    return axios.post(`${URL}/users/login`, { username, password });
}

export function signup({ username, password }) {
    return axios.post(`${URL}/users`, { username, password });
}

export function addMoneyById({ id, pretendMoney }) {
    return axios.put(`${URL}/users/profile`, { id, pretendMoney });
}

export function deleteAccount({ id }) {
    return axios.delete(`${URL}/users`, { id })
}

export function addLikedStock({ symbol, userId }) {
    return axios.post(`${URL}/likes`, { symbol, userId })
}

export function deleteLikedStock(id) {
    return axios.delete(`${URL}/likes/${id}`)
}

export function getAllLikedStocks(userId) {
    return axios.get(`${URL}/likes/${userId}`)
}

export function getLikedStockById(id) {
    return axios.get(`${URL}/likes/${id}`)
}

export function addTrade({ symbol, userId, sharePrice, shares }) {
    return axios.post(`${URL}/trades`, { symbol, userId, sharePrice, shares })
}

export function deleteTrade(id) {
    return axios.delete(`${URL}/trades/${id}/`)
}

// need to update acc value (addMoneyById) before deleting
// with 'pretendMoney' = shares * price
export function getAllTrades(userId) {
    return axios.get(`${URL}/trades/${userId}`)
}
