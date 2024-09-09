import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutAction } from '../../redux/slice/authSlice';
import { BsPersonCircle } from 'react-icons/bs';

const PrivateNavbar = () => {
    const dispatch = useDispatch();

    const onLogout = () => {
        dispatch(logoutAction());
        localStorage.removeItem('userInfo');
    };

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    Expensify
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/dashboard" className="nav-link">
                                Dashboard
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/add-transaction" className="nav-link">
                                Add Transaction
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/add-category" className="nav-link">
                                Add Category
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/categories" className="nav-link">
                                Categories
                            </Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav mb-2 mb-lg-0 align-items-center">
                        <li className="nav-item">
                            <Link to="/profile" className="nav-link">
                                <BsPersonCircle className="fs-3" />
                            </Link>
                        </li>
                        <li className="nav-item">
                            <button
                                className="btn btn-sm btn-danger"
                                onClick={onLogout}
                            >
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default PrivateNavbar;
