import axios from 'axios';
import { BASE_URL } from '../../utils/url';
import { getUserFromStorage } from '../../utils/getUserFromStorage';

interface CategoryData {
    type: string;
    name: string;
}

// add category
export const addCategoryAPI = async ({ type, name }: CategoryData) => {
    const token = getUserFromStorage();
    const response = await axios.post(
        `${BASE_URL}/category/create`,
        {
            type,
            name,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

interface Category {
    _id: string;
    name: string;
    type: string;
}

// list category
export const listCategoriesAPI = async (): Promise<Category[]> => {
    const token = getUserFromStorage();
    const response = await axios.get(`${BASE_URL}/category/lists`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

// update category
export const updateCategoryAPI = async ({ type, name, _id }: Category) => {
    const token = getUserFromStorage();
    const response = await axios.put(
        `${BASE_URL}/category/update/${_id}`,
        {
            type,
            name,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

// delete
export const deleteCategoryAPI = async (id: string) => {
    const token = getUserFromStorage();
    const response = await axios.delete(`${BASE_URL}/category/delete/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

// delete
export const getCategoryAPI = async (id: string): Promise<Category> => {
    const token = getUserFromStorage();
    const response = await axios.get(`${BASE_URL}/category/get/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};
