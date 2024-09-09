import axios from 'axios';
import { BASE_URL } from '../../utils/url';
import { getUserFromStorage } from '../../utils/getUserFromStorage';

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

interface UpdatePasswordData {
    password: string;
}

// update password
export const changePasswordAPI = async (data: UpdatePasswordData) => {
    const token = getUserFromStorage();
    const response = await axios.put(
        `${BASE_URL}/users/change-password`,
        {
            newPassword: data.password,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

interface ProfileData {
    username: string;
}

// update profile
export const updateProfileAPI = async (data: ProfileData) => {
    const token = getUserFromStorage();
    const response = await axios.put(
        `${BASE_URL}/users/update-profile`,
        {
            username: data.username,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

interface UserData {
    username: string;
    email: string;
}

// get user profile
export const getUserAPI = async (): Promise<UserData> => {
    const token = getUserFromStorage();
    const response = await axios.get(`${BASE_URL}/users/profile`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};
