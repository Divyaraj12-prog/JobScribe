import { useEffect, useState } from 'react';
import api from '../api/axios';

const ScoreRing = ({ score, label, color }) => {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-20 h-20">
        <svg className="w-20 h-20 -rotate-90" viewBox="0 0 72 72">
          <circle cx="36" cy="36" r={radius} fill="none" strokeWidth="6" stroke="#f1f5f9" />
          <circle
            cx="36" cy="36" r={radius} fill="none" strokeWidth="6"
            stroke={color}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.8s ease' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-gray-800">{score}</span>
        </div>
      </div>
      <span className="text-xs font-medium text-gray-500">{label}</span>
    </div>
  );
};

const AIAnalysis = () => {
  const [resumes, setResumes] = useState([]);
  const [loadingResumes, setLoadingResumes] = useState(true);
  const [selectedResume, setSelectedResume] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadResumes = async () => {
      setLoadingResumes(true);
      setErrorMessage('');

      try {
        const response = await api.get('/resumes');
        if (isMounted) {
          setResumes(response.data?.resumes || []);
        }
      } catch (error) {
        if (!isMounted) return;

        if (error?.response?.status === 404) {
          setResumes([]);
        } else {
          setErrorMessage(error?.response?.data?.message || 'Failed to load resumes. Please try again.');
        }
      } finally {
        if (isMounted) {
          setLoadingResumes(false);
        }
      }
    };

    loadResumes();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleAnalyze = async (e) => {
    e.preventDefault();

    if (!selectedResume) {
      setErrorMessage('Please select a resume.');
      return;
    }

    if (!jobDescription || jobDescription.trim().length < 30) {
      setErrorMessage('Job description must be at least 30 characters.');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    setResult(null);

    try {
      const response = await api.post(`/ai/analyze-resume/${selectedResume}`, {
        jobDescription: jobDescription.trim(),
      });

      const analysis = response.data?.analysisResult || response.data;

      setResult({
        score: Number(analysis?.score || 0),
        matchScore: Number(analysis?.matchScore || 0),
        missingKeywords: Array.isArray(analysis?.missingKeywords) ? analysis.missingKeywords : [],
        suggestions: Array.isArray(analysis?.suggestions) ? analysis.suggestions : [],
      });
    } catch (error) {
      setErrorMessage(error?.response?.data?.message || 'Failed to analyze resume. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">AI Resume Analysis</h2>
        <p className="text-sm text-gray-500 mt-1">Compare your resume against a job description and get an ATS score with improvement suggestions.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input form */}
        <div className="bg-white rounded-xl shadow-md p-6 space-y-5">
          <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            Analysis Settings
          </h3>

          <form onSubmit={handleAnalyze} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Select Resume</label>
              <select
                value={selectedResume}
                onChange={(e) => setSelectedResume(e.target.value)}
                required
                disabled={loadingResumes || resumes.length === 0}
                className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 bg-gray-50 text-gray-800 transition-all appearance-none"
              >
                <option value="">
                  {loadingResumes ? 'Loading resumes...' : resumes.length === 0 ? 'No resumes found' : 'Choose a resume...'}
                </option>
                {resumes.map((r) => (
                  <option key={r._id} value={r._id}>{r.title || r.originalName || 'Untitled Resume'}</option>
                ))}
              </select>
            </div>

            {errorMessage && (
              <div className="rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2">
                {errorMessage}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Job Description
                <span className="ml-1 text-xs text-gray-400 font-normal">(min. 30 characters)</span>
              </label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                rows={10}
                placeholder="Paste the full job description here...\n\nExample:\nWe are looking for a Senior Software Engineer with 5+ years experience in React, TypeScript, Node.js..."
                required
                minLength={30}
                className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 bg-gray-50 text-gray-800 placeholder-gray-400 resize-none transition-all"
              />
              <p className="text-xs text-gray-400 mt-1 text-right">{jobDescription.length} chars</p>
            </div>

            <button
              type="submit"
              disabled={loading || loadingResumes || resumes.length === 0}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold rounded-xl shadow-md shadow-indigo-500/20 hover:-translate-y-0.5 disabled:translate-y-0 transition-all duration-150 text-sm flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Analyzing with AI...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  Analyze Resume
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results */}
        <div className="space-y-5">
          {!result && !loading && (
            <div className="bg-white rounded-xl shadow-md p-10 flex flex-col items-center justify-center text-center text-gray-400 min-h-64">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-14 h-14 mb-3 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <p className="text-sm font-medium">No analysis yet</p>
              <p className="text-xs mt-1">Select a resume and paste a job description to get started.</p>
            </div>
          )}

          {loading && (
            <div className="bg-white rounded-xl shadow-md p-10 flex flex-col items-center justify-center text-center min-h-64">
              <div className="w-14 h-14 rounded-full border-4 border-indigo-100 border-t-indigo-500 animate-spin mb-4" />
              <p className="text-sm font-medium text-gray-700">Analyzing your resume...</p>
              <p className="text-xs text-gray-400 mt-1">This usually takes a few seconds.</p>
            </div>
          )}

          {result && (
            <>
              {/* Scores */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-5">Score Overview</h3>
                <div className="flex items-center justify-around">
                  <ScoreRing score={result.score} label="ATS Score" color={result.score >= 75 ? '#22c55e' : result.score >= 55 ? '#f59e0b' : '#ef4444'} />
                  <div className="text-center px-4">
                    <div className="text-3xl font-bold text-gray-300">/</div>
                  </div>
                  <ScoreRing score={result.matchScore} label="Match Score" color={result.matchScore >= 75 ? '#22c55e' : result.matchScore >= 55 ? '#f59e0b' : '#ef4444'} />
                </div>
              </div>

              {/* Missing keywords */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Missing Keywords
                </h3>
                <div className="flex flex-wrap gap-2">
                  {result.missingKeywords.map((kw) => (
                    <span key={kw} className="inline-flex items-center px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 ring-1 ring-amber-200 text-xs font-medium">
                      + {kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Suggestions */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Improvement Suggestions
                </h3>
                <ul className="space-y-2.5">
                  {result.suggestions.map((s, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                      <span className="mt-0.5 w-5 h-5 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIAnalysis;