import { useState } from 'react';
import { KanbanSwimlane } from '../KanbanSwimlane';
import { Button } from '../Button';
import { ThemeToggle } from '../ThemeToggle';
import './KanbanBoard.css';

// Demo data
const initialColumns = [
  { id: 'todo', title: 'To Do', status: 'todo' },
  { id: 'in-progress', title: 'In Progress', status: 'in-progress' },
  { id: 'review', title: 'Review', status: 'review' },
  { id: 'done', title: 'Done', status: 'done' },
];

const initialSwimlanes = [
  { id: 'frontend', name: 'Frontend Team' },
  { id: 'backend', name: 'Backend Team' },
  { id: 'devops', name: 'DevOps Team' },
];

const initialTasks = [
  {
    id: '1',
    columnId: 'todo',
    swimlaneId: 'frontend',
    title: 'Design new dashboard layout',
    description: 'Create wireframes and mockups for the analytics dashboard.',
    priority: 'high',
    tags: ['Design', 'UI/UX'],
    assignee: 'Alex Morgan',
    dueDate: 'Dec 8',
  },
  {
    id: '2',
    columnId: 'todo',
    swimlaneId: 'backend',
    title: 'Implement user authentication',
    priority: 'high',
    tags: ['Backend', 'Security'],
    assignee: 'Jordan Lee',
    dueDate: 'Dec 10',
  },
  {
    id: '3',
    columnId: 'todo',
    swimlaneId: 'backend',
    title: 'Write API documentation',
    description: 'Document all REST endpoints with examples.',
    priority: 'medium',
    tags: ['Docs'],
    assignee: 'Sam Chen',
  },
  {
    id: '4',
    columnId: 'in-progress',
    swimlaneId: 'frontend',
    title: 'Build notification system',
    description: 'Real-time notifications using WebSockets.',
    priority: 'high',
    tags: ['Feature', 'Backend'],
    assignee: 'Alex Morgan',
    dueDate: 'Dec 6',
  },
  {
    id: '5',
    columnId: 'in-progress',
    swimlaneId: 'devops',
    title: 'Optimize database queries',
    priority: 'medium',
    tags: ['Performance'],
    assignee: 'Jordan Lee',
  },
  {
    id: '6',
    columnId: 'review',
    swimlaneId: 'frontend',
    title: 'Mobile responsive fixes',
    description: 'Fix layout issues on tablet and mobile views.',
    priority: 'medium',
    tags: ['Bug', 'CSS'],
    assignee: 'Sam Chen',
    dueDate: 'Dec 5',
  },
  {
    id: '7',
    columnId: 'done',
    swimlaneId: 'backend',
    title: 'Set up CI/CD pipeline',
    priority: 'low',
    tags: ['DevOps'],
    assignee: 'Jordan Lee',
  },
  {
    id: '8',
    columnId: 'done',
    swimlaneId: 'frontend',
    title: 'Create component library',
    description: 'Build reusable UI components with Storybook.',
    priority: 'low',
    tags: ['UI', 'Components'],
    assignee: 'Alex Morgan',
  },
];

export function KanbanBoard() {
  const [tasks, setTasks] = useState(initialTasks);
  const [draggedTask, setDraggedTask] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);

  const handleDragStart = (e, task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', task.id);
  };

  const handleDragEnd = () => {
    setDraggedTask(null);
    setDragOverColumn(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    
    const columnId = e.currentTarget.dataset.columnId;
    if (columnId !== dragOverColumn) {
      setDragOverColumn(columnId);
    }
  };

  const handleDrop = (e, columnId) => {
    e.preventDefault();
    
    if (draggedTask) {
      setTasks(tasks.map(task => 
        task.id === draggedTask.id 
          ? { ...task, columnId } 
          : task
      ));
    }
    
    setDraggedTask(null);
    setDragOverColumn(null);
  };

  const handleAddTask = (columnId, swimlaneId) => {
    const newTask = {
      id: `task-${Date.now()}`,
      columnId,
      swimlaneId,
      title: 'New Task',
      description: 'Click to edit this task.',
      priority: 'medium',
      tags: [],
      assignee: 'Unassigned',
    };
    setTasks([...tasks, newTask]);
  };

  const getTasksForColumn = (columnId) => {
    return tasks.filter(task => task.columnId === columnId);
  };

  return (
    <div className="kanban-board">
      {/* Header */}
      <header className="kanban-header">
        <div className="kanban-header__left">
          <div className="kanban-header__logo">
            <div className="kanban-header__logo-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
            </div>
            <span className="kanban-header__logo-text">Kanban3D</span>
          </div>
          <span className="kanban-header__project">Project Alpha</span>
        </div>

        <div className="kanban-header__right">
          <div className="kanban-search">
            <svg className="kanban-search__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input 
              type="text" 
              className="kanban-search__input" 
              placeholder="Search tasks..."
            />
          </div>
          
          <ThemeToggle />

          <Button variant="primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            New Task
          </Button>

          <div className="kanban-avatar" title="User Profile">
            JD
          </div>
        </div>
      </header>

      {/* Board */}
      <main className="kanban-main">
        {initialSwimlanes.map(swimlane => (
          <KanbanSwimlane
            key={swimlane.id}
            swimlane={swimlane}
            columns={initialColumns}
            tasks={tasks}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onAddTask={handleAddTask}
            dragOverColumn={dragOverColumn}
          />
        ))}
      </main>
    </div>
  );
}
