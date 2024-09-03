import axios from 'axios';
import { BASE_URL } from '../../utils/url';

interface LoginData {
    email: string;
    password: string;
}

// login
export const loginAPI = async (userData: LoginData) => {
    const response = await axios.post(`${BASE_URL}/users/login`, {
        email: userData.email,
        password: userData.password,
    });

    return response.data;
};

interface RegisterData {
    username: string;
    email: string;
    password: string;
}

// register
export const registerAPI = async (userData: RegisterData) => {
    const response = await axios.post(`${BASE_URL}/users/register`, {
        username: userData.username,
        email: userData.email,
        password: userData.password,
    });

    return response.data;
};
