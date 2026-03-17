import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

const STATUS_OPTIONS = ['All', 'Saved', 'Applied', 'Interview', 'Offer', 'Rejected'];
const PRIORITY_OPTIONS = ['All', 'High', 'Medium', 'Low'];
const EDIT_STATUS_OPTIONS = ['Saved', 'Applied', 'Interview', 'Offer', 'Rejected'];
const EDIT_PRIORITY_OPTIONS = ['High', 'Medium', 'Low'];

const priorityBadge = {
  High:   'bg-red-50 text-red-600 ring-1 ring-red-200',
  Medium: 'bg-amber-50 text-amber-600 ring-1 ring-amber-200',
  Low:    'bg-gray-50 text-gray-500 ring-1 ring-gray-200',
};

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');

 
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await api.get('/applications');
        setApplications(res.data.applications);
      } catch (err) {
        
        if (err.response?.status === 404) {
          setApplications([]);
        } else {
          setErrorMessage('Failed to load applications. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  
  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this application?');
    if (!confirmed) return;

    try {
      await api.delete(`/applications/${id}`);
      setApplications((prev) => prev.filter((a) => a._id !== id));
    } catch (err) {
      setErrorMessage('Failed to delete application. Please try again.');
    }
  };

  const handleEdit = async (application) => {
    setErrorMessage('');

    const companyName = window.prompt('Company name', application.companyName);
    if (companyName === null) return;

    const jobTitle = window.prompt('Job title', application.jobTitle);
    if (jobTitle === null) return;

    const status = window.prompt(
      `Status (${EDIT_STATUS_OPTIONS.join(', ')})`,
      application.status
    );
    if (status === null) return;

    const priority = window.prompt(
      `Priority (${EDIT_PRIORITY_OPTIONS.join(', ')})`,
      application.priority
    );
    if (priority === null) return;

    if (!EDIT_STATUS_OPTIONS.includes(status)) {
      setErrorMessage('Invalid status selected.');
      return;
    }

    if (!EDIT_PRIORITY_OPTIONS.includes(priority)) {
      setErrorMessage('Invalid priority selected.');
      return;
    }

    try {
      const response = await api.patch(`/applications/${application._id}`, {
        companyName: companyName.trim(),
        jobTitle: jobTitle.trim(),
        status,
        priority,
      });

      setApplications((prev) =>
        prev.map((item) =>
          item._id === application._id ? response.data.application : item
        )
      );
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Failed to update application. Please try again.');
    }
  };

  const filtered = applications.filter((a) => {
    const matchSearch =
      a.companyName.toLowerCase().includes(search.toLowerCase()) ||
      a.jobTitle.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || a.status === statusFilter;
    const matchPriority = priorityFilter === 'All' || a.priority === priorityFilter;
    return matchSearch && matchStatus && matchPriority;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-sm text-gray-400">Loading applications...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Applications</h2>
          <p className="text-sm text-gray-500 mt-1">{filtered.length} of {applications.length} applications</p>
        </div>
        <Link
          to="/applications/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl shadow-md shadow-indigo-500/20 hover:-translate-y-0.5 transition-all duration-150"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Application
        </Link>
      </div>

      {errorMessage && (
        <p className="text-sm text-red-600">{errorMessage}</p>
      )}

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-md p-4 flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-48">
          <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search company or role…"
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all"
          />
        </div>

        {/* Status filter */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-medium text-gray-400 mr-1">Status:</span>
          {STATUS_OPTIONS.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-100 ${
                statusFilter === s
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Priority filter */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-medium text-gray-400 mr-1">Priority:</span>
          {PRIORITY_OPTIONS.map((p) => (
            <button
              key={p}
              onClick={() => setPriorityFilter(p)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-100 ${
                priorityFilter === p
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="overflow-x-auto -mx-6 px-6">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 mx-auto mb-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p className="text-sm font-medium">No applications match your filters</p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  {['Company', 'Role', 'Status', 'Priority', 'Date Applied', 'Actions'].map((h) => (
                    <th key={h} className="text-left pb-3 pr-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((app) => (
                  <tr key={app._id} className="hover:bg-gray-50/70 transition-colors group">
                    <td className="py-3.5 pr-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-linear-to-br from-slate-100 to-slate-200 flex items-center justify-center text-xs font-bold text-slate-600 shrink-0 group-hover:from-indigo-50 group-hover:to-indigo-100 group-hover:text-indigo-600 transition-colors">
                          {app.companyName[0]}
                        </div>
                        <span className="font-medium text-gray-800">{app.companyName}</span>
                      </div>
                    </td>
                    <td className="py-3.5 pr-4 text-gray-600">{app.jobTitle}</td>
                    <td className="py-3.5 pr-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        { Applied: 'bg-blue-50 text-blue-700 ring-1 ring-blue-200', Interview: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200', Offer: 'bg-green-50 text-green-700 ring-1 ring-green-200', Rejected: 'bg-red-50 text-red-600 ring-1 ring-red-200', Saved: 'bg-slate-50 text-slate-600 ring-1 ring-slate-200' }[app.status]
                      }`}>{app.status}</span>
                    </td>
                    <td className="py-3.5 pr-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${priorityBadge[app.priority]}`}>
                        {app.priority}
                      </span>
                    </td>
                    <td className="py-3.5 pr-4 text-gray-500">
                      {new Date(app.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="py-3.5">
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleEdit(app)} className="p-1.5 rounded-lg hover:bg-indigo-50 text-gray-400 hover:text-indigo-600 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                        </button>
                        <button onClick={() => handleDelete(app._id)} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Applications;