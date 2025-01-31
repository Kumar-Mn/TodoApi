import React, { useEffect, useState } from "react";
import axios from "axios";
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");

  // Fetch tasks from the API
  useEffect(() => {
    axios.get("http://localhost:5000/api/tasks")
      .then(response => setTasks(response.data))
      .catch(error => console.error("There was an error fetching the tasks!", error));
  }, []);

  // Toggle task completion status
  const toggleTaskCompletion = (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
    );
    setTasks(updatedTasks);
    // Update task on the backend
    axios.put(`http://localhost:5000/api/tasks/${id}`, {
      isCompleted: !tasks.find(task => task.id === id).isCompleted
    }).catch(error => console.error("There was an error updating the task!", error));
  };

  // Filter tasks based on status
  const filteredTasks = tasks.filter(task => {
    if (filter === "completed") return task.isCompleted;
    if (filter === "pending") return !task.isCompleted;
    return true; // "all"
  });

  // Add a new task
  const addTask = () => {
    if (!newTask) return;
    const newTaskObj = {
      name: newTask,
      isCompleted: false
    };
    setTasks([...tasks, newTaskObj]);
    axios.post("http://localhost:5000/api/tasks", newTaskObj)
      .then(response => setNewTask(""))
      .catch(error => console.error("There was an error adding the task!", error));
  };

  return (
    <div>
      <h1>To-Do Application</h1>
      <div>
        <input 
          type="text" 
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New Task"
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      
      <div>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
      </div>

      <ul>
        {filteredTasks.map(task => (
          <li key={task.id}>
            <span style={{ textDecoration: task.isCompleted ? "line-through" : "none" }}>
              {task.name}
            </span>
            <button onClick={() => toggleTaskCompletion(task.id)}>
              {task.isCompleted ? "Undo" : "Complete"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
