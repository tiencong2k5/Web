import React, { useEffect } from "react";
import { useState } from "react";
import ToDoItem from "./ToDoItem";
import { PlusCircleOutlined } from "@ant-design/icons";
import axios from "axios";
// lấy icon từ thư viện ant-design

const ToDoList = () => {
  // Quản lí nhiệm vụ
  const [task, setTask] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/todos")
      .then((response) => {
        setTask(response.data);
      })
      .catch((error) => console.error("Lỗi khi tải dữ liệu:", error));
  }, [task]);
  //Hiển thị form
  const [showForm, setShowForm] = useState(false);

  //Thêm nhiệm vụ mới
  // khi bấm nút, màn hình sẽ hiển thị ra một trang input

  const handleShowForm = () => {
    setShowForm(true);
  };

  // nút hủy form

  const handleCloseForm = () => {
    setShowForm(false);
  };

  // Hàm thêm mới nhiệm vụ
  const addTask = (newTask) => {
    axios
      .post("http://localhost:3001/api/todos", newTask)
      .then((response) => {
        setTask((prevTasks) => [...prevTasks, response.data]);
      })
      .catch((error) => console.error("Lỗi khi thêm dữ liệu:", error));

    setShowForm(false); // Đóng form sau khi thêm nhiệm vụ
  };

  // Xóa nhiệm vụ
  const deleteTask = (id) => {
    axios
      .delete(`http://localhost:3001/api/todos/${id}`)
      .then(() => {
        setTask(task.filter((task) => task.id !== id));
      })
      .catch((error) => console.error("Lỗi khi xóa dữ liệu:", error));
  };
  //Sửa nhiệm vụ

  const updateTask = (id, editTask) => {
    axios
      .put(`http://localhost:3001/api/todos/${id}`, editTask)
      .then((response) => {
        setTask(task.map((item) => (item.id === id ? response.data : item)));
      })
      .catch((error) => console.error("Lỗi khi cập nhật dữ liệu:", error));
  };

  // Đánh dấu hoàn thành
  const toggleCompletion = (id) => {
    const taskToToggle = task.find((item) => item.id === id);
    const updatedTask = { ...taskToToggle, completed: !taskToToggle.completed };

    axios
      .put(`http://localhost:3001/api/todos/${id}`, updatedTask)
      .then((response) => {
        setTask(task.map((item) => (item.id === id ? response.data : item)));
      })
      .catch((error) => console.error("Lỗi khi cập nhật trạng thái:", error));
  };

  // Hàm Khôi Phục đánh dấu
  const restoreCompletion = (id) => {
    setTask(
      task.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  return (
    <div className="ToDoList" style={{ marginLeft: "10px" }}>
      <h1>My work 🎯</h1>
      <div>
        {/* {trong JSX khoog sử dụng vòng for mà sử dụng map}       */}
        {task.map((item) => (
          <ToDoItem
            key={item.id} // đặt thuộc tính key duy nhất cho các phần tử con trong danh sách
            id={item.id} // Thêm key cho mỗi phần tử
            content={item.content} // Cú pháp đúng để truyền props
            deadline={item.deadline}
            deleteTask={deleteTask}
            completed={item.completed}
            updateTask={updateTask}
            toggleCompletion={toggleCompletion}
            restoreCompletion={restoreCompletion}
          />
        ))}
      </div>
      <button
        style={{ marginTop: "10px" }}
        onClick={handleShowForm}
        className="show-form-button"
      >
        <PlusCircleOutlined
          style={{
            fontSize: "20px",
            color: "#d1453b",
            cursor: "pointer",
          }}
        />{" "}
        Add Task
      </button>
      {/* {hiển thị bảng thông tin nếu show form là true } */}
      {showForm && <TaskForm onClose={handleCloseForm} addTask={addTask} />}
    </div>
  );
};

// Component hiển thị bảng thông tin
function TaskForm({ onClose, addTask }) {
  // State quản lý nội dung của nhiệm vụ mới
  const [content, setContent] = useState("");
  const [deadline, setDeadline] = useState("");

  // Hàm xử lý khi nhấn nút lưu giá trị sẽ được truyền vào task
  const handleSave = () => {
    const newTask = {
      content: content,
      deadline: deadline,
    };
    // Thêm logic lưu thông tin vào state chính hoặc API tại đây
    addTask(newTask); // Thêm nhiệm vụ vào danh sách
    // setTask((prev) => [...prev, newTask]);
    setContent(""); // Xóa trắng nội dung sau khi thêm
    setDeadline("");
  };

  return (
    <div className="task-form" style={{ marginTop: "20px" }}>
      <h3>Thêm nhiệm vụ mới</h3>
      <div className="form- group" style={{ marginBottom: "10px" }}>
        <label>Nhiệm Vụ</label>
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)} // Cập nhật nội dung nhiệm vụ
          placeholder="Nhập tên nhiệm vụ..."
          style={{ marginLeft: "10px", width: "300px" }}
        />
      </div>
      <div className="form- group" style={{ marginBottom: "10px" }}>
        <label>Deadline</label>
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)} // Cập nhật deadline của nhiệm vụ
          placeholder="Nhập deadline..."
          style={{ marginLeft: "10px", width: "300px" }}
        />
      </div>
      <button
        onClick={handleSave}
        className="save-button"
        style={{ marginRight: "10px" }}
      >
        Lưu
      </button>
      <button onClick={onClose} className="cancel-button">
        Hủy
      </button>
    </div>
  );
}

export default ToDoList;
