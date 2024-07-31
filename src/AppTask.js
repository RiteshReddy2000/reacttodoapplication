import React, { useState } from 'react';
import './App.css'; // Import the CSS file

function Task({ task, updateTask, toggleTaskComplete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);
  const [newDescription, setNewDescription] = useState(task.description);

  const handleUpdate = () => {
    updateTask({ ...task, title: newTitle, description: newDescription });
    setIsEditing(false);
  };

  return (
    <li className={`task ${isEditing ? 'editing' : ''}`}>
      <input 
        type="checkbox" 
        checked={task.completed} 
        onChange={() => toggleTaskComplete(task.id)} 
      />
      {isEditing ? (
        <div className="task-details">
          <input 
            type="text" 
            value={newTitle} 
            onChange={(e) => setNewTitle(e.target.value)} 
          />
          <textarea 
            value={newDescription} 
            onChange={(e) => setNewDescription(e.target.value)} 
          />
          <button onClick={handleUpdate}>Save</button>
        </div>
      ) : (
        <div className="task-details">
          <span>{task.title}</span>
          <p>{task.description}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => toggleTaskComplete(task.id)}>
            {task.completed ? 'Undo' : 'Complete'}
          </button>
        </div>
      )}
      <div>{new Date(task.timestamp).toLocaleString()}</div>
    </li>
  );
}

export default Task;