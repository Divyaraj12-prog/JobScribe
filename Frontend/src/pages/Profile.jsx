import { useEffect, useState } from 'react';
import api from '../api/axios';
import { useContext } from 'react';
import { AppContext } from '../context/Wrapper';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, setUser } = useContext(AppContext);
  const navigate = useNavigate();

  const [profileForm, setProfileForm] = useState({
    firstname: user?.fullName?.firstname ?? '',
    lastname: user?.fullName?.lastname ?? '',
    email: user?.email ?? '',
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [profileSaved, setProfileSaved] = useState(false);
  const [passwordSaved, setPasswordSaved] = useState(false);
  const [passwordErrors, setpasswordErrors] = useState('');
  const [dashboardStats, setdashboardStats] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get('/dashboard/stats');
        setdashboardStats({
          total: response.data.totalApplications ?? 0,
          saved: response.data.saved ?? 0,
          interviews: response.data.interview ?? 0,
          rejections: response.data.rejected ?? 0,
          offers: response.data.offer ?? 0,
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setdashboardStats({});
      }
    };
    fetchDashboardData();
  }, []);

  const handleProfileChange = (e) => setProfileForm({ ...profileForm, [e.target.name]: e.target.value });
  const handlePasswordChange = (e) => setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });

  const handleProfileSave = async (e) => {
    e.preventDefault();
    try {
      const response = await api.patch('/auth/me', {
        fullname: {
          firstname: profileForm.firstname,
          lastname: profileForm.lastname,
        },
        email: profileForm.email,
      });
      setUser(response.data.user);
      setProfileSaved(true);
      console.log('Profile updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating profile:', error);
      setProfileSaved(false);
      if (error.response && error.response.status === 401) {
        setUser(null);
        navigate('/login');
      }
    }


  };

  const handlePasswordSave = async (e) => {
    e.preventDefault();
    try {
      if (passwordForm.newPassword !== passwordForm.confirmPassword) {
        setpasswordErrors('New password and confirm password do not match');
        setPasswordSaved(false);
        return;
      }
      const response = await api.post('/auth/change-password', {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      console.log('Password updated successfully:', response.data);
      setpasswordErrors('');
      setPasswordSaved(true);
    } catch (error) {
      console.error('Error updating password:', error);
      setpasswordErrors(error.response?.data?.message || 'An error occurred while updating the password. Please try again.');
      setPasswordSaved(false);
      if (error.response && error.response.status === 401) {
        setUser(null);
        navigate('/login');
      }

    }
  };

  const handleDeleteChange = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        const response = await api.delete('/auth/delete');
        console.log('Account deleted successfully:', response.data);
        setUser(null);
        navigate('/register');
      } catch (error) {
        console.error('Error deleting account:', error);
        if (error.response && error.response.status === 401) {
          setUser(null);
          navigate('/login');
        }
      }
    }
  };


  const initials = `${user?.fullName?.firstname?.charAt(0) ?? ''}${user?.fullName?.lastname?.charAt(0) ?? ''}`;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Profile</h2>
        <p className="text-sm text-gray-500 mt-1">Manage your account information and security settings</p>
      </div>

      {/* Avatar card */}
      <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-5">
        <div className="relative">
          <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-indigo-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-indigo-500/25">
            {initials}
          </div>
          <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-500 hover:text-indigo-600 hover:border-indigo-200 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
        </div>
        <div>
          <p className="text-lg font-bold text-gray-900">{profileForm.firstname} {profileForm.lastname}</p>
          <p className="text-sm text-gray-500">{profileForm.email}</p>
          <span className="inline-flex items-center mt-1.5 px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-600 ring-1 ring-indigo-200">
            Free plan
          </span>
        </div>

        {/* Quick stats */}
        <div className="ml-auto hidden sm:flex items-center gap-6 text-center">
          {dashboardStats && Object.entries(dashboardStats).map(([label, value]) => (
            <div key={label}>
              <p className="text-xl font-bold text-gray-800">{value}</p>
              <p className="text-xs text-gray-400">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Profile info form */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-5 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          Personal Information
        </h3>
        <form onSubmit={handleProfileSave} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">First name</label>
              <input
                type="text"
                name="firstname"
                value={profileForm.firstname}
                onChange={handleProfileChange}
                required
                className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 bg-gray-50 text-gray-800 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Last name</label>
              <input
                type="text"
                name="lastname"
                value={profileForm.lastname}
                onChange={handleProfileChange}
                className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 bg-gray-50 text-gray-800 transition-all"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
            <input
              type="email"
              name="email"
              value={profileForm.email}
              onChange={handleProfileChange}
              required
              className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 bg-gray-50 text-gray-800 transition-all"
            />
          </div>
          <div className="flex items-center justify-between pt-1">
            {profileSaved && (
              <span className="flex items-center gap-1.5 text-xs text-green-600 font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Profile saved successfully
              </span>
            )}
            <button
              type="submit"
              className="ml-auto px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl shadow-md shadow-indigo-500/20 hover:-translate-y-0.5 transition-all duration-150"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>

      {/* Password form */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-5 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          Change Password
        </h3>
        <form onSubmit={handlePasswordSave} className="space-y-4">
          {['currentPassword', 'newPassword', 'confirmPassword'].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 mb-1.5 capitalize">
                {field === 'currentPassword' ? 'Current Password' : field === 'newPassword' ? 'New Password' : 'Confirm New Password'}
              </label>
              <input
                type="password"
                name={field}
                value={passwordForm[field]}
                onChange={handlePasswordChange}
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 bg-gray-50 text-gray-800 placeholder-gray-400 transition-all"
              />
            </div>
          ))}
          <div className="flex items-center justify-between pt-1">
            {passwordSaved && (
              <span className="flex items-center gap-1.5 text-xs text-green-600 font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Password updated successfully
              </span>
            )}
            <button
              type="submit"
              className="ml-auto px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl shadow-md shadow-indigo-500/20 hover:-translate-y-0.5 transition-all duration-150"
            >
              Update Password
            </button>
          </div>
          {passwordErrors && <p className="text-sm text-red-600 mt-2">{passwordErrors}</p>}
        </form>
      </div>

      {/* Danger zone */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-red-100">
        <h3 className="text-sm font-semibold text-red-600 mb-1 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          Danger Zone
        </h3>
        <p className="text-xs text-gray-400 mb-4">Permanently delete your account and all associated data. This cannot be undone.</p>
        <button onClick={handleDeleteChange} className="px-4 py-2 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl transition-colors">
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Profile;