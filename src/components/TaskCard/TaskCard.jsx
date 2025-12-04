import './TaskCard.css';

export function TaskCard({ 
  task, 
  isDragging = false,
  isGhost = false,
  onDragStart,
  onDragEnd,
}) {
  const { id, title, description, priority, tags, assignee, dueDate } = task;

  const cardClasses = [
    'task-card',
    isDragging && 'task-card--dragging',
    isGhost && 'task-card--ghost'
  ].filter(Boolean).join(' ');

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div 
      className={cardClasses}
      draggable
      onDragStart={(e) => onDragStart?.(e, task)}
      onDragEnd={onDragEnd}
      data-task-id={id}
    >
      <div className="task-card__header">
        <h4 className="task-card__title">{title}</h4>
        {priority && (
          <span className={`task-card__priority task-card__priority--${priority}`}>
            {priority}
          </span>
        )}
      </div>

      {description && (
        <p className="task-card__description">{description}</p>
      )}

      <div className="task-card__footer">
        <div className="task-card__tags">
          {tags?.map((tag, index) => (
            <span key={index} className="task-card__tag">{tag}</span>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {dueDate && (
            <span className="task-card__due">
              <svg className="task-card__due-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              {dueDate}
            </span>
          )}
          {assignee && (
            <div className="task-card__assignee" title={assignee}>
              {getInitials(assignee)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
