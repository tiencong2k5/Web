import React, { useState } from 'react';
import './style.css';
import { EditOutlined, DeleteOutlined, CheckOutlined } from '@ant-design/icons';

const ToDoItem = (props) => {
  // State để chuyển đổi giữa chế độ xem và chế độ chỉnh sửa
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(props.title);

  // Hàm lưu công việc mới khi chỉnh sửa
  const saveTask = () => {
    props.updateTask(props.id, newTitle);
    setIsEditing(false);
  };

  return (
    <div className="ToDoItem">
      <input
        type="checkbox"
        checked={props.completed}
        onChange={() => props.toggleCompletion(props.id)}
      />
      <div className='ItemContent' style={{ textDecoration: props.completed ? 'line-through' : 'none' }}>
        {/* Chế độ chỉnh sửa */}
        {isEditing ? (
          <input 
            type="text" 
            value={newTitle} 
            onChange={(e) => setNewTitle(e.target.value)} 
            onBlur={saveTask} 
            style={{ marginRight: '10px' }} 
          />
        ) : (
          <p className='Title'>{props.title}</p>
        )}
        <p className='DueDate'>{props.dueDate}</p>
      </div>
      <div className='Action'>
        {/* Chỉnh sửa */}
        {isEditing ? (
          <CheckOutlined onClick={saveTask} style={{ marginRight: '5px', cursor: 'pointer', color: '#28a745' }} />
        ) : (
          <EditOutlined onClick={() => setIsEditing(true)} style={{ marginRight: '5px', cursor: 'pointer' }} />
        )}
        {/* Xóa */}
        <DeleteOutlined onClick={() => props.deleteTask(props.id)} style={{ cursor: 'pointer', color: '#d1453b' }} />
      </div>
    </div>
  );
}

export default ToDoItem;
