import React, { useState } from 'react';

function TaskCard({ task, teamMembers, onEdit, onDelete, onToggleSubtask }) {
  const [showChecklist, setShowChecklist] = useState(false);

  const assignee = teamMembers.find((m) => m.id === task.assigneeId) || {
    name: 'Unassigned',
    avatar: null,
    color: 'bg-secondary-subtle text-secondary'
  };

  const subtasks = task.subtasks || [];
  const totalSubtasks = subtasks.length;
  const completedSubtasks = subtasks.filter((st) => st.completed).length;
  const progressPercent =
    totalSubtasks > 0 ? Math.round((completedSubtasks / totalSubtasks) * 100) : 0;

  const getPriorityBadgeClass = (priority) => {
    switch (priority) {
      case 'High':
        return 'badge-soft-danger';
      case 'Medium':
        return 'badge-soft-warning';
      case 'Low':
        return 'badge-soft-info';
      default:
        return 'bg-light text-dark';
    }
  };

  const getStatusDotClass = (priority) => {
    switch (priority) {
      case 'High':
        return 'status-dot-danger';
      case 'Medium':
        return 'status-dot-warning';
      case 'Low':
        return 'status-dot-info';
      default:
        return 'bg-secondary';
    }
  };

  return (
    <div className="card rounded-3 mb-3 task-card bg-body position-relative shadow-sm">
      <div className="card-body p-3">
        
        {/* Title and Action Buttons */}
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h6 className="fw-semibold text-body mb-0 me-2 lh-sm" style={{ fontSize: '0.925rem' }}>
            {task.title}
          </h6>
          
          <div className="d-flex gap-1">
            <button
              type="button"
              className="btn btn-sm btn-link text-muted p-0 px-1 opacity-50 opacity-100-hover"
              title="Edit Task Stage / Details"
              onClick={() => onEdit(task)}
            >
              <i className="bi bi-pencil"></i>
            </button>
            <button
              type="button"
              className="btn btn-sm btn-link text-muted p-0 px-1 opacity-50 opacity-100-hover text-danger-hover"
              title="Delete Task"
              onClick={() => onDelete(task.id)}
            >
              <i className="bi bi-trash"></i>
            </button>
          </div>
        </div>

        {/* Task Description */}
        {task.description && (
          <p className="text-secondary mb-3 text-truncate-2" style={{ fontSize: '0.825rem' }}>
            {task.description}
          </p>
        )}

        {/* Subtask Progress Section */}
        {totalSubtasks > 0 && (
          <div className="mb-3 bg-body-tertiary p-2 rounded-2 border border-secondary-subtle">
            <div className="d-flex justify-content-between align-items-center mb-1.5">
              <button
                type="button"
                className="btn btn-link p-0 text-decoration-none text-secondary d-flex align-items-center gap-1"
                style={{ fontSize: '0.75rem' }}
                onClick={() => setShowChecklist(!showChecklist)}
              >
                <i className={`bi bi-chevron-${showChecklist ? 'down' : 'right'}`}></i>
                <i className="bi bi-check2-square me-0.5"></i>
                Subtasks ({completedSubtasks}/{totalSubtasks})
              </button>
              <span className="fw-semibold text-secondary" style={{ fontSize: '0.725rem' }}>
                {progressPercent}%
              </span>
            </div>

            <div className="progress" style={{ height: '4px' }}>
              <div
                className={`progress-bar ${progressPercent === 100 ? 'bg-success' : 'bg-primary'}`}
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>

            {showChecklist && (
              <div className="mt-2 pt-2 border-top border-secondary-subtle">
                {subtasks.map((st) => (
                  <div key={st.id} className="form-check mb-1">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`st-${st.id}`}
                      checked={st.completed}
                      onChange={() => onToggleSubtask(task.id, st.id)}
                    />
                    <label
                      className={`form-check-label ${st.completed ? 'text-decoration-line-through text-muted' : 'text-body'}`}
                      htmlFor={`st-${st.id}`}
                      style={{ fontSize: '0.775rem' }}
                    >
                      {st.title}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Card Footer */}
        <div className="d-flex justify-content-between align-items-center pt-2 border-top border-secondary-subtle">
          <div className="d-flex align-items-center gap-2">
            <span
              className={`badge d-inline-flex align-items-center gap-1.5 px-2 py-1 rounded-2 fw-medium ${getPriorityBadgeClass(task.priority)}`}
              style={{ fontSize: '0.725rem' }}
            >
              <span className={`status-dot ${getStatusDotClass(task.priority)}`}></span>
              {task.priority}
            </span>

            {task.dueDate && (
              <span className="text-secondary d-flex align-items-center gap-1" style={{ fontSize: '0.75rem' }}>
                <i className="bi bi-calendar3"></i>
                {task.dueDate}
              </span>
            )}
          </div>

          <div
            className={`rounded-circle d-flex align-items-center justify-content-center fw-bold shadow-sm ${assignee.color}`}
            style={{ width: '26px', height: '26px', fontSize: '0.75rem' }}
            title={`Assigned to: ${assignee.name}`}
          >
            {assignee.avatar ? (
              assignee.avatar
            ) : (
              <i className="bi bi-person text-secondary" style={{ fontSize: '0.85rem' }}></i>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default TaskCard;