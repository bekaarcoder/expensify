import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { loginAPI } from '../../services/users/userServices';
import { isAxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { loginAction } from '../../redux/slice/authSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

interface LoginFormValues {
    email: string;
    password: string;
}

// Validations
const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
});

const Login = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    // Mutation
    const { mutateAsync, isPending, error, isSuccess } = useMutation({
        mutationFn: loginAPI,
        mutationKey: ['login'],
    });

    const formik = useFormik<LoginFormValues>({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values);
            // http request
            mutateAsync(values)
                .then((data) => {
                    toast.success('Logged in successfully!');
                    dispatch(loginAction(data));
                    localStorage.setItem('userInfo', JSON.stringify(data));
                })
                .catch((e) => {
                    console.log('Error', e);
                    if (isAxiosError(error)) {
                        toast.error(error.response?.data.error);
                    } else {
                        toast.error('Invalid credentials!');
                    }
                });
        },
    });

    useEffect(() => {
        if (isSuccess) {
            navigate('/');
        }
    }, [isSuccess, navigate]);

    return (
        <div className="container">
            <div className="row my-5 justify-content-center">
                <div className="col-md-5">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="text-center">Login</h3>
                            <p className="text-center my-2">
                                Login to access you account
                            </p>
                            <form
                                className="my-3"
                                onSubmit={formik.handleSubmit}
                            >
                                <div className="mb-3">
                                    <label
                                        htmlFor="email"
                                        className="form-label"
                                    >
                                        Email address
                                    </label>
                                    <input
                                        type="email"
                                        className={
                                            formik.touched.email &&
                                            formik.errors.email
                                                ? 'form-control is-invalid'
                                                : 'form-control'
                                        }
                                        id="email"
                                        {...formik.getFieldProps('email')}
                                        placeholder="name@example.com"
                                    />
                                    {formik.touched.email &&
                                        formik.errors.email && (
                                            <div className="invalid-feedback">
                                                {formik.errors.email}
                                            </div>
                                        )}
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="password"
                                        className="form-label"
                                    >
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
                                    {formik.touched.password &&
                                        formik.errors.password && (
                                            <div className="invalid-feedback">
                                                {formik.errors.password}
                                            </div>
                                        )}
                                </div>
                                <div className="d-grid">
                                    <button
                                        disabled={isPending}
                                        className="btn btn-primary"
                                    >
                                        Login
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

export default Login;
