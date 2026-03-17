import { useContext, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import api from '../api/axios';
import { AppContext } from '../context/Wrapper';

const ProtectedRoute = ({ children }) => {
	const { isAuthenticated, setUser } = useContext(AppContext);
	const [checkingAuth, setCheckingAuth] = useState(!isAuthenticated);
	const location = useLocation();

	useEffect(() => {
		let isMounted = true;

		if (isAuthenticated) {
			setCheckingAuth(false);
			return () => {
				isMounted = false;
			};
		}

		const validateSession = async () => {
			try {
				const response = await api.get('/auth/me', { withCredentials: true });
				const authUser = response?.data?.user;

				if (authUser && isMounted) {
					setUser({
						id: authUser.userId,
						fullName: authUser.fullName,
						email: authUser.email,
						role: authUser.role,
					});
				}
			} catch (error) {
				
			} finally {
				if (isMounted) {
					setCheckingAuth(false);
				}
			}
		};

		validateSession();

		return () => {
			isMounted = false;
		};
	}, [isAuthenticated, setUser]);

	if (checkingAuth) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-slate-50">
				<div className="text-sm font-medium text-slate-500">Checking session...</div>
			</div>
		);
	}

	if (!isAuthenticated) {
		return <Navigate to="/login" replace state={{ from: location.pathname }} />;
	}

	return children;
};

export default ProtectedRoute;
