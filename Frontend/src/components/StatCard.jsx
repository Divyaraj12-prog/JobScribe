const StatCard = ({ title, value, icon, gradient, iconBg, change, changeType }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 p-6 flex items-center gap-5 group cursor-default">
      {/* Icon */}
      <div className={`shrink-0 w-14 h-14 rounded-xl flex items-center justify-center ${iconBg} transition-transform duration-200 group-hover:scale-105`}>
        {icon}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-500 truncate">{title}</p>
        <p className="text-3xl font-bold text-gray-800 mt-0.5">{value}</p>
        {change !== undefined && (
          <p className={`text-xs font-medium mt-1 ${changeType === 'up' ? 'text-green-500' : changeType === 'down' ? 'text-red-500' : 'text-gray-400'}`}>
            {changeType === 'up' ? '↑' : changeType === 'down' ? '↓' : '•'} {change}
          </p>
        )}
      </div>

      {/* Subtle gradient bar at bottom */}
      <div className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-b-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${gradient}`} />
    </div>
  );
};

export default StatCard;
