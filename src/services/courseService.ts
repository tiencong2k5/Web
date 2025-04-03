import { Course, CourseStatus, INSTRUCTORS } from '@/types';
import { message } from 'antd';

// Khởi tạo dữ liệu mẫu
const initializeSampleData = (): Course[] => {
	return [
		{
			id: '1',
			name: 'Lập trình JavaScript cơ bản',
			instructorId: '1',
			studentCount: 25,
			status: CourseStatus.ACTIVE,
			description: '<p>Khóa học dành cho người mới bắt đầu học lập trình JavaScript</p>',
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		},
		{
			id: '2',
			name: 'React Hooks và Redux',
			instructorId: '2',
			studentCount: 15,
			status: CourseStatus.ACTIVE,
			description: '<p>Tìm hiểu về React Hooks và quản lý state với Redux</p>',
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		},
		{
			id: '3',
			name: 'TypeScript nâng cao',
			instructorId: '3',
			studentCount: 0,
			status: CourseStatus.PAUSED,
			description: '<p>Khóa học chuyên sâu về TypeScript</p>',
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		},
	];
};

export const getCourses = (): Course[] => {
	try {
		const storedData = localStorage.getItem('online_courses');
		if (!storedData) {
			const initialData = initializeSampleData();
			localStorage.setItem('online_courses', JSON.stringify(initialData));
			return initialData;
		}
		return JSON.parse(storedData);
	} catch (error) {
		console.error('Lỗi khi lấy dữ liệu khóa học:', error);
		return [];
	}
};

const saveCourses = (courses: Course[]): void => {
	try {
		localStorage.setItem('online_courses', JSON.stringify(courses));
	} catch (error) {
		console.error('Lỗi khi lưu dữ liệu khóa học:', error);
		message.error('Có lỗi xảy ra khi lưu dữ liệu!');
	}
};

export const addCourse = (course: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>): Course | null => {
	try {
		const courses = getCourses();

		// Kiểm tra tên khóa học đã tồn tại chưa
		const existingCourse = courses.find((item) => item.name.toLowerCase() === course.name.toLowerCase());
		if (existingCourse) {
			message.error('Tên khóa học đã tồn tại!');
			return null;
		}

		const now = new Date().toISOString();
		const newCourse: Course = {
			...course,
			id: Date.now().toString(),
			createdAt: now,
			updatedAt: now,
		};

		courses.push(newCourse);
		saveCourses(courses);
		message.success('Thêm khóa học thành công!');
		return newCourse;
	} catch (error) {
		console.error('Lỗi khi thêm khóa học:', error);
		message.error('Có lỗi xảy ra khi thêm khóa học!');
		return null;
	}
};

export const updateCourse = (id: string, courseData: Partial<Course>): Course | null => {
	try {
		const courses = getCourses();
		const index = courses.findIndex((c) => c.id === id);

		if (index === -1) {
			message.error('Không tìm thấy khóa học!');
			return null;
		}

		// Kiểm tra trùng tên (nếu có thay đổi tên)
		if (courseData.name) {
			const existingCourse = courseData.name
				? courses.find((item) => item.id !== id && item.name.toLowerCase() === courseData.name!.toLowerCase())
				: undefined;
			if (existingCourse) {
				message.error('Tên khóa học đã tồn tại!');
				return null;
			}
		}

		const updatedCourse = {
			...courses[index],
			...courseData,
			updatedAt: new Date().toISOString(),
		};

		courses[index] = updatedCourse;
		saveCourses(courses);
		message.success('Cập nhật khóa học thành công!');
		return updatedCourse;
	} catch (error) {
		console.error('Lỗi khi cập nhật khóa học:', error);
		message.error('Có lỗi xảy ra khi cập nhật khóa học!');
		return null;
	}
};

export const deleteCourse = (id: string): boolean => {
	try {
		const courses = getCourses();
		const courseToDelete = courses.find((c) => c.id === id);

		if (!courseToDelete) {
			message.error('Không tìm thấy khóa học!');
			return false;
		}

		if (courseToDelete.studentCount > 0) {
			message.error('Không thể xóa khóa học đã có học viên!');
			return false;
		}

		const updatedCourses = courses.filter((c) => c.id !== id);
		saveCourses(updatedCourses);
		message.success('Xóa khóa học thành công!');
		return true;
	} catch (error) {
		console.error('Lỗi khi xóa khóa học:', error);
		message.error('Có lỗi xảy ra khi xóa khóa học!');
		return false;
	}
};

export const getInstructorNameById = (id: string): string => {
	const instructor = INSTRUCTORS.find((ins) => ins.id === id);
	return instructor ? instructor.name : 'Không xác định';
};
