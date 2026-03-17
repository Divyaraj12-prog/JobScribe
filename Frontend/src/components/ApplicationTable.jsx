import { Link } from 'react-router-dom';

const statusStyles = {
  Applied:   'bg-blue-50   text-blue-700   ring-1 ring-blue-200',
  Interview: 'bg-amber-50  text-amber-700  ring-1 ring-amber-200',
  Offer:     'bg-green-50  text-green-700  ring-1 ring-green-200',
  Rejected:  'bg-red-50    text-red-600    ring-1 ring-red-200',
  Saved:     'bg-slate-50  text-slate-600  ring-1 ring-slate-200',
};

const StatusBadge = ({ status }) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusStyles[status] || statusStyles.Saved}`}>
    {status}
  </span>
);

const ApplicationTable = ({ applications }) => {
  if (!applications || applications.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 mx-auto mb-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zm0 0V5a2 2 0 00-2-2H6a2 2 0 00-2 2v2"
          />
        </svg>
        <p className="text-sm font-medium">No applications yet</p>
        <p className="text-xs mt-1">Start tracking by adding your first application.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto -mx-6 px-6">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="text-left pb-3 pr-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Company</th>
            <th className="text-left pb-3 pr-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Role</th>
            <th className="text-left pb-3 pr-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
            <th className="text-left pb-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Date Applied</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {applications.map((app) => (
            <tr key={app.id} className="hover:bg-gray-50/70 transition-colors group">
              {/* Company */}
              <td className="py-3.5 pr-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-linear-to-br from-slate-100 to-slate-200 flex items-center justify-center text-xs font-bold text-slate-600 shrink-0 group-hover:from-indigo-50 group-hover:to-indigo-100 group-hover:text-indigo-600 transition-colors">
                    {app.company?.[0] ?? '?'}
                  </div>
                  <span className="font-medium text-gray-800">{app.company}</span>
                </div>
              </td>

              {/* Role */}
              <td className="py-3.5 pr-4 text-gray-600">{app.role}</td>

              {/* Status */}
              <td className="py-3.5 pr-4">
                <StatusBadge status={app.status} />
              </td>

              {/* Date */}
              <td className="py-3.5 text-gray-500">
                {new Date(app.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicationTable;
