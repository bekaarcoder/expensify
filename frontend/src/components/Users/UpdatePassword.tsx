import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { changePasswordAPI } from '../../services/users/userServices';
import toast from 'react-hot-toast';
import { isAxiosError } from 'axios';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../../redux/slice/authSlice';
import { useNavigate } from 'react-router-dom';

interface UpdatePasswordFormValues {
    password: string;
}

const validationSchema = Yup.object({
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters long')
        .required('Password is required'),
});

const UpdatePassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { mutateAsync, isPending, error } = useMutation({
        mutationFn: changePasswordAPI,
        mutationKey: ['change-password'],
    });

    const formik = useFormik<UpdatePasswordFormValues>({
        initialValues: {
            password: '',
        },
        validationSchema,
        onSubmit: (values) => {
            mutateAsync(values)
                .then(() => {
                    toast.success(
                        'Password changed successful. Please login again'
                    );
                    dispatch(logoutAction());
                    localStorage.removeItem('userInfo');
                    navigate('/login');
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
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Update Password</h5>
                <p className="card-subtitle">
                    Create a new password for your profile
                </p>
                <form className="my-3" onSubmit={formik.handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            className={
                                formik.touched.password &&
                                formik.errors.password
                                    ? 'form-control is-invalid'
                                    : 'form-control'
                            }
                            id="password"
                            {...formik.getFieldProps('password')}
                            placeholder="Password"
                        />
                        {formik.touched.password && formik.errors.password && (
                            <div className="invalid-feedback">
                                {formik.errors.password}
                            </div>
                        )}
                    </div>
                    <div className="d-grid">
                        <button
                            className="btn btn-primary"
                            disabled={isPending}
                        >
                            Change Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdatePassword;
