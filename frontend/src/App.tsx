import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './components/Home/HomePage';
import PublicNavbar from './components/Navbar/PublicNavbar';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import { Toaster } from 'react-hot-toast';

function App() {
    return (
        <BrowserRouter>
            <PublicNavbar />
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
