import React, { useState } from 'react';

function OnboardingModal({ isOpen, onCompleteOnboarding }) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [persona, setPersona] = useState('Student'); // 'Student' | 'Worker' | 'General'

  if (!isOpen) return null;

  const handleFinish = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    onCompleteOnboarding({
      name: name.trim(),
      persona,
      createdAt: new Date().toISOString()
    });
  };

  return (
    <div
      className="modal fade show d-block"
      style={{ backgroundColor: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(8px)' }}
      tabIndex="-1"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content shadow-lg border-0 rounded-4 overflow-hidden bg-body">
          
          {/* Header Progress Bar */}
          <div className="progress rounded-0" style={{ height: '4px' }}>
            <div
              className="progress-bar bg-primary transition-all"
              style={{ width: step === 1 ? '50%' : '100%' }}
            ></div>
          </div>

          <div className="modal-body p-4 p-md-5">
            {step === 1 ? (
              /* Step 1: Welcome & Name Input */
              <div>
                <div className="text-center mb-4">
                  <div className="bg-primary-subtle text-primary rounded-circle d-inline-flex align-items-center justify-content-center p-3 mb-3 shadow-sm">
                    <i className="bi bi-kanban fs-2"></i>
                  </div>
                  <h4 className="fw-bold text-body mb-1">Welcome to TaskPulse</h4>
                  <p className="text-secondary small">Let's set up your personalized workspace</p>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); if (name.trim()) setStep(2); }}>
                  <div className="mb-4">
                    <label className="form-label form-label-sm mb-1.5">What should we call you? *</label>
                    <input
                      type="text"
                      className="form-control custom-modal-input fw-medium"
                      placeholder="e.g., Alex"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      autoFocus
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100 fw-semibold rounded-2 py-2 d-flex align-items-center justify-content-center gap-2 shadow-sm"
                    disabled={!name.trim()}
                  >
                    Continue <i className="bi bi-arrow-right"></i>
                  </button>
                </form>
              </div>
            ) : (
              /* Step 2: Choose Persona / Workspace Template */
              <div>
                <div className="text-center mb-4">
                  <h4 className="fw-bold text-body mb-1">Hey {name}! 👋</h4>
                  <p className="text-secondary small">How are you planning to use TaskPulse?</p>
                </div>

                <div className="d-flex flex-column gap-3 mb-4">
                  {/* Student Persona Option */}
                  <div
                    className={`card p-3 border rounded-3 cursor-pointer transition-all ${
                      persona === 'Student'
                        ? 'border-primary bg-primary-subtle'
                        : 'bg-body-tertiary border-secondary-subtle'
                    }`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setPersona('Student')}
                  >
                    <div className="d-flex align-items-center gap-3">
                      <div className="fs-3 text-primary">🎓</div>
                      <div>
                        <h6 className="fw-bold mb-0 text-body">Student / Academic</h6>
                        <small className="text-secondary">Assignments, Exam Prep, Midterm Projects & Reading Lists</small>
                      </div>
                    </div>
                  </div>

                  {/* Office Worker Option */}
                  <div
                    className={`card p-3 border rounded-3 cursor-pointer transition-all ${
                      persona === 'Worker'
                        ? 'border-primary bg-primary-subtle'
                        : 'bg-body-tertiary border-secondary-subtle'
                    }`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setPersona('Worker')}
                  >
                    <div className="d-flex align-items-center gap-3">
                      <div className="fs-3 text-primary">💼</div>
                      <div>
                        <h6 className="fw-bold mb-0 text-body">Office & Professional</h6>
                        <small className="text-secondary">Sprint Backlog, In Review, Team Deliverables & Client Projects</small>
                      </div>
                    </div>
                  </div>

                  {/* General / Personal Option */}
                  <div
                    className={`card p-3 border rounded-3 cursor-pointer transition-all ${
                      persona === 'General'
                        ? 'border-primary bg-primary-subtle'
                        : 'bg-body-tertiary border-secondary-subtle'
                    }`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setPersona('General')}
                  >
                    <div className="d-flex align-items-center gap-3">
                      <div className="fs-3 text-primary">⚡</div>
                      <div>
                        <h6 className="fw-bold mb-0 text-body">Personal & Life</h6>
                        <small className="text-secondary">General To-Do Lists, Habits, Trips & Daily Errands</small>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="d-flex gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-secondary w-50 fw-medium rounded-2"
                    onClick={() => setStep(1)}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary w-50 fw-semibold rounded-2 d-flex align-items-center justify-content-center gap-2 shadow-sm"
                    onClick={handleFinish}
                  >
                    Build Workspace <i className="bi bi-rocket-takeoff"></i>
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default OnboardingModal;