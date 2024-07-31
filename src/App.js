import React, { useState, useEffect } from 'react';
import './App.css'; // Import the CSS file
import tasksData from './tasks.json';
import Task from './AppTask';

function App() {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setTasks(tasksData);
  }, []);

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const updateTask = (updatedTask) => {
    setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
  };

  const toggleTaskComplete = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="app-container">
      <h1>Todo List</h1>
      <input 
        type="text" 
        placeholder="Search tasks..." 
        value={searchQuery} 
        onChange={handleSearch} 
      />
      <button onClick={() => addTask({ id: Date.now(), title: 'New Task', description: '...', completed: false, timestamp: new Date().toISOString() })}>
        Add Task
      </button>
      <ul>
        {filteredTasks.map(task => (
          <Task 
            key={task.id} 
            task={task} 
            updateTask={updateTask} 
            toggleTaskComplete={toggleTaskComplete}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;

