import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { updateProfileAPI } from '../../services/users/userServices';

interface Props {
    handleRefetch: () => void;
}

interface UpdateProfileFormValues {
    username: string;
}

const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
});

const UpdateProfile = ({ handleRefetch }: Props) => {
    const { mutateAsync, isPending, error } = useMutation({
        mutationFn: updateProfileAPI,
        mutationKey: ['update-profile'],
    });

    const formik = useFormik<UpdateProfileFormValues>({
        initialValues: {
            username: '',
        },
        validationSchema,
        onSubmit: (values, { resetForm }) => {
            mutateAsync(values)
                .then(() => {
                    toast.success('Profile updated successful');
                    handleRefetch();
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

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Update Profile</h5>
                <p className="card-subtitle">Update your profile details</p>
                <form className="my-3" onSubmit={formik.handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">
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
                        {formik.touched.username && formik.errors.username && (
                            <div className="invalid-feedback">
                                {formik.errors.username}
                            </div>
                        )}
                    </div>
                    <div className="d-grid">
                        <button
                            className="btn btn-primary"
                            disabled={isPending}
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfile;
