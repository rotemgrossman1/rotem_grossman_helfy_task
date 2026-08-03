import React from 'react';
import '../styles/TaskItem.css';

export default function TaskItem({ task }) {
  return (
    <div className="task-item">
      <div className="task-header">
        <h3>{task.title}</h3>
        <span className={`priority-badge ${task.priority}`}>
          {task.priority}
        </span>
      </div>
      
      <p className="task-desc">{task.description}</p>
      
      <div className="task-footer">
        <span>Status: {task.completed ? 'Completed' : 'Pending'}</span>
        <small>{new Date(task.createdAt).toLocaleDateString()}</small>
      </div>
    </div>
  );
}