import { useState } from 'react';
import { TaskCard } from '../TaskCard';
import './KanbanColumn.css';

export function KanbanColumn({ 
  column, 
  tasks, 
  onDragStart,
  onDragEnd,
  onDragOver,
  onDrop,
  onAddTask,
  isDragOver = false
}) {
  const [isAddBtnHovered, setIsAddBtnHovered] = useState(false);
  const { id, title, status } = column;

  const getIndicatorClass = () => {
    switch (status) {
      case 'todo': return 'kanban-column__indicator--todo';
      case 'in-progress': return 'kanban-column__indicator--in-progress';
      case 'review': return 'kanban-column__indicator--review';
      case 'done': return 'kanban-column__indicator--done';
      default: return '';
    }
  };

  return (
    <div className="kanban-column">
      <div className="kanban-column__header">
        <div className="kanban-column__header-left">
          <div className={`kanban-column__indicator ${getIndicatorClass()}`} />
          <h3 className="kanban-column__title">{title}</h3>
          <span className="kanban-column__count">{tasks.length}</span>
        </div>
        <div className="kanban-column__actions">
          <button className="kanban-column__action-btn" title="More options">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="1" />
              <circle cx="12" cy="5" r="1" />
              <circle cx="12" cy="19" r="1" />
            </svg>
          </button>
        </div>
      </div>

      <div 
        className={`kanban-column__body ${isDragOver ? 'kanban-column__body--drag-over' : ''}`}
        onDragOver={onDragOver}
        onDrop={(e) => onDrop?.(e, id)}
        data-column-id={id}
      >
        {tasks.length === 0 ? (
          <div className="kanban-column__empty">
            <div className="kanban-column__empty-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <line x1="12" y1="8" x2="12" y2="16" />
                <line x1="8" y1="12" x2="16" y2="12" />
              </svg>
            </div>
            <p className="kanban-column__empty-text">No tasks yet</p>
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard 
              key={task.id} 
              task={task}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
            />
          ))
        )}
      </div>

      <div className="kanban-column__footer">
        <button 
          className="kanban-column__add-btn"
          onClick={() => onAddTask?.(id)}
          style={{
            transform: isAddBtnHovered ? 'scale(1.02)' : 'scale(1)',
          }}
          onMouseEnter={() => setIsAddBtnHovered(true)}
          onMouseLeave={() => setIsAddBtnHovered(false)}
        >
          {/* Glow effect layers */}
          <div className="kanban-column__glow-outer" />
          <div className="kanban-column__glow-inner" />
          <div className="kanban-column__glow-center" />

          {/* Content */}
          <span className="kanban-column__add-content">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <span>Add Task</span>
          </span>
        </button>
      </div>
    </div>
  );
}
