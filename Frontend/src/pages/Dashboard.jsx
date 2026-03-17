import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import StatCard from '../components/StatCard';
import ApplicationTable from '../components/ApplicationTable';
import api from '../api/axios';
import { useContext } from 'react';
import { AppContext } from '../context/Wrapper';

const Dashboard = () => {
  const { user } = useContext(AppContext);
  const [retryBtn, setretryBtn] = useState(false);
  const [retryKey, setRetryKey] = useState(0);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [stats, setStats] = useState({
    total: 0,
    saved: 0,
    interviews: 0,
    rejections: 0,
    offers: 0,
  });
  const [recentApplications, setRecentApplications] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsRes, recentRes] = await Promise.all([
          api.get('/dashboard/stats'),
          api.get('/dashboard/recent'),
        ]);

        setStats({
          total: statsRes.data.totalApplications ?? 0,
          saved: statsRes.data.saved ?? 0,
          interviews: statsRes.data.interview ?? 0,
          rejections: statsRes.data.rejected ?? 0,
          offers: statsRes.data.offer ?? 0,
        });

        const mappedRecent = (recentRes.data.recentApplications || []).map((app, idx) => ({
          id: `${app.companyName}-${idx}-${app.createdAt}`,
          company: app.companyName,
          role: app.jobTitle,
          status: app.status,
          date: app.createdAt,
        }));

        setRecentApplications(mappedRecent);
        setErrorMessage('');
        setretryBtn(false);
      } catch (err) {
        
        if (err.response?.status === 404) {
          try {
            const statsRes = await api.get('/dashboard/stats');
            setStats({
              total: statsRes.data.totalApplications ?? 0,
              saved: statsRes.data.saved ?? 0,
              interviews: statsRes.data.interview ?? 0,
              rejections: statsRes.data.rejected ?? 0,
              offers: statsRes.data.offer ?? 0,
            });
            setRecentApplications([]);
          } catch (statsErr) {
            setErrorMessage('Failed to load dashboard data. Please try again.');
            setretryBtn(true);
          }
        } else {
          setErrorMessage('Failed to load dashboard data. Please try again.');
          setretryBtn(true);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
    
  }, [retryKey]);

    
    
    


  const statCards = useMemo(
    () => [
      {
        title: 'Total Applications',
        value: stats.total,
        iconBg: 'bg-indigo-50',
        gradient: 'bg-linear-to-r from-indigo-500 to-indigo-600',
        change: `${stats.saved} saved`,
        changeType: 'up',
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
              d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zm0 0V5a2 2 0 00-2-2H6a2 2 0 00-2 2v2"
            />
          </svg>
        ),
      },
      {
        title: 'Interviews',
        value: stats.interviews,
        iconBg: 'bg-amber-50',
        gradient: 'bg-linear-to-r from-amber-400 to-amber-500',
        change: 'Pipeline progress',
        changeType: 'up',
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        ),
      },
      {
        title: 'Offers',
        value: stats.offers,
        iconBg: 'bg-green-50',
        gradient: 'bg-linear-to-r from-green-400 to-green-500',
        change: 'Great momentum',
        changeType: 'up',
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
              d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
            />
          </svg>
        ),
      },
      {
        title: 'Rejections',
        value: stats.rejections,
        iconBg: 'bg-red-50',
        gradient: 'bg-linear-to-r from-red-400 to-red-500',
        change: 'Keep iterating',
        changeType: 'down',
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        ),
      },
    ],
    [stats]
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-sm text-gray-400">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Welcome back, {user?.fullName?.firstname?.toUpperCase() || 'User'} 👋</h2>
          <p className="text-sm text-gray-500 mt-1">Here's what's happening with your job search.</p>
        </div>
        <Link
          to="/applications/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl shadow-md shadow-indigo-500/20 transition-all duration-150 hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Application
        </Link>
      </div>

      {errorMessage && (
        <div className="flex items-center gap-3">
          <p className="text-sm text-red-600">{errorMessage}</p>
          {retryBtn && (
            <button
              onClick={() => {
                setErrorMessage('');
                setretryBtn(false);
                setLoading(true);
                setRetryKey((k) => k + 1);
              }}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg transition-colors"
            >
              Retry
            </button>
          )}
        </div>
      )}

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {statCards.map((card) => (
          <div key={card.title} className="relative overflow-hidden">
            <StatCard {...card} />
          </div>
        ))}
      </div>

      {/* Recent Applications */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-base font-semibold text-gray-900">Recent Applications</h3>
            <p className="text-xs text-gray-400 mt-0.5">Your 5 most recent job applications</p>
          </div>
          <Link
            to="/applications"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:underline transition-colors"
          >
            View all →
          </Link>
        </div>
        <ApplicationTable applications={recentApplications} />
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Link
          to="/resumes"
          className="group flex items-center gap-4 p-5 bg-white rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 border border-transparent hover:border-indigo-100"
        >
          <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center group-hover:bg-indigo-100 transition-colors shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">Upload a Resume</p>
            <p className="text-xs text-gray-400 mt-0.5">Add and manage your resume files</p>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-300 ml-auto group-hover:text-indigo-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>

        <Link
          to="/ai-analysis"
          className="group flex items-center gap-4 p-5 bg-white rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 border border-transparent hover:border-indigo-100"
        >
          <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center group-hover:bg-purple-100 transition-colors shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">Analyze with AI</p>
            <p className="text-xs text-gray-400 mt-0.5">Get ATS score and resume feedback</p>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-300 ml-auto group-hover:text-purple-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
