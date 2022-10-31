import axios from 'axios';

const { NEXT_PUBLIC_API } = process.env;
const baseURL = `${NEXT_PUBLIC_API}/user`;

const authHeaders = (token) => ({
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const getMe = async (token) => {
    const { data } = await axios.get(`${baseURL}/me`, authHeaders(token));
    return data;
}