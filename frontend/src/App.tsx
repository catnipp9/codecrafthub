import { useState, useEffect } from 'react';
import { BookOpen, Clock, CheckCircle, Plus, AlertCircle, Loader2 } from 'lucide-react';
import Header from './components/Header';
import StatsCard from './components/StatsCard';
import CourseCard from './components/CourseCard';
import CourseModal from './components/CourseModal';
import SearchBar from './components/SearchBar';
import { courseApi } from './services/api';
import { Course, CourseStats } from './types/Course';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [courses, setCourses] = useState<Course[]>([]);
  const [stats, setStats] = useState<CourseStats>({
    totalCourses: 0,
    inProgress: 0,
    completed: 0,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await courseApi.getAllCourses();
      setCourses(data);
    } catch (err) {
      setError('Failed to connect to backend. Make sure the server is running at http://localhost:5000/api/courses');
      console.error('Error fetching courses:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const data = await courseApi.getStats();
      setStats(data);
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchStats();
  }, []);

  const handleAddCourse = async (courseData: {
    name: string;
    description: string;
    targetDate: string;
    status: Course['status'];
  }) => {
    try {
      setError(null);
      await courseApi.createCourse(courseData);
      await fetchCourses();
      await fetchStats();
    } catch (err) {
      setError('Failed to create course. Please try again.');
      console.error('Error creating course:', err);
    }
  };

  const handleEditCourse = async (courseData: {
    name: string;
    description: string;
    targetDate: string;
    status: Course['status'];
  }) => {
    if (!selectedCourse) return;

    try {
      setError(null);
      await courseApi.updateCourse(selectedCourse.id, courseData);
      await fetchCourses();
      await fetchStats();
      setSelectedCourse(null);
    } catch (err) {
      setError('Failed to update course. Please try again.');
      console.error('Error updating course:', err);
    }
  };

  const handleDeleteCourse = async (id: string) => {
    if (!confirm('Are you sure you want to delete this course?')) return;

    try {
      setError(null);
      await courseApi.deleteCourse(id);
      await fetchCourses();
      await fetchStats();
    } catch (err) {
      setError('Failed to delete course. Please try again.');
      console.error('Error deleting course:', err);
    }
  };

  const openEditModal = (course: Course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
  };

  const filteredCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`min-h-screen transition-colors ${darkMode ? 'bg-slate-950' : 'bg-gray-50'}`}>
      <Header darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div
            className={`mb-6 p-4 rounded-lg border flex items-start space-x-3 ${
              darkMode
                ? 'bg-red-500/10 border-red-500/20 text-red-400'
                : 'bg-red-50 border-red-200 text-red-700'
            }`}
          >
            <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Error</p>
              <p className="text-sm mt-1">{error}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard
            title="Total Courses"
            value={stats.totalCourses}
            icon={BookOpen}
            darkMode={darkMode}
          />
          <StatsCard
            title="In Progress"
            value={stats.inProgress}
            icon={Clock}
            darkMode={darkMode}
          />
          <StatsCard
            title="Completed"
            value={stats.completed}
            icon={CheckCircle}
            darkMode={darkMode}
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="w-full sm:w-96">
            <SearchBar value={searchQuery} onChange={setSearchQuery} darkMode={darkMode} />
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors flex items-center justify-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add Course</span>
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className={`h-12 w-12 animate-spin ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
            <p className={`mt-4 text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
              Loading courses...
            </p>
          </div>
        ) : filteredCourses.length === 0 ? (
          <div
            className={`text-center py-16 rounded-lg border ${
              darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
            }`}
          >
            <BookOpen className={`h-12 w-12 mx-auto mb-4 ${darkMode ? 'text-slate-600' : 'text-gray-400'}`} />
            <p className={`text-lg font-medium ${darkMode ? 'text-slate-300' : 'text-gray-900'}`}>
              {searchQuery ? 'No courses found' : 'No courses yet'}
            </p>
            <p className={`mt-2 text-sm ${darkMode ? 'text-slate-500' : 'text-gray-600'}`}>
              {searchQuery ? 'Try a different search term' : 'Get started by adding your first course'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                darkMode={darkMode}
                onEdit={openEditModal}
                onDelete={handleDeleteCourse}
              />
            ))}
          </div>
        )}
      </main>

      <CourseModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={selectedCourse ? handleEditCourse : handleAddCourse}
        course={selectedCourse}
        darkMode={darkMode}
      />
    </div>
  );
}

export default App;
