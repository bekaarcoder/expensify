import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import HomePage from './components/Home/HomePage';
import PrivateNavbar from './components/Navbar/PrivateNavbar';
import PublicNavbar from './components/Navbar/PublicNavbar';
import { useAppSelector } from './hooks/appHooks';
import AddCategory from './components/Category/AddCategory';
import CategoryList from './components/Category/CategoryList';
import './App.css';
import UpdateCategory from './components/Category/UpdateCategory';
import AddTransaction from './components/Transaction/AddTransaction';
import Dashboard from './components/Home/Dashboard';
import Profile from './components/Users/Profile';
import AuthRoute from './components/Auth/AuthRoute';
import PublicRoute from './components/Auth/PublicRoute';

function App() {
    const user = useAppSelector((state) => state?.auth?.user);

    return (
        <BrowserRouter>
            {user ? <PrivateNavbar /> : <PublicNavbar />}
            <Toaster />
            <Routes>
                <Route
                    path="/"
                    element={
                        <PublicRoute>
                            <HomePage />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <PublicRoute>
                            <Register />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/add-category"
                    element={
                        <AuthRoute>
                            <AddCategory />
                        </AuthRoute>
                    }
                />
                <Route
                    path="/categories"
                    element={
                        <AuthRoute>
                            <CategoryList />
                        </AuthRoute>
                    }
                />
                <Route
                    path="/update-category/:id"
                    element={
                        <AuthRoute>
                            <UpdateCategory />
                        </AuthRoute>
                    }
                />
                <Route
                    path="/add-transaction"
                    element={
                        <AuthRoute>
                            <AddTransaction />
                        </AuthRoute>
                    }
                />
                <Route
                    path="/dashboard"
                    element={
                        <AuthRoute>
                            <Dashboard />
                        </AuthRoute>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <AuthRoute>
                            <Profile />
                        </AuthRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
