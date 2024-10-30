import React, { useState } from "react";
import ToDoItem from "./ToDoItem";
import { PlusCircleOutlined } from "@ant-design/icons";

const ToDoList = () => {
  // Quản lý danh sách công việc bằng state
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Gửi email nộp bài tập về nhà",
      dueDate: "Hôm nay",
      completed: false,
    },
    {
      id: 2,
      title: "Học từ vựng tiếng anh mỗi ngày",
      dueDate: "Ngày mai",
      completed: false,
    },
    {
      id: 3,
      title: "Viết tiểu luận môn Triết học",
      dueDate: "Tuần tới",
      completed: false,
    },
  ]);

  // Quản lý công việc mới của ô nhập liệu
  const [newTask, setNewTask] = useState("");

  // Thêm một công việc mới
  function addTask() {
    if (newTask.trim() !== "") {
      setTasks([
        ...tasks,
        {
          id: tasks.length + 1,
          title: newTask,
          dueDate: "Chưa đặt",
          completed: false,
        },
      ]);
      setNewTask(""); // Reset ô nhập liệu
    }
  }

  // Xóa một công việc
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Đánh dấu hoàn thành
  const toggleCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Cập nhật công việc
  const updateTask = (id, newTitle) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, title: newTitle } : task
      )
    );
  };

  return (
    <div className="ToDoList" style={{ marginLeft: "10px" }}>
      <h1>My work 🎯</h1>
      <div>
        {/* Hiển thị danh sách công việc */}
        {tasks.map((task) => (
          <ToDoItem
            key={task.id}
            id={task.id}
            title={task.title}
            dueDate={task.dueDate}
            completed={task.completed}
            deleteTask={deleteTask}
            toggleCompletion={toggleCompletion}
            updateTask={updateTask}
          />
        ))}
      </div>

      {/* Input để thêm công việc mới */}
      <div style={{ marginTop: "5px" }}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Nhập nhiệm vụ mới..."
          style={{ padding: "5px", marginRight: "5px" }}
        />
        <PlusCircleOutlined
          onClick={addTask}
          style={{ fontSize: "20px", color: "#d1453b", cursor: "pointer" }}
        />{" "}
        Add Task
      </div>
    </div>
  );
};

export default ToDoList;
