import axios from 'axios';
import { Course, CourseStats, CreateCourseDto, UpdateCourseDto } from '../types/Course';

const API_BASE_URL = 'http://localhost:5000/api/courses';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const courseApi = {
  getAllCourses: async (): Promise<Course[]> => {
    const response = await api.get('');
    return response.data;
  },

  getStats: async (): Promise<CourseStats> => {
    const response = await api.get('/stats');
    return response.data;
  },

  createCourse: async (course: CreateCourseDto): Promise<Course> => {
    const response = await api.post('', course);
    return response.data;
  },

  updateCourse: async (id: string, updates: UpdateCourseDto): Promise<Course> => {
    const response = await api.put(`/${id}`, updates);
    return response.data;
  },

  deleteCourse: async (id: string): Promise<void> => {
    await api.delete(`/${id}`);
  },
};
