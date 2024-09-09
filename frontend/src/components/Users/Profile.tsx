import { useQuery } from '@tanstack/react-query';
import { getUserAPI } from '../../services/users/userServices';
import UpdatePassword from './UpdatePassword';
import UpdateProfile from './UpdateProfile';

const Profile = () => {
    const { data, refetch } = useQuery({
        queryFn: getUserAPI,
        queryKey: ['get-profile'],
    });

    const handleRefetch = () => {
        refetch();
    };

    console.log(data);

    return (
        <div className="container">
            <div className="row my-5">
                <div className="col-md-12 mb-4">
                    <h3>Welcome {data?.username}</h3>
                    <span className="text-muted">{data?.email}</span>
                </div>
                <div className="col-md-6 my-2">
                    <UpdateProfile handleRefetch={handleRefetch} />
                </div>
                <div className="col-md-6 my-2">
                    <UpdatePassword />
                </div>
            </div>
        </div>
    );
};

export default Profile;
