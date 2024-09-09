import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/appHooks';

interface Props {
    children: ReactNode;
}
const PublicRoute = ({ children }: Props) => {
    const user = useAppSelector((state) => state?.auth?.user);

    if (user) {
        return <Navigate to="/dashboard" />;
    } else {
        return children;
    }
};

export default PublicRoute;
