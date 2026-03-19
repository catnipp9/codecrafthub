import { Pencil, Trash2, Calendar } from 'lucide-react';
import { Course } from '../types/Course';

interface CourseCardProps {
  course: Course;
  darkMode: boolean;
  onEdit: (course: Course) => void;
  onDelete: (id: string) => void;
}

export default function CourseCard({ course, darkMode, onEdit, onDelete }: CourseCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return darkMode ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-green-50 text-green-700 border-green-200';
      case 'In Progress':
        return darkMode ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' : 'bg-yellow-50 text-yellow-700 border-yellow-200';
      default:
        return darkMode ? 'bg-slate-700 text-slate-300 border-slate-600' : 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div
      className={`rounded-lg p-5 shadow-sm border transition-all ${
        darkMode
          ? 'bg-slate-800 border-slate-700 hover:border-indigo-500'
          : 'bg-white border-gray-200 hover:border-indigo-400'
      }`}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {course.name}
        </h3>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
            course.status
          )}`}
        >
          {course.status}
        </span>
      </div>

      <p className={`text-sm mb-4 ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
        {course.description}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Calendar className={`h-4 w-4 ${darkMode ? 'text-slate-500' : 'text-gray-400'}`} />
          <span className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
            {formatDate(course.targetDate)}
          </span>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(course)}
            className={`p-2 rounded-lg transition-colors ${
              darkMode
                ? 'bg-slate-700 hover:bg-slate-600 text-indigo-400'
                : 'bg-gray-100 hover:bg-gray-200 text-indigo-600'
            }`}
            aria-label="Edit course"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(course.id)}
            className={`p-2 rounded-lg transition-colors ${
              darkMode
                ? 'bg-slate-700 hover:bg-red-900/30 text-red-400'
                : 'bg-gray-100 hover:bg-red-50 text-red-600'
            }`}
            aria-label="Delete course"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
