import { useState } from 'react';
import { Course, CourseStatus, Instructor } from '@/types';
import { getCourses } from '../services/courseService';
export default () => {
	// common model
	const [isEdit, setEdit] = useState<boolean>(false);
	const [isView, setIsView] = useState<boolean>(true);
	const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
	const [isDetail, setIsDetail] = useState(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

	// State cho cousera
	const [courses, setCourses] = useState<Course[]>([]);
	const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
	const [currentCourse, setCurrentCourse] = useState<Course | undefined>(undefined);

	// Các state cho bộ lọc
	const [searchText, setSearchText] = useState<string>('');
	const [filterInstructor, setFilterInstructor] = useState<string | null>(null);
	const [filterStatus, setFilterStatus] = useState<CourseStatus | null>(null);

	// Lấy dữ liệu khóa học
	// Bảng dữ liệu : online_courses
	const fetchCourses = () => {
		setLoading(true);
		const data = getCourses();
		setCourses(data);
		applyFilters(data, searchText, filterInstructor, filterStatus);
		setLoading(false);
	};

	// Áp dụng các bộ lọc cho khóa học
	const applyFilters = (data: Course[], search: string, instructor: string | null, status: CourseStatus | null) => {
		let filtered = [...data];

		// Tìm kiếm theo tên
		if (search) {
			filtered = filtered.filter((course) => course.name.toLowerCase().includes(search.toLowerCase()));
		}

		// Lọc theo giảng viên
		if (instructor) {
			filtered = filtered.filter((course) => course.instructorId === instructor);
		}

		// Lọc theo trạng thái
		if (status) {
			filtered = filtered.filter((course) => course.status === status);
		}

		setFilteredCourses(filtered);
	};

	// State cho giảng viên
	const [instructor, setInstructor] = useState<Instructor[]>([]);

	return {
		isEdit,
		setEdit,
		isModalVisible,
		setIsModalVisible,
		courses,
		setCourses,
		filteredCourses,
		setFilteredCourses,
		loading,
		setLoading,
		confirmLoading,
		setConfirmLoading,
		currentCourse,
		setCurrentCourse,
		searchText,
		setSearchText,
		filterInstructor,
		setFilterInstructor,
		filterStatus,
		setFilterStatus,

		//Các Hàm
		fetchCourses,
		applyFilters,
	};
};
