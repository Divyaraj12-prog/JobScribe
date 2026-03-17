import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';

const STATUS_OPTIONS = ['Saved', 'Applied', 'Interview', 'Offer', 'Rejected'];
const PRIORITY_OPTIONS = ['High', 'Medium', 'Low'];

const NewApplication = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [form, setForm] = useState({
    companyName: '',
    jobTitle: '',
    jobLink: '',
    status: 'Saved',
    priority: 'Medium',
    notes: '',
    interviewDate: '',
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    const payload = {
      companyName: form.companyName.trim(),
      jobTitle: form.jobTitle.trim(),
      jobLink: form.jobLink.trim(),
      status: form.status,
      priority: form.priority,
      notes: form.notes.trim(),
      interviewDate: form.interviewDate || undefined,
    };

    try{
      const response = await api.post('/applications', payload);
      
      navigate('/applications');
    }catch(err){
      
      setErrorMessage(err.response?.data?.message || 'An error occurred while saving the application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          to="/applications"
          className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">New Application</h2>
          <p className="text-sm text-gray-500 mt-0.5">Log a new job you've applied to or want to track</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
          {/* Job info */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 text-xs font-bold flex items-center justify-center">1</span>
              Job Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Company Name <span className="text-red-400">*</span></label>
                <input
                  type="text"
                  name="companyName"
                  value={form.companyName}
                  onChange={handleChange}
                  placeholder="e.g. Google"
                  required
                  className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 bg-gray-50 text-gray-800 placeholder-gray-400 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Job Title <span className="text-red-400">*</span></label>
                <input
                  type="text"
                  name="jobTitle"
                  value={form.jobTitle}
                  onChange={handleChange}
                  placeholder="e.g. Software Engineer"
                  required
                  className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 bg-gray-50 text-gray-800 placeholder-gray-400 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Job Link <span className="text-red-400">*</span></label>
                <input
                  type="url"
                  name="jobLink"
                  value={form.jobLink}
                  onChange={handleChange}
                  placeholder="https://careers.company.com/job/..."
                  required
                  className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 bg-gray-50 text-gray-800 placeholder-gray-400 transition-all"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100" />

          {/* Status & Priority */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 text-xs font-bold flex items-center justify-center">2</span>
              Status & Priority
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 bg-gray-50 text-gray-800 transition-all appearance-none"
                >
                  {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Priority</label>
                <select
                  name="priority"
                  value={form.priority}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 bg-gray-50 text-gray-800 transition-all appearance-none"
                >
                  {PRIORITY_OPTIONS.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100" />

          {/* Extra details */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 text-xs font-bold flex items-center justify-center">3</span>
              Additional Details
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Interview Date <span className="text-xs text-gray-400">(optional)</span></label>
                <input
                  type="datetime-local"
                  name="interviewDate"
                  value={form.interviewDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 bg-gray-50 text-gray-800 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Notes <span className="text-xs text-gray-400">(optional)</span></label>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Recruiter contact info, role details, salary range..."
                  className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 bg-gray-50 text-gray-800 placeholder-gray-400 resize-none transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {errorMessage && (
          <p className="mt-4 text-sm text-red-600">{errorMessage}</p>
        )}

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 mt-4">
          <Link
            to="/applications"
            className="px-5 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl shadow-md shadow-indigo-500/20 hover:-translate-y-0.5 transition-all duration-150"
          >
            {isSubmitting ? 'Saving...' : 'Save Application'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewApplication;