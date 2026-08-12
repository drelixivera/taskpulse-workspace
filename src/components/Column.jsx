import React from 'react';
import TaskCard from './TaskCard';

function Column({
  column,
  tasks,
  teamMembers,
  onEditTask,
  onDeleteTask,
  onToggleSubtask,
  onDeleteColumn
}) {
  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3" style={{ minWidth: '310px' }}>
      <div className="card bg-body-tertiary border shadow-sm rounded-4 overflow-hidden h-100">
        
        {/* Column Header */}
        <div className="card-header bg-transparent border-0 pt-3 px-3 pb-2 d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-2">
            <h5 className="fw-bold mb-0 text-body fs-6">{column.title}</h5>
            <span className="badge bg-body border text-body-secondary rounded-pill px-2 py-0.5 fw-semibold" style={{ fontSize: '0.75rem' }}>
              {tasks.length}
            </span>
          </div>

          <button
            type="button"
            className="btn btn-sm btn-link text-muted p-0 opacity-50 opacity-100-hover"
            title="Delete Column"
            onClick={() => onDeleteColumn(column.id)}
          >
            <i className="bi bi-trash3 fs-6"></i>
          </button>
        </div>

        {/* Column Content Body */}
        <div className="card-body p-2.5 column-body" style={{ minHeight: '480px' }}>
          {tasks.length === 0 ? (
            <div className="text-center text-muted py-5 border border-dashed rounded-3 bg-body">
              <i className="bi bi-inbox fs-3 text-secondary d-block mb-1"></i>
              <small className="fw-medium">No tasks in this stage</small>
            </div>
          ) : (
            tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                teamMembers={teamMembers}
                onEdit={onEditTask}
                onDelete={onDeleteTask}
                onToggleSubtask={onToggleSubtask}
              />
            ))
          )}
        </div>

      </div>
    </div>
  );
}

export default Column;