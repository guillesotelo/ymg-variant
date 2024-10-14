import axios from 'axios';
import { dataObj, userType, subscriptionType } from '../app/types';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

// User
const loginUser = async (data: userType) => {
    try {
        const user = await axios.post(`${BASE_URL}/api/user/login`, data, { withCredentials: true })
        const localUser = JSON.parse(localStorage.getItem('user') || '{}')
        localStorage.setItem('user', JSON.stringify({
            ...localUser,
            ...user.data
        }))
        return user.data
    } catch (err) { console.error(err) }
}

const verifyToken = async (token?: string) => {
    try {
        const verify = await axios.post(`${BASE_URL}/api/user/verify`, {}, { withCredentials: true, params: { token } })
        return verify.data || false
    } catch (err) { return false }
}

const registerUser = async (data: userType) => {
    try {
        const newUser = await axios.post(`${BASE_URL}/api/user/create`, data, { withCredentials: true })
        return newUser.data
    } catch (err) { console.error(err) }
}

const updateUser = async (data: userType, token?: string) => {
    try {
        const user = await axios.post(`${BASE_URL}/api/user/update`, data, { withCredentials: true, params: { token } })
        const localUser = JSON.parse(localStorage.getItem('user') || '{}')
        localStorage.setItem('user', JSON.stringify({
            ...localUser,
            ...user.data
        }))
        return user.data
    } catch (err) { console.error(err) }
}

const logOut = async () => {
    try {
        const loggedOut = await axios.post(`${BASE_URL}/api/user/logout`, {}, { withCredentials: true })
        return loggedOut.data
    } catch (err) { return false }
}

// Subscription
const getAllEmails = async (token?: string) => {
    try {
        const res = await axios.get(`${BASE_URL}/api/app/getEmails`, { withCredentials: true, params: { token } })
        return res.data
    } catch (err) { console.error(err) }
}

const subscribeEmail = async (data: dataObj) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/app/subscribe`, data)
        return response.data
    } catch (err) { console.error(err) }
}

const updateSubscription = async (data: subscriptionType) => {
    try {
        const res = await axios.post(`${BASE_URL}/api/app/updateSubscription`, data)
        return res.data
    } catch (err) { console.error(err) }
}

const unsubscribeByEmail = async (data: subscriptionType) => {
    try {
        const res = await axios.post(`${BASE_URL}/api/app/unsubscribeByEmail`, data)
        return res.data
    } catch (err) { console.error(err) }
}

const sendUnsubscriptionEmail = async (data: subscriptionType) => {
    try {
        const res = await axios.post(`${BASE_URL}/api/app/sendUnsubscriptionEmail`, data)
        return res.data
    } catch (err) { console.error(err) }
}

const sendContactEmail = async (data: dataObj) => {
    try {
        const email = await axios.post(`${BASE_URL}/api/app/sendContactEmail`, data)
        return email.data
    } catch (err) { console.error(err) }
}

export {
    sendContactEmail,
    subscribeEmail,
    getAllEmails,
    updateSubscription,
    unsubscribeByEmail,
    sendUnsubscriptionEmail,

    loginUser,
    verifyToken,
    registerUser,
    updateUser,
    logOut,
}