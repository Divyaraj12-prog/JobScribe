const benefits = [
  {
    title: 'ATS Optimization',
    desc: 'Score your resume against real job descriptions and ensure you make it past automated filters.',
    iconColor: 'text-indigo-500',
    iconBg: 'bg-indigo-50',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: 'Organized Job Search',
    desc: 'Keep every application, company detail, and follow-up in one structured, filterable dashboard.',
    iconColor: 'text-purple-500',
    iconBg: 'bg-purple-50',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
      </svg>
    ),
  },
  {
    title: 'Faster Interview Prep',
    desc: 'Review the job description, notes, and AI insights all in one place before each interview.',
    iconColor: 'text-amber-500',
    iconBg: 'bg-amber-50',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: 'Smart Keyword Insights',
    desc: 'Instantly see which keywords you\'re missing and which ones are boosting your match score.',
    iconColor: 'text-blue-500',
    iconBg: 'bg-blue-50',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
      </svg>
    ),
  },
  {
    title: 'Multiple Resume Versions',
    desc: 'Store a targeted resume for every role type — software engineer, data analyst, product manager.',
    iconColor: 'text-emerald-500',
    iconBg: 'bg-emerald-50',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
      </svg>
    ),
  },
  {
    title: 'Progress Analytics',
    desc: 'Visualize your job search funnel — from saved to applied to interview to offer — at a glance.',
    iconColor: 'text-rose-500',
    iconBg: 'bg-rose-50',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
      </svg>
    ),
  },
];

const Benefits = () => (
  <section className="py-20 lg:py-28 bg-slate-50">
    <div className="max-w-7xl mx-auto px-6">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-14">
        <span className="inline-block text-xs font-bold text-indigo-600 uppercase tracking-widest mb-3">Why JobScribe</span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
          Built for focused job seekers
        </h2>
        <p className="text-gray-500 text-base leading-relaxed">
          Every feature is designed to reduce noise and help you land the right role faster.
        </p>
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {benefits.map((b) => (
          <div
            key={b.title}
            className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 p-6 flex gap-4"
          >
            <div className={`shrink-0 w-10 h-10 rounded-xl ${b.iconBg} ${b.iconColor} flex items-center justify-center mt-0.5`}>
              {b.icon}
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-1">{b.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{b.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Benefits;
