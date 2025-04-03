import React, { useEffect } from 'react';
import { Form, Input, Select, InputNumber, Button, Space, Modal } from 'antd';
import { Course, CourseStatus, INSTRUCTORS } from '@/types';
import TinyEditor from '../../components/TinyEditor/index';
import { useModel } from 'umi';
interface CourseFormProps {
	visible: boolean;
	initialValues?: Partial<Course>;
	onCancel: () => void;
	onSubmit: (values: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>) => void;
	confirmLoading: boolean;
}

const { Option } = Select;

const CourseForm: React.FC<CourseFormProps> = ({ visible, initialValues, onCancel, onSubmit, confirmLoading }) => {
	const [form] = Form.useForm();
	const isEdit = !!initialValues?.id;

	useEffect(() => {
		if (visible && initialValues) {
			form.setFieldsValue(initialValues);
		} else {
			form.resetFields();
		}
	}, [visible, initialValues, form]);

	const handleSubmit = () => {
		form.validateFields().then((values) => {
			onSubmit(values);
		});
	};

	return (
		<Modal
			title={isEdit ? 'Chỉnh sửa khóa học' : 'Thêm khóa học mới'}
			visible={visible}
			onCancel={onCancel}
			footer={[
				<Button key='cancel' onClick={onCancel}>
					Hủy
				</Button>,
				<Button key='submit' type='primary' loading={confirmLoading} onClick={handleSubmit}>
					{isEdit ? 'Cập nhật' : 'Thêm mới'}
				</Button>,
			]}
			width={700}
			destroyOnClose
		>
			<Form
				form={form}
				layout='vertical'
				initialValues={{
					name: '',
					instructorId: '',
					studentCount: 0,
					status: CourseStatus.ACTIVE,
					description: '',
					...initialValues,
				}}
			>
				<Form.Item
					name='name'
					label='Tên khóa học'
					rules={[
						{ required: true, message: 'Vui lòng nhập tên khóa học' },
						{ max: 100, message: 'Tên khóa học không được vượt quá 100 ký tự' },
					]}
				>
					<Input placeholder='Nhập tên khóa học' />
				</Form.Item>

				<Form.Item
					name='instructorId'
					label='Giảng viên'
					rules={[{ required: true, message: 'Vui lòng chọn giảng viên' }]}
				>
					<Select placeholder='Chọn giảng viên'>
						{INSTRUCTORS.map((instructor) => (
							<Option key={instructor.id} value={instructor.id}>
								{instructor.name}
							</Option>
						))}
					</Select>
				</Form.Item>

				<Form.Item
					name='studentCount'
					label='Số lượng học viên'
					rules={[
						{ required: true, message: 'Vui lòng nhập số lượng học viên' },
						{ type: 'number', min: 0, message: 'Số lượng học viên không được âm' },
					]}
				>
					<InputNumber min={0} style={{ width: '100%' }} />
				</Form.Item>

				<Form.Item name='status' label='Trạng thái' rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}>
					<Select placeholder='Chọn trạng thái'>
						{Object.values(CourseStatus).map((status) => (
							<Option key={status} value={status}>
								{status}
							</Option>
						))}
					</Select>
				</Form.Item>

				<Form.Item
					name='description'
					label='Mô tả khóa học'
					rules={[{ required: true, message: 'Vui lòng nhập mô tả khóa học' }]}
				>
					<TinyEditor />
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default CourseForm;
