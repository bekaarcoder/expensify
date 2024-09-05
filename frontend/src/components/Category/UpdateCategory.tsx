import { useMutation, useQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import {
    getCategoryAPI,
    updateCategoryAPI,
} from '../../services/category/categoryService';

interface CategoryFormValues {
    type: string;
    name: string;
}

const validationSchema = Yup.object({
    name: Yup.string().required('Category name is required'),
    type: Yup.string()
        .oneOf(['income', 'expense'], 'Invalid category type')
        .required('Category type is required'),
});

const UpdateCategory = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    const { mutateAsync, isPending, error } = useMutation({
        mutationFn: updateCategoryAPI,
        mutationKey: ['update-category'],
    });

    const { data } = useQuery({
        queryFn: () => getCategoryAPI(id!),
        queryKey: ['get-category'],
    });

    const formik = useFormik<CategoryFormValues>({
        enableReinitialize: true,
        initialValues: {
            type: data?.type || '',
            name: data?.name || '',
        },
        validationSchema,
        onSubmit: (values) => {
            if (id) {
                const formData = { ...values, _id: id };
                mutateAsync(formData)
                    .then((data) => {
                        console.log(data);
                        navigate('/categories');
                        toast.success('Category updated successfully');
                    })
                    .catch((e) => {
                        console.log('Error', e);
                        if (isAxiosError(error)) {
                            toast.error(error.response?.data.error);
                        } else {
                            toast.error(e.response?.data.error);
                        }
                    });
            }
        },
    });

    return (
        <div className="container">
            <div className="row my-5 justify-content-center">
                <div className="col-md-5">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="text-center">Update Category</h3>
                            <p className="text-center my-2">
                                Update category for your transactions
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
                                        Update Category
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

export default UpdateCategory;
