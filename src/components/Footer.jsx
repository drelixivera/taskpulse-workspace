import React from 'react';

function Footer() {
  return (
    <footer className="mt-auto py-3 border-top bg-body">
      <div className="container-fluid px-4 d-flex flex-column flex-sm-row justify-content-between align-items-center gap-2 text-muted small">
        <div className="d-flex align-items-center gap-2">
          <span><i className="bi bi-lightning-charge-fill text-warning me-1"></i>Tip: Drag and drop tasks between columns to update status instantly.</span>
        </div>
        <div>
          <span>Designed & Built with React + Bootstrap</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;