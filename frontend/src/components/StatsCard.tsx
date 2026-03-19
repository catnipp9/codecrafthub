import { Video as LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  darkMode: boolean;
}

export default function StatsCard({ title, value, icon: Icon, darkMode }: StatsCardProps) {
  return (
    <div
      className={`rounded-lg p-6 shadow-sm border transition-all ${
        darkMode
          ? 'bg-slate-800 border-slate-700 hover:border-indigo-500'
          : 'bg-white border-gray-200 hover:border-indigo-400'
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm font-medium ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
            {title}
          </p>
          <p className={`text-3xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {value}
          </p>
        </div>
        <div
          className={`p-3 rounded-lg ${
            darkMode ? 'bg-indigo-500/10' : 'bg-indigo-50'
          }`}
        >
          <Icon className={`h-6 w-6 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
        </div>
      </div>
    </div>
  );
}
