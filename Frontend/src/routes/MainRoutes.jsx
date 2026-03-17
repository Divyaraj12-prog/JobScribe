import { Route, Routes } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import Applications from '../pages/Applications';
import NewApplication from '../pages/NewApplication';
import Resumes from '../pages/Resumes';
import AIAnalysis from '../pages/AIAnalysis';
import Profile from '../pages/Profile';
import ProtectedRoute from './ProtectedRoute';

const MainRoutes = () => {
    return (
        <Routes>
            {/* Public routes — no sidebar/navbar */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />

            {/* Authenticated routes — rendered inside the Layout */}
            <Route
                element={(
                    <ProtectedRoute>
                        <Layout />
                    </ProtectedRoute>
                )}
            >
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/applications" element={<Applications />} />
                <Route path="/applications/new" element={<NewApplication />} />
                <Route path="/resumes" element={<Resumes />} />
                <Route path="/ai-analysis" element={<AIAnalysis />} />
                <Route path="/profile" element={<Profile />} />
            </Route>
        </Routes>
    );
};

export default MainRoutes;