import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../api/axios';
import { useContext } from 'react';
import { AppContext } from '../context/Wrapper';
import { useNavigate } from 'react-router-dom';

const pageTitles = {
  '/dashboard': 'Dashboard',
  '/applications': 'Applications',
  '/applications/new': 'New Application',
  '/resumes': 'Resumes',
  '/ai-analysis': 'AI Resume Analysis',
  '/profile': 'Profile',
};

const Navbar = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const { user, setUser} = useContext(AppContext);
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const pageTitle = pageTitles[location.pathname] || 'JobScribe';

  const handleLogout = (e) => {
    e.preventDefault();
    setUser(null);
    api.post('/auth/logout')
      .then(() => {
        navigate('/login');
      })
      .catch((error) => {
        
        navigate('/login');
      });
  };

  return (
    <header className="shrink-0 h-16 bg-white border-b border-gray-200 flex items-center px-4 lg:px-6 gap-4 z-10">
      
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <h1 className="text-lg font-semibold text-gray-800 hidden sm:block">{pageTitle}</h1>

      <div className="flex items-center gap-2 ml-auto">
    
        <button className="relative p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full ring-2 ring-white" />
        </button>

        
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-linear-to-br from-indigo-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow">
              {user?.fullName?.firstname && user?.fullName?.lastname
                ? `${user.fullName.firstname[0].toUpperCase()}${user.fullName.lastname[0].toUpperCase()}`
                : 'JD'}
            </div>
            <span className="hidden md:block text-sm font-medium text-gray-700">{user?.fullName?.lastname?.charAt(0)?.toUpperCase() + '.' + user?.fullName?.firstname?.charAt(0)?.toUpperCase() + user?.fullName?.firstname.slice(1)}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400 hidden md:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {dropdownOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-20">
                <div className="px-4 py-2.5 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-800">{user?.fullName?.firstname || 'John Doe'}</p>
                  <p className="text-xs text-gray-500 truncate">{user?.email || 'john@example.com'}</p>
                </div>
                <a href="/profile" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Profile
                </a>
                <a href="/login" onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
