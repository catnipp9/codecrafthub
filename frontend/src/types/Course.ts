export type CourseStatus = 'Not Started' | 'In Progress' | 'Completed';

export interface Course {
  id: string;
  name: string;
  description: string;
  targetDate: string;
  status: CourseStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface CourseStats {
  totalCourses: number;
  inProgress: number;
  completed: number;
}

export interface CreateCourseDto {
  name: string;
  description: string;
  targetDate: string;
  status: CourseStatus;
}

export interface UpdateCourseDto {
  name?: string;
  description?: string;
  targetDate?: string;
  status?: CourseStatus;
}
