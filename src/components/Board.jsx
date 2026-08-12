import React, { useState, useEffect } from 'react';
import { initialTeamMembers, personaTemplates } from '../data/initialData';
import Column from './Column';
import TaskModal from './TaskModal';
import OnboardingModal from './OnboardingModal';
import Navbar from './Navbar';
import Footer from './Footer';
import Toast from './Toast';

function Board() {
  // User Profile State
  const [userProfile, setUserProfile] = useState(() => {
    const savedProfile = localStorage.getItem('taskpulse_profile');
    return savedProfile ? JSON.parse(savedProfile) : null;
  });

  const [columns, setColumns] = useState(() => {
    const savedCols = localStorage.getItem('taskpulse_columns');
    return savedCols ? JSON.parse(savedCols) : personaTemplates.Student.columns;
  });

  const [teamMembers] = useState(initialTeamMembers);

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('taskpulse_theme') || 'light';
  });

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('kanban_tasks');
    return savedTasks ? JSON.parse(savedTasks) : personaTemplates.Student.tasks;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Toast Notification State
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [assigneeFilter, setAssigneeFilter] = useState('All');

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('taskpulse_theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('kanban_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('taskpulse_columns', JSON.stringify(columns));
  }, [columns]);

  // Handle Onboarding Completion
  const handleCompleteOnboarding = (profileData) => {
    setUserProfile(profileData);
    localStorage.setItem('taskpulse_profile', JSON.stringify(profileData));

    const template = personaTemplates[profileData.persona] || personaTemplates.Student;
    setColumns(template.columns);
    setTasks(template.tasks);

    triggerToast(`Welcome ${profileData.name}! Generated your ${profileData.persona} workspace.`, 'success');
  };

  const triggerToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' });
    }, 3000);
  };

  const handleToggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    triggerToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode`, 'info');
  };

  const handleAddColumn = () => {
    const title = window.prompt('Enter new column title:');
    if (!title || !title.trim()) return;

    const colors = ['bg-primary', 'bg-secondary', 'bg-success', 'bg-warning text-dark', 'bg-info text-dark', 'bg-dark'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const newCol = {
      id: `col-${Date.now()}`,
      title: title.trim(),
      badgeColor: randomColor
    };

    setColumns([...columns, newCol]);
    triggerToast(`Column "${newCol.title}" created!`, 'success');
  };

  const handleDeleteColumn = (colId) => {
    if (columns.length <= 1) {
      triggerToast('You must keep at least one column on your board.', 'warning');
      return;
    }

    const colToDelete = columns.find((c) => c.id === colId);

    if (window.confirm(`Delete "${colToDelete?.title}" column and all its tasks?`)) {
      setColumns(columns.filter((c) => c.id !== colId));
      setTasks(tasks.filter((t) => t.columnId !== colId));
      triggerToast(`Column "${colToDelete?.title}" deleted.`, 'danger');
    }
  };

  const handleExportData = () => {
    const dataToExport = {
      userProfile,
      columns,
      tasks,
      teamMembers,
      exportedAt: new Date().toISOString()
    };

    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(dataToExport, null, 2)
    )}`;

    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute(
      'download',
      `taskpulse_backup_${new Date().toISOString().slice(0, 10)}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    triggerToast('Workspace backup exported to JSON!', 'success');
  };

  const handleImportData = (e) => {
    const fileReader = new FileReader();
    const file = e.target.files[0];

    if (file) {
      fileReader.readAsText(file, 'UTF-8');
      fileReader.onload = (event) => {
        try {
          const parsedData = JSON.parse(event.target.result);

          if (parsedData.tasks && Array.isArray(parsedData.tasks)) {
            setTasks(parsedData.tasks);
          }
          if (parsedData.columns && Array.isArray(parsedData.columns)) {
            setColumns(parsedData.columns);
          }
          if (parsedData.userProfile) {
            setUserProfile(parsedData.userProfile);
            localStorage.setItem('taskpulse_profile', JSON.stringify(parsedData.userProfile));
          }

          triggerToast('Workspace restored successfully!', 'success');
        } catch (error) {
          triggerToast('Invalid backup file format.', 'danger');
        }
      };
    }
  };

  const handleOpenCreateModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleDeleteTask = (taskId) => {
    const taskToDelete = tasks.find((t) => t.id === taskId);
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks((prevTasks) => prevTasks.filter((t) => t.id !== taskId));
      triggerToast(`Task "${taskToDelete?.title || 'Item'}" deleted`, 'danger');
    }
  };

  const handleSaveTask = (savedTask) => {
    setTasks((prevTasks) => {
      const exists = prevTasks.some((t) => t.id === savedTask.id);
      if (exists) {
        triggerToast(`Task "${savedTask.title}" updated!`, 'info');
        return prevTasks.map((t) => (t.id === savedTask.id ? savedTask : t));
      } else {
        triggerToast(`New task "${savedTask.title}" created!`, 'success');
        return [...prevTasks, savedTask];
      }
    });
  };

  const handleToggleSubtask = (taskId, subtaskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id !== taskId) return task;

        const updatedSubtasks = (task.subtasks || []).map((st) =>
          st.id === subtaskId ? { ...st, completed: !st.completed } : st
        );

        return { ...task, subtasks: updatedSubtasks };
      })
    );
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPriority =
      priorityFilter === 'All' || task.priority === priorityFilter;

    const matchesAssignee =
      assigneeFilter === 'All' || task.assigneeId === assigneeFilter;

    return matchesSearch && matchesPriority && matchesAssignee;
  });

  const completedTasksCount = tasks.filter((t) => {
    const lastCol = columns[columns.length - 1];
    return lastCol ? t.columnId === lastCol.id : false;
  }).length;

  return (
    <div className="d-flex flex-column min-vh-100 bg-body-tertiary">
      
      {/* Top Navbar */}
      <Navbar
        totalTasks={tasks.length}
        completedTasks={completedTasksCount}
        onNewTaskClick={handleOpenCreateModal}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onExportData={handleExportData}
        onImportData={handleImportData}
        userProfile={userProfile}
        onResetOnboarding={() => setUserProfile(null)}
      />

      {/* Main Board Content */}
      <main className="container-fluid px-4 flex-grow-1 pb-5">
        
        {/* Toolbar Row */}
        <div className="card border-0 shadow-sm mb-4 p-3 rounded-3">
          <div className="row g-3 align-items-center">
            
            {/* Search Bar */}
            <div className="col-12 col-md-4 col-lg-3">
              <div className="input-group">
                <span className="input-group-text bg-body text-muted border-end-0">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-start-0 ps-0 shadow-none"
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Assignee Filter */}
            <div className="col-12 col-sm-6 col-md-3 col-lg-3">
              <div className="d-flex align-items-center gap-2">
                <label className="text-muted small fw-semibold text-nowrap">Assignee:</label>
                <select
                  className="form-select shadow-none"
                  value={assigneeFilter}
                  onChange={(e) => setAssigneeFilter(e.target.value)}
                >
                  <option value="All">All Team Members</option>
                  {teamMembers.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Priority Filter */}
            <div className="col-12 col-sm-6 col-md-3 col-lg-3">
              <div className="d-flex align-items-center gap-2">
                <label className="text-muted small fw-semibold text-nowrap">Priority:</label>
                <select
                  className="form-select shadow-none"
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                >
                  <option value="All">All Priorities</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>

            {/* Actions: Add Column & Stats */}
            <div className="col-12 col-md d-flex justify-content-between justify-content-md-end align-items-center gap-3 border-top border-md-0 pt-2 pt-md-0">
              <button
                className="btn btn-outline-primary btn-sm d-flex align-items-center gap-1 fw-semibold"
                onClick={handleAddColumn}
              >
                <i className="bi bi-plus-circle"></i> Add Column
              </button>

              <span className="text-muted small">
                Showing <strong>{filteredTasks.length}</strong> of <strong>{tasks.length}</strong> tasks
              </span>
            </div>

          </div>
        </div>

        {/* Dynamic Columns Grid */}
        <div className="row g-4 flex-nowrap overflow-auto pb-3">
          {columns.map((column) => {
            const columnTasks = filteredTasks.filter((task) => task.columnId === column.id);
            return (
              <Column
                key={column.id}
                column={column}
                tasks={columnTasks}
                teamMembers={teamMembers}
                onEditTask={handleOpenEditModal}
                onDeleteTask={handleDeleteTask}
                onToggleSubtask={handleToggleSubtask}
                onDeleteColumn={handleDeleteColumn}
              />
            );
          })}
        </div>

      </main>

      {/* Footer */}
      <Footer />

      {/* First-Time Interactive Onboarding Wizard */}
      <OnboardingModal
        isOpen={!userProfile}
        onCompleteOnboarding={handleCompleteOnboarding}
      />

      {/* Task Creation / Edit Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSaveTask={handleSaveTask}
        columns={columns}
        teamMembers={teamMembers}
        editingTask={editingTask}
      />

      {/* Toast Notification Container */}
      <Toast toast={toast} onClose={() => setToast({ ...toast, show: false })} />
    </div>
  );
}

export default Board;