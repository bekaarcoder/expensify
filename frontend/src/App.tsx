import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import HomePage from './components/Home/HomePage';
import PrivateNavbar from './components/Navbar/PrivateNavbar';
import PublicNavbar from './components/Navbar/PublicNavbar';
import { useAppSelector } from './hooks/appHooks';

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
            </Routes>
        </BrowserRouter>
    );
}

export default App;
