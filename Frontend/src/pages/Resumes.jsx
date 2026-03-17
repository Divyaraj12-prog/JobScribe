import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

const ScoreBadge = ({ label, value, color }) => (
  <div className="text-center">
    <div className={`text-xl font-bold ${color}`}>{value !== null ? `${value}` : '—'}</div>
    <div className="text-xs text-gray-400 mt-0.5">{label}</div>
  </div>
);

const Resumes = () => {
  const [dragOver, setDragOver] = useState(false);
  const [resumes, setResumes] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [resumeTitle, setResumeTitle] = useState('');
  const [uploading, setUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const validatePdf = (file) => {
    if (!file) return false;
    if (file.type !== 'application/pdf') {
      setErrorMessage('Only PDF files are allowed.');
      return false;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage('File size must be 5 MB or less.');
      return false;
    }
    return true;
  };

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await api.get('/resumes', { withCredentials: true });
        setResumes(response.data.resumes || []);
      } catch (error) {
        if (error.response?.status === 404) {
          setResumes([]);
        } else {
          
          setErrorMessage('Failed to load resumes. Please try again.');
        }
      }
    };

    fetchResumes();
  }, []);

  const handleFileSelect = (file) => {
    setSuccessMessage('');
    setErrorMessage('');

    if (!validatePdf(file)) return;

    setSelectedFile(file);
    if (!resumeTitle) {
      const baseName = file.name.replace(/\.pdf$/i, '');
      setResumeTitle(baseName);
    }
  };

  const handleUpload = async () => {
    setErrorMessage('');
    setSuccessMessage('');

    if (!selectedFile) {
      setErrorMessage('Please choose a PDF file first.');
      return;
    }

    if (!resumeTitle.trim()) {
      setErrorMessage('Please add a resume title.');
      return;
    }

    const formData = new FormData();
    formData.append('resume', selectedFile);
    formData.append('title', resumeTitle.trim());

    try {
      setUploading(true);
      const response = await api.post('/resumes/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      setResumes((prev) => [response.data.resume, ...prev]);
      setSelectedFile(null);
      setResumeTitle('');
      setSuccessMessage('Resume uploaded successfully.');
    } catch (error) {
     
      setErrorMessage(error.response?.data?.message || 'Failed to upload resume. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const getResumeUrl = (resume) => {
    const rawPath = resume?.fileUrl || '';
    if (!rawPath) return '';
    if (/^https?:\/\//i.test(rawPath)) return rawPath;

    const normalized = rawPath.replace(/\\/g, '/').replace(/^\/+/, '');
    return `http://localhost:3000/${normalized}`;
  };

  const handleDownload = (resume) => {
    const url = getResumeUrl(resume);
    if (!url) {
      setErrorMessage('Resume file URL is missing.');
      return;
    }

    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.download = resume.originalName || `${resume.title || 'resume'}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDeleteResume = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this resume?');
    if (!confirmed) return;

    setErrorMessage('');
    setSuccessMessage('');

    try {
      await api.delete(`/resumes/${id}`, { withCredentials: true });
      setResumes((prev) => prev.filter((resume) => resume._id !== id));
      setSuccessMessage('Resume deleted successfully.');
    } catch (error) {
  
      setErrorMessage(error.response?.data?.message || 'Failed to delete resume. Please try again.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Resumes</h2>
          <p className="text-sm text-gray-500 mt-1">Manage and analyze your resume files</p>
        </div>
      </div>

      {/* Upload area */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          const droppedFile = e.dataTransfer.files?.[0];
          handleFileSelect(droppedFile);
        }}
        className={`rounded-xl border-2 border-dashed p-10 text-center transition-all duration-200 ${
          dragOver
            ? 'border-indigo-400 bg-indigo-50 scale-[1.01]'
            : 'border-gray-200 bg-gray-50 hover:border-indigo-300 hover:bg-indigo-50/50'
        }`}
      >
        <div className="flex flex-col items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-700">Drop your PDF here, or{' '}
              <label className="text-indigo-600 hover:text-indigo-700 cursor-pointer underline">
                browse
                <input
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  onChange={(e) => handleFileSelect(e.target.files?.[0])}
                />
              </label>
            </p>
            <p className="text-xs text-gray-400 mt-1">PDF only · Max 5 MB</p>
          </div>

          <div className="w-full max-w-xs flex gap-2 mt-1">
            <input
              type="text"
              placeholder="Resume title (e.g. SWE Resume 2026)"
              value={resumeTitle}
              onChange={(e) => setResumeTitle(e.target.value)}
              className="flex-1 px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 text-gray-700 placeholder-gray-400 transition-all"
            />
            <button
              onClick={handleUpload}
              disabled={uploading}
              type="button"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm hover:-translate-y-0.5 transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>

          {selectedFile && (
            <p className="text-xs text-gray-500">Selected: {selectedFile.name}</p>
          )}
          {errorMessage && <p className="text-xs text-red-600">{errorMessage}</p>}
          {successMessage && <p className="text-xs text-green-600">{successMessage}</p>}
        </div>
      </div>

      {/* Resume cards */}
     { resumes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {resumes.map((resume) => (
            <div
              key={resume._id}
              className="group bg-white rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 border border-transparent hover:border-indigo-100 overflow-hidden"
            >
            {/* Card top colour bar */}
            <div className="h-1.5 bg-linear-to-r from-indigo-500 to-purple-500" />

            <div className="p-5">
              {/* File icon + title */}
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">{resume.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5 truncate">{resume.originalName}</p>
                  <p className="text-xs text-gray-400">{new Date(resume.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                </div>
              </div>

              {/* Scores */}
              <div className="flex items-center justify-around py-3 bg-gray-50 rounded-xl mb-4">
                <ScoreBadge
                  label="ATS Score"
                  value={resume.atsScore}
                  color={resume.atsScore >= 80 ? 'text-green-600' : resume.atsScore >= 60 ? 'text-amber-500' : 'text-red-500'}
                />
                <div className="w-px h-8 bg-gray-200" />
                <ScoreBadge
                  label="Match Score"
                  value={resume.matchScore}
                  color={resume.matchScore >= 80 ? 'text-green-600' : resume.matchScore >= 60 ? 'text-amber-500' : 'text-gray-400'}
                />
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Link
                  to="/ai-analysis"
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  Analyze
                </Link>
                <button onClick={() => handleDownload(resume)} className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-gray-500 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download
                </button>
                <button onClick={() => handleDeleteResume(resume._id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Empty upload card */}
        <label className="group flex flex-col items-center justify-center gap-2 bg-white rounded-xl border-2 border-dashed border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/30 p-8 cursor-pointer transition-all duration-200 min-h-48">
          <div className="w-10 h-10 rounded-xl bg-gray-100 group-hover:bg-indigo-100 flex items-center justify-center transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400 group-hover:text-indigo-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <p className="text-sm font-medium text-gray-500 group-hover:text-indigo-600 transition-colors">Upload new resume</p>
          <input type="file" accept="application/pdf" className="hidden" onChange={(e) => handleFileSelect(e.target.files?.[0])} />
        </label>
      </div> ) : (
        <div className="text-center py-16 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 mx-auto mb-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-sm">No resumes uploaded yet. Start by uploading a PDF version of your resume.</p>
        </div>
      )}
    </div>
  );
};

export default Resumes;