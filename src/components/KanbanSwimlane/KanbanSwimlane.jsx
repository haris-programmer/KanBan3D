import { useState } from 'react';
import { KanbanColumn } from '../KanbanColumn';
import './KanbanSwimlane.css';

export function KanbanSwimlane({ 
  swimlane, 
  columns, 
  tasks, 
  onDragStart,
  onDragEnd,
  onDragOver,
  onDrop,
  onAddTask,
  dragOverColumn
}) {
  const { id, name } = swimlane;
  const [isCollapsed, setIsCollapsed] = useState(false);

  const getTasksForColumn = (columnId) => {
    return tasks.filter(task => task.columnId === columnId && task.swimlaneId === id);
  };

  const handleAddTaskForSwimlane = (columnId) => {
    onAddTask(columnId, id);
  };

  return (
    <div className="kanban-swimlane">
      {/* Swimlane Header */}
      <div className="kanban-swimlane__header">
        <div className="kanban-swimlane__header-content">
          <button 
            className="kanban-swimlane__toggle"
            onClick={() => setIsCollapsed(!isCollapsed)}
            title={isCollapsed ? 'Expand' : 'Collapse'}
          >
            <svg 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              style={{
                transform: isCollapsed ? 'rotate(-90deg)' : 'rotate(0deg)',
                transition: 'transform 150ms ease'
              }}
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          <h2 className="kanban-swimlane__title">{name}</h2>
          <span className="kanban-swimlane__task-count">
            {tasks.filter(t => t.swimlaneId === id).length}
          </span>
        </div>
      </div>

      {/* Swimlane Columns Container */}
      {!isCollapsed && (
        <div className="kanban-swimlane__columns">
          {columns.map(column => (
            <KanbanColumn
              key={column.id}
              column={column}
              tasks={getTasksForColumn(column.id)}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
              onDragOver={onDragOver}
              onDrop={onDrop}
              onAddTask={handleAddTaskForSwimlane}
              isDragOver={dragOverColumn === column.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
