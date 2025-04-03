import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Space, Tag, Modal, Select, Card, Typography, Row, Col } from 'antd';
import {
	ExclamationCircleOutlined,
	PlusOutlined,
	EditOutlined,
	DeleteOutlined,
	SearchOutlined,
} from '@ant-design/icons';
import { Course, CourseStatus, INSTRUCTORS } from '@/types/index';
import { addCourse, updateCourse, deleteCourse, getInstructorNameById } from '../../services/courseService';
import CourseForm from './CouserForm';
import { useModel } from 'umi';
import type { ColumnsType } from 'antd/es/table';
const { Title } = Typography;
const { Option } = Select;
const { confirm } = Modal;

const CourseList: React.FC = () => {
	const {
		isModalVisible,
		setIsModalVisible,
		fetchCourses,
		courses,
		searchText,
		filterInstructor,
		filterStatus,
		setCurrentCourse,
		applyFilters,
		setConfirmLoading,
		currentCourse,
		setSearchText,
		setFilterInstructor,
		setFilterStatus,
		filteredCourses,
		confirmLoading,
		loading,
	} = useModel('course');

	useEffect(() => {
		fetchCourses();
	}, []);

	// Cập nhật bộ lọc
	useEffect(() => {
		applyFilters(courses, searchText, filterInstructor, filterStatus);
	}, [searchText, filterInstructor, filterStatus, courses]);

	const showAddForm = () => {
		setCurrentCourse(undefined);
		setIsModalVisible(true);
	};

	const showEditForm = (course: Course) => {
		setCurrentCourse(course);
		setIsModalVisible(true);
	};

	const handleFormSubmit = (values: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>) => {
		setConfirmLoading(true);

		if (currentCourse?.id) {
			updateCourse(currentCourse.id, values);
		} else {
			addCourse(values);
		}

		setConfirmLoading(false);
		setIsModalVisible(false);
		fetchCourses();
	};

	const showDeleteConfirm = (course: Course) => {
		confirm({
			title: 'Bạn có chắc chắn muốn xóa khóa học này?',
			icon: <ExclamationCircleOutlined />,
			content: `Khóa học: ${course.name}`,
			okText: 'Xóa',
			okType: 'danger',
			cancelText: 'Hủy',
			onOk() {
				if (deleteCourse(course.id)) {
					fetchCourses();
				}
			},
		});
	};

	// Cấu hình các cột cho bảng
	const columns: ColumnsType<Course> = [
		{
			title: 'ID',
			dataIndex: 'id',
			key: 'id',
			width: 80,
		},
		{
			title: 'Tên khóa học',
			dataIndex: 'name',
			key: 'name',
			render: (text: string, record: Course) => <a onClick={() => showEditForm(record)}>{text}</a>,
		},
		{
			title: 'Giảng viên',
			dataIndex: 'instructorId',
			key: 'instructor',
			render: (instructorId: string) => getInstructorNameById(instructorId),
		},
		{
			title: 'Số lượng học viên',
			dataIndex: 'studentCount',
			key: 'studentCount',
			sorter: (a: Course, b: Course) => a.studentCount - b.studentCount,
		},
		{
			title: 'Trạng thái',
			dataIndex: 'status',
			key: 'status',
			render: (status: CourseStatus) => {
				let color = '';
				switch (status) {
					case CourseStatus.ACTIVE:
						color = 'green';
						break;
					case CourseStatus.FINISHED:
						color = 'blue';
						break;
					case CourseStatus.PAUSED:
						color = 'orange';
						break;
					default:
						color = 'default';
				}
				return <Tag color={color}>{status}</Tag>;
			},
		},
		{
			title: 'Thao tác',
			key: 'action',
			width: 150,
			render: (_: any, record: Course) => (
				<Space size='small'>
					<Button type='primary' icon={<EditOutlined />} size='small' onClick={() => showEditForm(record)} />
					<Button
						danger
						icon={<DeleteOutlined />}
						size='small'
						onClick={() => showDeleteConfirm(record)}
						disabled={record.studentCount > 0}
						title={record.studentCount > 0 ? 'Không thể xóa khóa học đã có học viên' : ''}
					/>
				</Space>
			),
		},
	];

	return (
		<div style={{ padding: '20px' }}>
			<Card>
				<Title level={2}>Quản lý khóa học</Title>

				{/* Thanh tìm kiếm và bộ lọc */}
				<Row gutter={16} style={{ marginBottom: 16 }}>
					<Col xs={24} sm={8}>
						<Input
							placeholder='Tìm kiếm theo tên khóa học'
							value={searchText}
							onChange={(e) => setSearchText(e.target.value)}
							prefix={<SearchOutlined />}
							allowClear
						/>
					</Col>
					<Col xs={24} sm={6}>
						<Select
							placeholder='Lọc theo giảng viên'
							style={{ width: '100%' }}
							allowClear
							onChange={(value) => setFilterInstructor(value)}
						>
							{INSTRUCTORS.map((instructor) => (
								<Option key={instructor.id} value={instructor.id}>
									{instructor.name}
								</Option>
							))}
						</Select>
					</Col>
					<Col xs={24} sm={6}>
						<Select
							placeholder='Lọc theo trạng thái'
							style={{ width: '100%' }}
							allowClear
							onChange={(value) => setFilterStatus(value)}
						>
							{Object.values(CourseStatus).map((status) => (
								<Option key={status} value={status}>
									{status}
								</Option>
							))}
						</Select>
					</Col>
					<Col xs={24} sm={4}>
						<Button type='primary' icon={<PlusOutlined />} onClick={showAddForm} style={{ width: '100%' }}>
							Thêm khóa học
						</Button>
					</Col>
				</Row>

				{/* Bảng danh sách khóa học */}
				<Table
					columns={columns}
					dataSource={filteredCourses}
					rowKey='id'
					loading={loading}
					pagination={{ pageSize: 10 }}
				/>

				{/* Form thêm/sửa khóa học */}
				<CourseForm
					visible={isModalVisible}
					initialValues={currentCourse}
					onCancel={() => setIsModalVisible(false)}
					onSubmit={handleFormSubmit}
					confirmLoading={confirmLoading}
				/>
			</Card>
		</div>
	);
};

export default CourseList;
