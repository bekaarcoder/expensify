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
