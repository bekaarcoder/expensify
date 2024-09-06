import axios from 'axios';
import { BASE_URL } from '../../utils/url';
import { getUserFromStorage } from '../../utils/getUserFromStorage';

interface Transaction {
    _id?: string;
    type: string;
    amount: number;
    category: string;
    date?: string;
    description?: string;
}
// add
export const addTransactionAPI = async ({
    type,
    amount,
    category,
    date,
    description,
}: Transaction) => {
    const token = getUserFromStorage();
    const response = await axios.post(
        `${BASE_URL}/transaction/create`,
        {
            type,
            amount,
            category,
            date,
            description,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

// list
export const getTransactionsAPI = async (): Promise<Transaction[]> => {
    const token = getUserFromStorage();
    const response = await axios.get(`${BASE_URL}/transaction/lists`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};
