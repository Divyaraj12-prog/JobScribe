const features = [
  {
    tag: 'AI-Powered',
    title: 'AI Resume Analysis',
    desc: 'Instantly compare your resume against any job description. Get a precise ATS compatibility score, discover missing keywords, and receive actionable suggestions to pass automated screening.',
    iconBg: 'bg-linear-to-br from-indigo-50 to-indigo-100',
    iconBorder: 'border-indigo-100',
    iconColor: 'text-indigo-500',
    tagColor: 'bg-indigo-50 text-indigo-600 ring-1 ring-indigo-200',
    highlights: ['ATS compatibility score', 'Missing keyword detection', 'Tailored improvement tips'],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    ),
  },
  {
    tag: 'Organizer',
    title: 'Application Tracker',
    desc: 'Never lose track of where you applied. Log companies, roles, links, notes, and interview dates. Filter by status and priority to focus on what matters most right now.',
    iconBg: 'bg-linear-to-br from-purple-50 to-purple-100',
    iconBorder: 'border-purple-100',
    iconColor: 'text-purple-500',
    tagColor: 'bg-purple-50 text-purple-600 ring-1 ring-purple-200',
    highlights: ['Status & priority tracking', 'Interview date reminders', 'Notes per application'],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
        />
      </svg>
    ),
  },
  {
    tag: 'Storage',
    title: 'Resume Management',
    desc: 'Upload and organize multiple resume versions in one place. Link specific resumes to specific applications and see their individual ATS scores and match rates at a glance.',
    iconBg: 'bg-linear-to-br from-emerald-50 to-emerald-100',
    iconBorder: 'border-emerald-100',
    iconColor: 'text-emerald-500',
    tagColor: 'bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200',
    highlights: ['Multiple resume versions', 'Per-resume ATS tracking', 'PDF upload & storage'],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
  },
];

const Features = () => (
  <section id="features" className="py-20 lg:py-28 bg-white">
    <div className="max-w-7xl mx-auto px-6">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="inline-block text-xs font-bold text-indigo-600 uppercase tracking-widest mb-3">Features</span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
          Everything you need to get hired
        </h2>
        <p className="text-gray-500 text-base leading-relaxed">
          A complete toolkit for the modern job seeker — from first application to offer letter.
        </p>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-7">
        {features.map((f) => (
          <div
            key={f.title}
            className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-7 overflow-hidden"
          >
            {/* Top gradient streak */}
            <div className="absolute top-0 inset-x-0 h-0.5 bg-linear-to-r from-transparent via-indigo-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Icon */}
            <div className={`w-14 h-14 rounded-2xl ${f.iconBg} border ${f.iconBorder} ${f.iconColor} flex items-center justify-center mb-5 transition-transform duration-200 group-hover:scale-105`}>
              {f.icon}
            </div>

            {/* Tag */}
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold mb-3 ${f.tagColor}`}>
              {f.tag}
            </span>

            <h3 className="text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-5">{f.desc}</p>

            {/* Mini feature list */}
            <ul className="space-y-2">
              {f.highlights.map((h) => (
                <li key={h} className="flex items-center gap-2.5 text-sm text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-indigo-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  {h}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
