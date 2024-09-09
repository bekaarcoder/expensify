import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { addCategoryAPI } from '../../services/category/categoryService';
import toast from 'react-hot-toast';
import { isAxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

interface CategoryFormValues {
    type: 'income' | 'expense' | '';
    name: string;
}

const initialValues: CategoryFormValues = {
    type: '',
    name: '',
};

const validationSchema = Yup.object({
    name: Yup.string().required('Category name is required'),
    type: Yup.string()
        .oneOf(['income', 'expense'], 'Invalid category type')
        .required('Category type is required'),
});

const AddCategory = () => {
    const navigate = useNavigate();

    const { mutateAsync, isPending, error } = useMutation({
        mutationFn: addCategoryAPI,
        mutationKey: ['add-category'],
    });

    const formik = useFormik<CategoryFormValues>({
        initialValues,
        validationSchema,
        onSubmit: (values, { resetForm }) => {
            mutateAsync(values)
                .then((data) => {
                    console.log(data);
                    resetForm();
                    navigate('/categories');
                    toast.success('Category added successfully');
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
                            <h3 className="text-center">Add New Category</h3>
                            <p className="text-center my-2">
                                Create a new category for your transactions
                            </p>
                            <form
                                className="my-3"
                                onSubmit={formik.handleSubmit}
                            >
                                <div className="mb-3">
                                    <label
                                        htmlFor="type"
                                        className="form-label"
                                    >
                                        Type
                                    </label>
                                    <select
                                        className={
                                            formik.touched.name &&
                                            formik.errors.name
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
                                <div className="mb-3">
                                    <label
                                        htmlFor="name"
                                        className="form-label"
                                    >
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        className={
                                            formik.touched.name &&
                                            formik.errors.name
                                                ? 'form-control is-invalid'
                                                : 'form-control'
                                        }
                                        id="name"
                                        {...formik.getFieldProps('name')}
                                        placeholder="e.g. food, shopping, salary, etc."
                                    />
                                    {formik.touched.name &&
                                        formik.errors.name && (
                                            <div className="invalid-feedback">
                                                {formik.errors.name}
                                            </div>
                                        )}
                                </div>
                                <div className="d-grid">
                                    <button
                                        disabled={isPending}
                                        className="btn btn-primary"
                                        type="submit"
                                    >
                                        Add Category
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

export default AddCategory;
