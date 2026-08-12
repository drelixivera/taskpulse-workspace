import React, { useRef } from 'react';

function Navbar({
  totalTasks,
  completedTasks,
  onNewTaskClick,
  theme,
  onToggleTheme,
  onExportData,
  onImportData,
  userProfile,
  onResetOnboarding
}) {
  const fileInputRef = useRef(null);

  const completionPercentage =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const handleImportButtonClick = () => {
    fileInputRef.current?.click();
  };

  const getPersonaBadge = () => {
    switch (userProfile?.persona) {
      case 'Student':
        return { label: '🎓 Student', color: 'bg-info-subtle text-info-emphasis border-info-subtle' };
      case 'Worker':
        return { label: '💼 Office', color: 'bg-primary-subtle text-primary border-primary-subtle' };
      default:
        return { label: '⚡ Personal', color: 'bg-success-subtle text-success border-success-subtle' };
    }
  };

  const personaBadge = getPersonaBadge();

  return (
    <nav className="navbar glass-navbar border-bottom sticky-top py-2.5 px-3 mb-4">
      <div className="container-fluid p-0">
        
        {/* Main Navbar Flex Container */}
        <div className="d-flex flex-column flex-md-row w-100 gap-2.5 gap-md-0 align-items-md-center justify-content-between">
          
          {/* Top Row on Mobile: Brand Logo & Workspace Info */}
          <div className="d-flex align-items-center justify-content-between w-100 w-md-auto">
            <div className="d-flex align-items-center gap-2">
              <div
                className="bg-primary text-white rounded-3 p-2 d-flex align-items-center justify-content-center shadow-sm"
                style={{ width: '38px', height: '38px' }}
              >
                <i className="bi bi-kanban fs-5"></i>
              </div>
              <div>
                <div className="d-flex align-items-center gap-2">
                  <h1 className="h6 fw-bold mb-0 text-body">TaskPulse</h1>
                  {userProfile && (
                    <span
                      className={`badge border rounded-pill extra-small px-2 ${personaBadge.color}`}
                      style={{ fontSize: '0.65rem', cursor: 'pointer' }}
                      onClick={onResetOnboarding}
                      title="Click to switch workspace template"
                    >
                      {personaBadge.label}
                    </span>
                  )}
                </div>
                <span className="text-secondary extra-small d-block" style={{ fontSize: '0.725rem' }}>
                  {userProfile ? `${userProfile.name}'s Space` : 'Workspace Hub'}
                </span>
              </div>
            </div>

            {/* User Profile Avatar (Shown on Top Right for Mobile) */}
            <div className="d-flex d-md-none align-items-center gap-2">
              <div
                className="bg-primary text-white border border-primary-subtle rounded-circle d-flex align-items-center justify-content-center fw-bold small shadow-sm"
                style={{ width: '34px', height: '34px', fontSize: '0.85rem' }}
                title={userProfile ? userProfile.name : 'User'}
              >
                {userProfile ? userProfile.name.charAt(0).toUpperCase() : 'U'}
              </div>
            </div>
          </div>

          {/* Hidden File Input for JSON Import */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={onImportData}
            accept=".json"
            style={{ display: 'none' }}
          />

          {/* Action Tools Row (Stacks cleanly or scrolls on Mobile) */}
          <div className="d-flex align-items-center justify-content-between justify-content-md-end gap-2 w-100 w-md-auto overflow-x-auto pb-1 pb-md-0">
            
            {/* Export & Import Buttons */}
            <div className="btn-group flex-shrink-0" role="group">
              <button
                className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1 px-2.5 py-1.5"
                onClick={onExportData}
                title="Backup Workspace (JSON)"
              >
                <i className="bi bi-download"></i>
                <span className="extra-small">Export</span>
              </button>
              <button
                className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1 px-2.5 py-1.5"
                onClick={handleImportButtonClick}
                title="Restore Workspace (JSON)"
              >
                <i className="bi bi-upload"></i>
                <span className="extra-small">Import</span>
              </button>
            </div>

            {/* Progress Indicator (Hidden on small screens to save space) */}
            <div className="d-none d-lg-flex align-items-center gap-2 bg-body-tertiary border border-secondary-subtle px-3 py-1.5 rounded-pill shadow-sm">
              <span className="small text-secondary fw-medium" style={{ fontSize: '0.775rem' }}>Progress:</span>
              <div className="progress" style={{ width: '60px', height: '5px' }}>
                <div
                  className="progress-bar bg-success rounded-pill"
                  style={{ width: `${completionPercentage}%` }}
                ></div>
              </div>
              <span className="small fw-bold text-body" style={{ fontSize: '0.775rem' }}>{completionPercentage}%</span>
            </div>

            {/* Theme Toggle Button */}
            <button
              className="btn btn-outline-secondary btn-sm rounded-circle d-flex align-items-center justify-content-center p-0 shadow-sm flex-shrink-0"
              style={{ width: '34px', height: '34px' }}
              onClick={onToggleTheme}
              title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
            >
              {theme === 'light' ? (
                <i className="bi bi-moon-stars-fill text-dark"></i>
              ) : (
                <i className="bi bi-sun-fill text-warning"></i>
              )}
            </button>

            {/* Primary Action Button: New Task */}
            <button
              className="btn btn-primary btn-sm d-flex align-items-center gap-1.5 fw-semibold px-3 py-1.5 shadow-sm flex-shrink-0"
              onClick={onNewTaskClick}
            >
              <i className="bi bi-plus-lg"></i>
              <span>New Task</span>
            </button>

            {/* User Profile Avatar (Desktop Only) */}
            <div className="d-none d-md-flex align-items-center gap-2 ms-md-1">
              <div className="vr my-1 text-secondary opacity-25" style={{ height: '24px' }}></div>
              <div
                className="bg-primary text-white border border-primary-subtle rounded-circle d-flex align-items-center justify-content-center fw-bold small shadow-sm"
                style={{ width: '34px', height: '34px', fontSize: '0.85rem' }}
                title={userProfile ? userProfile.name : 'User'}
              >
                {userProfile ? userProfile.name.charAt(0).toUpperCase() : 'U'}
              </div>
            </div>

          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;