import React, { useState } from "react";
import {
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import "./style.css";
import { format } from "date-fns";
const ToDoItem = (props) => {
  const dueDateFormat = format(new Date(props.deadline), "dd MM yyyy");
  // State để chuyển đổi giữa chế độ xem và chế độ chỉnh sửa
  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewConTent] = useState(props.content);
  const [newDeadline, setNewDeadline] = useState(dueDateFormat);

  // Hàm lưu công việc mới khi chỉnh sửa
  const saveTask = () => {
    const editTask = {
      content: newContent,
      deadline: newDeadline,
    };
    props.updateTask(props.id, editTask);
    setIsEditing(false);
  };

  return (
    <div className="ToDoItem">
      {props.completed ? (
        <CheckCircleOutlined
          checked={props.completed}
          onClick={() => props.toggleCompletion(props.id)}
          style={{
            marginRight: "5px",
            cursor: "pointer",
            color: "#28a745",
          }}
        />
      ) : (
        <input
          type="checkbox"
          checked={props.completed}
          onChange={() => props.toggleCompletion(props.id)}
        />
      )}
      <div
        className="ItemContent"
        style={{ textDecoration: props.completed ? "line-through" : "none" }}
      >
        {/* Chế độ chỉnh sửa */}
        {isEditing ? (
          <>
            <input
              type="text"
              value={newContent}
              onChange={(e) => setNewConTent(e.target.value)}
              style={{ marginRight: "10px" }}
            />
            <input
              type="date"
              value={newDeadline}
              onChange={(e) => setNewDeadline(e.target.value)}
              style={{ marginRight: "10px" }}
            />
            <button onClick={saveTask}>Enter</button>
          </>
        ) : (
          <>
            <p className="Content">{newContent}</p>
            <p className="Deadline">{newDeadline}</p>
          </>
        )}
      </div>
      <div className="Action">
        {/* Chỉnh sửa */}
        <button>
          <EditOutlined
            onClick={() => setIsEditing(true)}
            style={{ marginRight: "5px", cursor: "pointer" }}
          />
        </button>
        <button onClick={() => props.deleteTask(props.id)}>
          <DeleteOutlined style={{ cursor: "pointer", color: "#d1453b" }} />
        </button>
      </div>
    </div>
  );
};

export default ToDoItem;
