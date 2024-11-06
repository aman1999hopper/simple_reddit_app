import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const register = (username, password) => {
    return axios.post(`${API_URL}/auth/register`, { username, password });
};

export const login = (username, password) => {
    return axios.post(`${API_URL}/auth/login`, { username, password });
};

export const getPosts = () => {
    return axios.get(`${API_URL}/posts`);
};

export const createPost = (title, image, token) => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', image);

    return axios.post(`${API_URL}/posts`, formData, {
        headers: { Authorization: token, 'Content-Type': 'multipart/form-data' }
    });
};

export const votePost = (postId, voteType, token) => {
    return axios.post(`${API_URL}/posts/${postId}/vote`, { voteType }, {
        headers: { Authorization: token }
    });
};
