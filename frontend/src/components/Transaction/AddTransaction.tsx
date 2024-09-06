import { useMutation, useQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { listCategoriesAPI } from '../../services/category/categoryService';
import { addTransactionAPI } from '../../services/transactions/transactionService';
import { getCurrentDate } from '../../utils/getCurrentDate';

interface TransactionFormValues {
    type: string;
    amount: number;
    category: string;
    date: string;
    description: string;
}

const validationSchema = Yup.object({
    type: Yup.string()
        .oneOf(['income', 'expense'], 'Invalid category type')
        .required('Transaction type is required'),
    amount: Yup.number()
        .positive('Amount must be positive')
        .required('Amount is required'),
    category: Yup.string().required('Category is required'),
});

const AddTransaction = () => {
    const navigate = useNavigate();

    const { data } = useQuery({
        queryFn: listCategoriesAPI,
        queryKey: ['list-categories'],
    });

    const { mutateAsync, isPending, error } = useMutation({
        mutationFn: addTransactionAPI,
        mutationKey: ['add-transaction'],
    });

    const formik = useFormik<TransactionFormValues>({
        initialValues: {
            type: '',
            amount: 0,
            category: '',
            date: getCurrentDate(),
            description: '',
        },
        validationSchema,
        onSubmit: (values) => {
            console.log(values);
            mutateAsync(values)
                .then((data) => {
                    console.log(data);
                    navigate('/dashboard');
                    toast.success('Transaction added successfully');
                })
                .catch((e) => {
                    console.log('Error', e);
                    if (isAxiosError(error)) {
                        toast.error(error.response?.data.error);
                    } else {
                        toast.error(e.response?.data.error);
                    }
                });
        },
    });

    return (
        <div className="container">
            <div className="row my-5 justify-content-center">
                <div className="col-md-5">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="text-center">Add Transaction</h3>
                            <p className="text-center my-2">
                                Create and add transaction details
                            </p>
                            <form
                                className="my-3"
                                onSubmit={formik.handleSubmit}
                            >
                                {/* type field */}
                                <div className="mb-3">
                                    <label
                                        htmlFor="type"
                                        className="form-label"
                                    >
                                        Type
                                    </label>
                                    <select
                                        className={
                                            formik.touched.type &&
                                            formik.errors.type
                                                ? 'form-select is-invalid'
                                                : 'form-select'
                                        }
                                        id="type"
                                        {...formik.getFieldProps('type')}
                                    >
                                        <option value="">Select Type</option>
                                        <option value="income">Income</option>
                                        <option value="expense">Expense</option>
                                    </select>
                                    {formik.touched.type &&
                                        formik.errors.type && (
                                            <div className="invalid-feedback">
                                                {formik.errors.type}
                                            </div>
                                        )}
                                </div>
                                {/* amount field */}
                                <div className="mb-3">
                                    <label
                                        htmlFor="amount"
                                        className="form-label"
                                    >
                                        Amount
                                    </label>
                                    <input
                                        type="number"
                                        className={
                                            formik.touched.amount &&
                                            formik.errors.amount
                                                ? 'form-control is-invalid'
                                                : 'form-control'
                                        }
                                        id="amount"
                                        {...formik.getFieldProps('amount')}
                                        placeholder="Amount"
                                    />
                                    {formik.touched.amount &&
                                        formik.errors.amount && (
                                            <div className="invalid-feedback">
                                                {formik.errors.amount}
                                            </div>
                                        )}
                                </div>
                                {/* category field */}
                                <div className="mb-3">
                                    <label
                                        htmlFor="category"
                                        className="form-label"
                                    >
                                        Category
                                    </label>
                                    <select
                                        className={
                                            formik.touched.category &&
                                            formik.errors.category
                                                ? 'form-select is-invalid'
                                                : 'form-select'
                                        }
                                        id="category"
                                        {...formik.getFieldProps('category')}
                                    >
                                        <option value="">
                                            Select Category
                                        </option>
                                        {data?.map((category) => (
                                            <option
                                                key={category?._id}
                                                value={category?.name}
                                            >
                                                {category?.name}
                                            </option>
                                        ))}
                                    </select>
                                    {formik.touched.category &&
                                        formik.errors.category && (
                                            <div className="invalid-feedback">
                                                {formik.errors.category}
                                            </div>
                                        )}
                                </div>
                                {/* date field */}
                                <div className="mb-3">
                                    <label
                                        htmlFor="date"
                                        className="form-label"
                                    >
                                        Name
                                    </label>
                                    <input
                                        type="date"
                                        className={
                                            formik.touched.date &&
                                            formik.errors.date
                                                ? 'form-control is-invalid'
                                                : 'form-control'
                                        }
                                        id="date"
                                        {...formik.getFieldProps('date')}
                                        placeholder=""
                                    />
                                    {formik.touched.date &&
                                        formik.errors.date &&
                                        typeof formik.errors.date ===
                                            'string' && (
                                            <div className="invalid-feedback">
                                                {formik.errors.date}
                                            </div>
                                        )}
                                </div>
                                {/* description field */}
                                <div className="mb-3">
                                    <label
                                        htmlFor="description"
                                        className="form-label"
                                    >
                                        Name
                                    </label>
                                    <textarea
                                        className={
                                            formik.touched.description &&
                                            formik.errors.description
                                                ? 'form-control is-invalid'
                                                : 'form-control'
                                        }
                                        id="description"
                                        {...formik.getFieldProps('description')}
                                        placeholder="Optional"
                                    />
                                    {formik.touched.description &&
                                        formik.errors.description && (
                                            <div className="invalid-feedback">
                                                {formik.errors.description}
                                            </div>
                                        )}
                                </div>
                                <div className="d-grid">
                                    <button
                                        disabled={isPending}
                                        className="btn btn-primary"
                                        type="submit"
                                    >
                                        Add Transaction
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddTransaction;
