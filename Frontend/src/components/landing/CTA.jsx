import { Link } from 'react-router-dom';

const CTA = () => (
  <section id="pricing" className="py-20 lg:py-28 bg-white">
    <div className="max-w-7xl mx-auto px-6">
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-indigo-600 to-purple-700 px-8 py-16 lg:px-16 text-center shadow-2xl shadow-indigo-500/20">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-12 -left-12 w-64 h-64 bg-white/5 rounded-full blur-2xl" />
          <div className="absolute -bottom-8 -right-8 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-lg max-h-64 bg-indigo-400/10 rounded-full blur-3xl" />
          {/* Subtle grid */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="cta-grid" width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cta-grid)" />
          </svg>
        </div>

        <div className="relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 text-white/90 text-xs font-semibold mb-6 border border-white/20">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            Free to get started — no credit card needed
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
            Start optimizing your
            <br className="hidden sm:block" /> job search today
          </h2>

          <p className="text-indigo-200 text-base lg:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Join thousands of job seekers who use JobScribe to track applications, boost resume scores, and land interviews faster.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/register"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white hover:bg-gray-50 text-indigo-700 font-bold rounded-xl shadow-lg shadow-black/10 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-150 text-sm"
            >
              Create Free Account
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              to="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 hover:-translate-y-0.5 transition-all duration-150 text-sm"
            >
              Sign in to your account
            </Link>
          </div>

          {/* Social proof */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-indigo-200 text-xs">
            {['3,200+ active users', '12,000+ applications tracked', '4.9 / 5 avg. rating'].map((s) => (
              <span key={s} className="flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default CTA;
