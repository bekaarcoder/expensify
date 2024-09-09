import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { registerAPI } from '../../services/users/userServices';
import toast from 'react-hot-toast';
import { isAxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

interface RegisterFormValues {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters long')
        .required('Password is required'),
    confirmPassword: Yup.mixed()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm Password is required'),
});

const Register = () => {
    const navigate = useNavigate();

    const { mutateAsync, isPending, error, isSuccess } = useMutation({
        mutationFn: registerAPI,
        mutationKey: ['register'],
    });

    const formik = useFormik<RegisterFormValues>({
        initialValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            console.log(values);
            mutateAsync(values)
                .then((data) => {
                    console.log(data);
                    toast.success('Registration Successful');
                    resetForm();
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

    useEffect(() => {
        if (isSuccess) {
            navigate('/login');
        }
    }, [isSuccess, navigate]);
    return (
        <div className="container">
            <div className="row my-5 justify-content-center">
                <div className="col-md-5">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="text-center">Sign Up</h3>
                            <p className="text-center my-2">
                                Your financial journey starts here. Let’s get
                                started!
                            </p>
                            <form
                                className="my-3"
                                onSubmit={formik.handleSubmit}
                            >
                                <div className="mb-3">
                                    <label
                                        htmlFor="username"
                                        className="form-label"
                                    >
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        className={
                                            formik.touched.username &&
                                            formik.errors.username
                                                ? 'form-control is-invalid'
                                                : 'form-control'
                                        }
                                        id="username"
                                        {...formik.getFieldProps('username')}
                                        placeholder="Username"
                                    />
                                    {formik.touched.username &&
                                        formik.errors.username && (
                                            <div className="invalid-feedback">
                                                {formik.errors.username}
                                            </div>
                                        )}
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="email"
                                        className="form-label"
                                    >
                                        Email Address
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
                                        placeholder="example@email.com"
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
                                <div className="mb-3">
                                    <label
                                        htmlFor="confirmPassword"
                                        className="form-label"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        className={
                                            formik.touched.confirmPassword &&
                                            formik.errors.confirmPassword
                                                ? 'form-control is-invalid'
                                                : 'form-control'
                                        }
                                        id="confirmPassword"
                                        {...formik.getFieldProps(
                                            'confirmPassword'
                                        )}
                                        placeholder="Confirm Password"
                                    />
                                    {formik.touched.confirmPassword &&
                                        formik.errors.confirmPassword && (
                                            <div className="invalid-feedback">
                                                {formik.errors.confirmPassword}
                                            </div>
                                        )}
                                </div>
                                <div className="d-grid">
                                    <button
                                        className="btn btn-primary"
                                        disabled={isPending}
                                    >
                                        Register
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

export default Register;
