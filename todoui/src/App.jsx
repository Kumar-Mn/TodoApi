import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [selectedValue, setSelectedValue] = useState(""); // **Single field for search & add**
    //const [filter, setFilter] = useState("all");

    // Fetch tasks from the API
    useEffect(() => {
        axios.get("https://localhost:7166/api/Tasks")
            .then(response => setTasks(response.data))
            .catch(error => console.error("Error fetching tasks!", error));
    }, []);

    // Toggle task completion status
    const toggleTaskCompletion = (taskToUpdate) => {
        
        axios.put(`https://localhost:7166/api/tasks/${taskToUpdate.id}`, {
            isCompleted: taskToUpdate.isCompleted,
            name: taskToUpdate.name
        }).then(() => {
            const updatedTasks = tasks.map(task =>
                task.id === taskToUpdate.id ? { ...task, isCompleted: !task.isCompleted } : task
            );
            setTasks(updatedTasks);
        }).catch(error => console.error("Error updating task!", error));
    };

    //// Add a new task
    //const addTask = () => {
    //    if (!inputText.trim()) return; // Prevent empty tasks

    //    const newTaskObj = {
    //        id: Math.floor(Math.random() * 10000),
    //        name: inputText,
    //        isCompleted: false
    //    };

    //    setTasks([...tasks, newTaskObj]); // Add to UI instantly
    //    axios.post("https://localhost:7166/api/tasks", newTaskObj)
    //        .then(() => setInputText(""))
    //        .catch(error => console.error("Error adding task!", error));
    //};

    const getFilteredTasks = () => {
        console.log("came")
        axios.get("https://localhost:7166/api/tasks?status=" + selectedValue)
            .then(response => setTasks(response.data))
            .catch(error => console.error("Error adding task!", error));
    };

    return (
        <div className="todo-input-container">
            <h1 className="title">To-Do Application</h1>

            {/* **Search & Add Task in One Field** */}
            <div className="input-wrapper">
                <select value={selectedValue} onChange={(e) => setSelectedValue(e.target.value)}>
                    <option value="">All</option>
                    <option value="false">Pending</option>
                    <option value="true">Completed</option>
                </select>
                <button className="add-task-btn" onClick={getFilteredTasks}>Filter</button>
            </div>

            {/* **Task Table** */}
            <div className="table-container">
                <table className="task-table">
                    <thead>
                        <tr>
                            <th>Task Name</th>
                            <th>Completion Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task) => (
                            <tr key={task.id}>
                                <td>{task.name}</td>
                                <td>
                                    <span className={`status ${task.isCompleted ? "completed-status" : "pending-status"}`}>
                                        {task.isCompleted ? "Completed" : "Pending"}
                                    </span>
                                </td>
                                <td>
                                    <button className={`btn ${task.isCompleted ? "undo-btn" : "complete-btn"}`} onClick={() => toggleTaskCompletion(task)}>
                                        {task.isCompleted ? "Undo" : "Complete"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default App;
