import React, { useState, useEffect } from 'react';

function TaskModal({ isOpen, onClose, onSaveTask, columns, teamMembers, editingTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [columnId, setColumnId] = useState(columns[0]?.id || 'col-1');
  const [assigneeId, setAssigneeId] = useState(teamMembers[0]?.id || 'user-1');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');
  const [subtasks, setSubtasks] = useState([]);
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title || '');
      setDescription(editingTask.description || '');
      setColumnId(editingTask.columnId || columns[0]?.id);
      setAssigneeId(editingTask.assigneeId || teamMembers[0]?.id);
      setPriority(editingTask.priority || 'Medium');
      setDueDate(editingTask.dueDate || '');
      setSubtasks(editingTask.subtasks || []);
    } else {
      setTitle('');
      setDescription('');
      setColumnId(columns[0]?.id || 'col-1');
      setAssigneeId(teamMembers[0]?.id || 'user-1');
      setPriority('Medium');
      setDueDate('');
      setSubtasks([]);
    }
    setNewSubtaskTitle('');
  }, [editingTask, isOpen, columns, teamMembers]);

  if (!isOpen) return null;

  const handleAddSubtask = (e) => {
    e.preventDefault();
    if (!newSubtaskTitle.trim()) return;

    const newSubtask = {
      id: `st-${Date.now()}`,
      title: newSubtaskTitle.trim(),
      completed: false
    };

    setSubtasks([...subtasks, newSubtask]);
    setNewSubtaskTitle('');
  };

  const handleRemoveSubtask = (stId) => {
    setSubtasks(subtasks.filter((s) => s.id !== stId));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const taskData = {
      id: editingTask ? editingTask.id : `task-${Date.now()}`,
      columnId,
      assigneeId,
      title,
      description,
      priority,
      dueDate,
      subtasks
    };

    onSaveTask(taskData);
    onClose();
  };

  return (
    <div
      className="modal fade show d-block"
      style={{ backgroundColor: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(3px)' }}
      tabIndex="-1"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content shadow-lg bg-body">
          
          {/* Header */}
          <div className="modal-header d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-2">
              <div className="bg-primary-subtle text-primary rounded-2 p-2 d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}>
                <i className={`bi ${editingTask ? 'bi-pencil-square' : 'bi-plus-lg'} fs-6`}></i>
              </div>
              <h5 className="modal-title fw-bold text-body mb-0 fs-6">
                {editingTask ? 'Edit Task Details' : 'Create New Task'}
              </h5>
            </div>
            <button
              type="button"
              className="btn-close shadow-none"
              onClick={onClose}
            ></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body p-4">
              
              {/* Task Title */}
              <div className="mb-3.5">
                <label className="form-label form-label-sm mb-1.5">Task Title</label>
                <input
                  type="text"
                  className="form-control custom-modal-input fw-medium"
                  placeholder="e.g., Design System Refinement"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <br />
              
              {/* Task Description */}
              <div className="mb-4">
                <label className="form-label form-label-sm mb-1.5">Description</label>
                <textarea
                  className="form-control custom-modal-input"
                  rows="3"
                  placeholder="Add clear context, requirements, or links for this task..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              {/* Grid Properties: Column, Assignee, Priority */}
              <div className="bg-body-tertiary p-3 rounded-3 border border-secondary-subtle mb-4">
                <div className="row g-3">
                  
                  {/* Column */}
                  <div className="col-12 col-md-4">
                    <label className="form-label form-label-sm mb-1.5"> Column</label>
                    <select
                      className="form-select custom-modal-input fw-medium"
                      value={columnId}
                      onChange={(e) => setColumnId(e.target.value)}
                    >
                      {columns.map((col) => (
                        <option key={col.id} value={col.id}>
                          {col.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Assign To */}
                  <div className="col-12 col-md-4">
                    <label className="form-label form-label-sm mb-1.5">Assignee</label>
                    <select
                      className="form-select custom-modal-input fw-medium"
                      value={assigneeId}
                      onChange={(e) => setAssigneeId(e.target.value)}
                    >
                      {teamMembers.map((member) => (
                        <option key={member.id} value={member.id}>
                          {member.name} ({member.role})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Priority */}
                  <div className="col-12 col-md-4">
                    <label className="form-label form-label-sm mb-1.5">Priority Level</label>
                    <select
                      className="form-select custom-modal-input fw-medium"
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>

                </div>
              </div>

              {/* Due Date */}
              <div className="mb-4">
                <label className="form-label form-label-sm mb-1.5">Target Due Date</label>
                <input
                  type="date"
                  className="form-control custom-modal-input"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>

              {/* Subtasks Checklist Section */}
              <div className="border-top border-secondary-subtle pt-3.5">
                <br />
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <label className="form-label form-label-sm mb-0">Action Items / Subtasks</label>
                  <span className="text-muted extra-small" style={{ fontSize: '0.75rem' }}>
                    {subtasks.length} step{subtasks.length === 1 ? '' : 's'} added
                  </span>
                </div>
                
                {/* Input Add Bar */}
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control custom-modal-input"
                    placeholder="Add a step (e.g., Review PR, Update docs)..."
                    value={newSubtaskTitle}
                    onChange={(e) => setNewSubtaskTitle(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddSubtask(e);
                      }
                    }}
                  />
                  <button
                    className="btn btn-outline-primary px-3 fw-semibold d-flex align-items-center gap-1"
                    type="button"
                    style={{ borderRadius: '0 0.5rem 0.5rem 0', fontSize: '0.85rem' }}
                    onClick={handleAddSubtask}
                  >
                    <i className="bi bi-plus-lg"></i> Add Step
                  </button>
                </div>

                {/* Subtask List */}
                {subtasks.length > 0 && (
                  <div className="d-flex flex-column gap-2">
                    {subtasks.map((st) => (
                      <div
                        key={st.id}
                        className="subtask-item-box d-flex justify-content-between align-items-center p-2.5 px-3 bg-body-tertiary border border-secondary-subtle"
                      >
                        <span className="small text-body fw-medium d-flex align-items-center gap-2">
                          <i className="bi bi-check-square text-primary" style={{ fontSize: '0.85rem' }}></i>
                          {st.title}
                        </span>
                        <button
                          type="button"
                          className="btn btn-sm btn-link text-muted p-0 opacity-50 opacity-100-hover text-danger-hover"
                          onClick={() => handleRemoveSubtask(st.id)}
                        >
                          <i className="bi bi-x-circle fs-6"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

            {/* Modal Footer */}
            <div className="modal-footer border-top border-secondary-subtle px-4 py-3 bg-body-tertiary">
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary px-3 fw-medium rounded-2"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-sm btn-primary px-4 fw-semibold rounded-2 shadow-sm d-flex align-items-center gap-1.5"
              >
                <i className={`bi ${editingTask ? 'bi-check2' : 'bi-plus-lg'}`}></i>
                {editingTask ? 'Save Changes' : 'Create Task'}
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}

export default TaskModal;