import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/appHooks';

interface Props {
    children: ReactNode;
}
const AuthRoute = ({ children }: Props) => {
    const user = useAppSelector((state) => state?.auth?.user);

    if (user) {
        return children;
    } else {
        return <Navigate to="/" />;
    }
};

export default AuthRoute;
