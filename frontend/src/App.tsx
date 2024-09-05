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

function App() {
    const user = useAppSelector((state) => state?.auth?.user);

    return (
        <BrowserRouter>
            {user ? <PrivateNavbar /> : <PublicNavbar />}
            <Toaster />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/add-category" element={<AddCategory />} />
                <Route path="/categories" element={<CategoryList />} />
                <Route
                    path="/update-category/:id"
                    element={<UpdateCategory />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
