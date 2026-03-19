import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Course, CourseStatus } from '../types/Course';

interface CourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (courseData: {
    name: string;
    description: string;
    targetDate: string;
    status: CourseStatus;
  }) => void;
  course?: Course | null;
  darkMode: boolean;
}

export default function CourseModal({
  isOpen,
  onClose,
  onSubmit,
  course,
  darkMode,
}: CourseModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    targetDate: '',
    status: 'Not Started' as CourseStatus,
  });

  const [errors, setErrors] = useState({
    name: '',
    description: '',
    targetDate: '',
  });

  useEffect(() => {
    if (course) {
      setFormData({
        name: course.name,
        description: course.description,
        targetDate: course.targetDate.split('T')[0],
        status: course.status,
      });
    } else {
      setFormData({
        name: '',
        description: '',
        targetDate: '',
        status: 'Not Started',
      });
    }
    setErrors({ name: '', description: '', targetDate: '' });
  }, [course, isOpen]);

  const validate = () => {
    const newErrors = {
      name: '',
      description: '',
      targetDate: '',
    };

    if (!formData.name.trim()) {
      newErrors.name = 'Course name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.targetDate) {
      newErrors.targetDate = 'Target date is required';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== '');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      onSubmit(formData);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div
        className={`w-full max-w-lg rounded-lg shadow-xl ${
          darkMode ? 'bg-slate-800' : 'bg-white'
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {course ? 'Edit Course' : 'Add New Course'}
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors ${
              darkMode ? 'hover:bg-slate-700 text-slate-400' : 'hover:bg-gray-100 text-gray-500'
            }`}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label
              htmlFor="name"
              className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-slate-300' : 'text-gray-700'
              }`}
            >
              Course Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                darkMode
                  ? 'bg-slate-900 border-slate-700 text-white focus:border-indigo-500'
                  : 'bg-white border-gray-300 text-gray-900 focus:border-indigo-500'
              } focus:outline-none focus:ring-2 focus:ring-indigo-500/20`}
              placeholder="e.g., Advanced React Patterns"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label
              htmlFor="description"
              className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-slate-300' : 'text-gray-700'
              }`}
            >
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                darkMode
                  ? 'bg-slate-900 border-slate-700 text-white focus:border-indigo-500'
                  : 'bg-white border-gray-300 text-gray-900 focus:border-indigo-500'
              } focus:outline-none focus:ring-2 focus:ring-indigo-500/20`}
              placeholder="Brief description of the course..."
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="targetDate"
              className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-slate-300' : 'text-gray-700'
              }`}
            >
              Target Date
            </label>
            <input
              type="date"
              id="targetDate"
              value={formData.targetDate}
              onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
              className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                darkMode
                  ? 'bg-slate-900 border-slate-700 text-white focus:border-indigo-500'
                  : 'bg-white border-gray-300 text-gray-900 focus:border-indigo-500'
              } focus:outline-none focus:ring-2 focus:ring-indigo-500/20`}
            />
            {errors.targetDate && (
              <p className="text-red-500 text-sm mt-1">{errors.targetDate}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="status"
              className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-slate-300' : 'text-gray-700'
              }`}
            >
              Status
            </label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as CourseStatus })}
              className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                darkMode
                  ? 'bg-slate-900 border-slate-700 text-white focus:border-indigo-500'
                  : 'bg-white border-gray-300 text-gray-900 focus:border-indigo-500'
              } focus:outline-none focus:ring-2 focus:ring-indigo-500/20`}
            >
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded-lg transition-colors ${
                darkMode
                  ? 'bg-slate-700 hover:bg-slate-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
            >
              {course ? 'Update Course' : 'Add Course'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
