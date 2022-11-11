import axios from 'axios';

const { NEXT_PUBLIC_API } = process.env;
const baseURL = `${NEXT_PUBLIC_API}/suggestion/`;

export const createSuggestion = async ({ opinion }) => {
    const { data } = await axios.post(baseURL, { opinion });
    return data;
}

export const getAllPinnedSuggestions = async () => {
    return axios.get(`${baseURL}?pinned=true`)
}