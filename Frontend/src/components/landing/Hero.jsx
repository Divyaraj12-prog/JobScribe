import { Link } from 'react-router-dom';

const statusColor = {
  Interview: 'bg-amber-100 text-amber-700',
  Applied:   'bg-blue-100 text-blue-700',
  Offer:     'bg-green-100 text-green-700',
  Rejected:  'bg-red-100 text-red-600',
  Saved:     'bg-slate-100 text-slate-600',
};

const mockApps = [
  { company: 'G', name: 'Google',  role: 'Software Engineer',  status: 'Interview' },
  { company: 'M', name: 'Meta',    role: 'Frontend Developer', status: 'Applied'   },
  { company: 'S', name: 'Stripe',  role: 'Full Stack Eng.',    status: 'Offer'     },
  { company: 'A', name: 'Amazon',  role: 'Backend Engineer',   status: 'Rejected'  },
];

const DashboardMockup = () => (
  <div className="relative w-full max-w-lg mx-auto">
    {/* Glow */}
    <div className="absolute -inset-4 bg-linear-to-r from-indigo-500/20 to-purple-500/20 rounded-3xl blur-2xl" />

    <div className="relative bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-700/50">
      {/* Window chrome */}
      <div className="flex items-center gap-1.5 px-4 py-3 bg-slate-800 border-b border-slate-700/60">
        <span className="w-3 h-3 rounded-full bg-red-500/80" />
        <span className="w-3 h-3 rounded-full bg-amber-500/80" />
        <span className="w-3 h-3 rounded-full bg-green-500/80" />
        <span className="mx-auto text-xs text-slate-500 font-medium">JobScribe Dashboard</span>
      </div>

      <div className="flex">
        {/* Mini sidebar */}
        <div className="w-10 bg-slate-800/60 flex flex-col items-center py-4 gap-4 border-r border-slate-700/50">
          {['M4 5a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zm0 8a1 1 0 011-1h4a1 1 0 011 1v6a1 1 0 01-1 1h-4a1 1 0 01-1-1v-6zM4 14a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1v-5z','M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zm0 0V5a2 2 0 00-2-2H6a2 2 0 00-2 2v2','M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'].map((d, i) => (
            <div key={i} className={`w-6 h-6 rounded-md flex items-center justify-center ${i === 0 ? 'bg-indigo-600' : 'bg-slate-700/60'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={d} />
              </svg>
            </div>
          ))}
        </div>

        {/* Main panel */}
        <div className="flex-1 p-4">
          {/* Stats */}
          <div className="grid grid-cols-4 gap-2 mb-4">
            {[
              { label: 'Total', value: '24', color: 'text-slate-200' },
              { label: 'Interview', value: '6', color: 'text-amber-400' },
              { label: 'Offers', value: '2', color: 'text-green-400' },
              { label: 'Rejected', value: '5', color: 'text-red-400' },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-slate-800 rounded-lg p-2 text-center">
                <div className={`text-base font-bold ${color}`}>{value}</div>
                <div className="text-slate-500 text-[9px] font-medium mt-0.5">{label}</div>
              </div>
            ))}
          </div>

          {/* Table */}
          <div className="bg-slate-800/70 rounded-lg overflow-hidden mb-3">
            <div className="grid grid-cols-3 px-3 py-1.5 border-b border-slate-700/50">
              {['Company', 'Role', 'Status'].map((h) => (
                <span key={h} className="text-[9px] font-semibold text-slate-500 uppercase tracking-wider">{h}</span>
              ))}
            </div>
            {mockApps.map((app, i) => (
              <div key={i} className="grid grid-cols-3 items-center px-3 py-2 border-b border-slate-700/30 last:border-0 hover:bg-slate-700/30 transition-colors">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded bg-slate-600 flex items-center justify-center text-[9px] font-bold text-slate-300">
                    {app.company}
                  </div>
                  <span className="text-[10px] text-slate-300 font-medium">{app.name}</span>
                </div>
                <span className="text-[9px] text-slate-400 truncate">{app.role}</span>
                <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[8px] font-semibold w-fit ${statusColor[app.status]}`}>
                  {app.status}
                </span>
              </div>
            ))}
          </div>

          {/* AI bar */}
          <div className="bg-linear-to-r from-indigo-600/20 to-purple-600/20 rounded-lg p-2.5 border border-indigo-500/20 flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-indigo-600 flex items-center justify-center shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="text-[9px] text-indigo-300 font-semibold mb-1">AI ATS Score — Software Engineer Resume</div>
              <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full w-[78%] bg-linear-to-r from-indigo-500 to-purple-500 rounded-full" />
              </div>
            </div>
            <span className="text-sm font-bold text-indigo-300">78</span>
          </div>
        </div>
      </div>
    </div>

    {/* Floating badge — interviews */}
    <div className="absolute -left-6 top-1/3 bg-white rounded-xl shadow-xl shadow-gray-200 border border-gray-100 px-3 py-2 hidden lg:flex items-center gap-2">
      <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
      <div>
        <p className="text-xs font-bold text-gray-800">6 Interviews</p>
        <p className="text-[10px] text-gray-400">This month</p>
      </div>
    </div>

    {/* Floating badge — offer */}
    <div className="absolute -right-6 bottom-1/4 bg-white rounded-xl shadow-xl shadow-gray-200 border border-gray-100 px-3 py-2 hidden lg:flex items-center gap-2">
      <div className="w-7 h-7 rounded-lg bg-green-50 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div>
        <p className="text-xs font-bold text-gray-800">Offer Received!</p>
        <p className="text-[10px] text-gray-400">Stripe · Full Stack</p>
      </div>
    </div>
  </div>
);

const Hero = () => (
  <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden">
    {/* Background layers */}
    <div className="absolute inset-0 bg-linear-to-br from-slate-50 via-white to-indigo-50/60 pointer-events-none" />
    <div className="absolute top-0 right-0 w-2/3 h-full bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.08)_0%,transparent_70%)] pointer-events-none" />
    <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-40 pointer-events-none" />
    <div className="absolute -bottom-12 -left-12 w-72 h-72 bg-purple-100 rounded-full blur-3xl opacity-30 pointer-events-none" />

    <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      {/* Left — copy */}
      <div className="text-center lg:text-left">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-semibold mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
          Powered by Gemini AI
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold tracking-tight text-gray-900 leading-[1.1] mb-5">
          Track Your Job
          <br />
          Applications{' '}
          <span className="relative inline-block">
            <span className="relative z-10 bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Smarter
            </span>
            <span className="absolute bottom-1 left-0 right-0 h-3 bg-indigo-100/70 rounded -z-10" />
          </span>
          {' '}with AI
        </h1>

        {/* Subheading */}
        <p className="text-lg text-gray-500 leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8">
          JobScribe helps you organize every application, optimize your resume with ATS scoring, and land more interviews — all in one focused workspace.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 mb-10">
          <Link
            to="/register"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-0.5 transition-all duration-150 text-sm"
          >
            Get Started Free
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <a
            href="#features"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-gray-700 font-semibold rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all text-sm shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            View Demo
          </a>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5 text-xs text-gray-400">
          {[
            { icon: '✓', text: 'Free forever plan' },
            { icon: '✓', text: 'No credit card required' },
            { icon: '✓', text: '3,200+ job seekers' },
          ].map((t) => (
            <span key={t.text} className="flex items-center gap-1.5">
              <span className="text-green-500 font-bold">{t.icon}</span>
              {t.text}
            </span>
          ))}
        </div>
      </div>

      {/* Right — dashboard mockup */}
      <div className="w-full">
        <DashboardMockup />
      </div>
    </div>
  </section>
);

export default Hero;
