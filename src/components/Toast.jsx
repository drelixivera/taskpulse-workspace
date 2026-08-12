import React from 'react';

function Toast({ toast, onClose }) {
  if (!toast.show) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'danger':
        return 'bi-trash3-fill text-danger';
      case 'warning':
        return 'bi-exclamation-triangle-fill text-warning';
      case 'info':
        return 'bi-info-circle-fill text-info';
      case 'success':
      default:
        return 'bi-check-circle-fill text-success';
    }
  };

  return (
    <div
      className="toast-container position-fixed bottom-0 end-0 p-4"
      style={{ zIndex: 1100 }}
    >
      <div
        className="toast show align-items-center bg-body border shadow-lg toast-pill px-3 py-2 d-flex gap-2"
        role="alert"
      >
        <i className={`bi ${getIcon()} fs-5 d-flex align-items-center`}></i>
        <div className="toast-body p-0 fw-medium text-body" style={{ fontSize: '0.875rem' }}>
          {toast.message}
        </div>
        <button
          type="button"
          className="btn-close ms-auto p-1"
          style={{ fontSize: '0.75rem' }}
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default Toast;