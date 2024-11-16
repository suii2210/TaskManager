import React, { useState, useEffect } from "react";
import "./TaskManager.css"; // Import the external CSS file

interface Task {
  id: number;
  title: string;
  time: string;
  type: "Important" | "Planned" | "None";
}



const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<{ title: string; time: string; type: "Important" | "Planned" | "None" }>({
    title: "",
    time: "",
    type: "None",
  });


  
  // Load tasks from localStorage when the component mounts
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever tasks state changes
  useEffect(() => {
    if (tasks.length > 0) { // Save to localStorage only if tasks are not empty
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = () => {
    if (newTask.title.trim() === "" || newTask.time.trim() === "") return;

    const taskToAdd: Task = {
      id: Date.now(),
      title: newTask.title,
      time: newTask.time,
      type: newTask.type,
    };

    setTasks((prevTasks) => [...prevTasks, taskToAdd]);
    setNewTask({ title: "", time: "", type: "None" });
  };

  const deleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <div className="task-manager-container">
      <div className="task-manager-card">
        <h1 className="task-manager-header">Task Manager</h1>

        {/* New Task Form */}
        <div className="task-manager-form">
          <input
            type="text"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            placeholder="Task Title"
            className="task-input"
          />
          <input
            type="time"
            value={newTask.time}
            onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
            className="task-input"
          />
          <select
            value={newTask.type}
            onChange={(e) => setNewTask({ ...newTask, type: e.target.value as Task["type"] })}
            className="task-select"
          >
            <option value="None">None</option>
            <option value="Important">Important</option>
            <option value="Planned">Planned</option>
          </select>
          <button onClick={addTask} className="task-button">
            Add Task
          </button>
        </div>

        {/* Task List */}
        <div className="task-list">
          <h2 className="task-list-header">Your Tasks</h2>
          <ul>
            {tasks.map((task) => (
              <li key={task.id} className="task-item">
                <div className="task-item-content">
                  <h3>{task.title}</h3>
                  <p>
                    {task.time} - <span className="task-type">{task.type}</span>
                  </p>
                </div>
                <button onClick={() => deleteTask(task.id)} className="task-delete-button">
                  Delete
                </button>
              </li>
            ))}
          </ul>
          {tasks.length === 0 && <p className="no-tasks-message">No tasks yet! Add some tasks above.</p>}
        </div>
      </div>
    </div>
  );
};

export default TaskManager;
