export enum CourseStatus {
	ACTIVE = 'Đang mở',
	FINISHED = 'Đã kết thúc',
	PAUSED = 'Tạm dừng',
}
// Giảng Viên
export interface Instructor {
	id: string;
	name: string;
}
//Khóa học
export interface Course {
	id: string;
	name: string;
	instructorId: string; // mã giảng viên
	studentCount: number; // Số lượng học viên
	status: CourseStatus;
	description: string;
	createdAt: string;
	updatedAt: string;
}
// Học viên

// Tạo tạm mảng giảng viên
export const INSTRUCTORS: Instructor[] = [
	{ id: '1', name: 'Nguyễn Văn A' },
	{ id: '2', name: 'Trần Thị B' },
	{ id: '3', name: 'Lê Văn C' },
	{ id: '4', name: 'Phạm Thị D' },
	{ id: '5', name: 'Hoàng Văn E' },
];
