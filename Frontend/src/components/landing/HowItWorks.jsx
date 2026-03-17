const steps = [
  {
    number: '01',
    title: 'Upload Your Resume',
    desc: 'Upload your PDF resume to JobScribe. Store multiple versions — one for each type of role you\'re targeting.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
        />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Add Job Applications',
    desc: 'Log jobs you\'ve applied to or plan to apply to. Track company, role, status, priority, notes, and interview dates all in one place.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Get AI Insights',
    desc: 'Paste a job description and let Gemini AI analyze your resume against it. Get your ATS score, spot missing keywords, and receive tailored suggestions.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    ),
  },
];

const HowItWorks = () => (
  <section id="how-it-works" className="py-20 lg:py-28 bg-slate-900 overflow-hidden">
    <div className="max-w-7xl mx-auto px-6">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-16">
        <span className="inline-block text-xs font-bold text-indigo-400 uppercase tracking-widest mb-3">How It Works</span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
          From sign-up to interview in 3 steps
        </h2>
        <p className="text-slate-400 text-base leading-relaxed">
          Get set up in minutes and start making smarter decisions about your job search right away.
        </p>
      </div>

      {/* Steps */}
      <div className="relative grid md:grid-cols-3 gap-8">
        {/* Connecting line — desktop */}
        <div className="hidden md:block absolute top-10 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-px border-t border-dashed border-slate-600" />

        {steps.map((step, i) => (
          <div key={step.number} className="relative flex flex-col items-center md:items-start text-center md:text-left">
            {/* Number circle */}
            <div className="relative z-10 flex items-center justify-center w-20 h-20 rounded-2xl bg-slate-800 border border-slate-700 mb-6 group-hover:border-indigo-500 transition-colors">
              {/* Step number */}
              <div className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold text-white shadow-lg shadow-indigo-500/30">
                {i + 1}
              </div>
              <div className="text-indigo-400">{step.icon}</div>
            </div>

            <div className="text-5xl font-black text-slate-800 select-none mb-3 -mt-2 leading-none">
              {step.number}
            </div>

            <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>

      {/* Bottom CTA strip */}
      <div className="mt-16 text-center">
        <p className="text-slate-400 text-sm mb-4">Ready to get started?</p>
        <a
          href="/register"
          className="inline-flex items-center gap-2 px-7 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/20 hover:-translate-y-0.5 transition-all duration-150 text-sm"
        >
          Create your free account
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </a>
      </div>
    </div>
  </section>
);

export default HowItWorks;
