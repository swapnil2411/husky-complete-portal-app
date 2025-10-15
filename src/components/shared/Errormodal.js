import React from 'react';

const Errormodal = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className="modal modal--error">
        <div className="modal__header">
          <h2 className="modal__title">Something went wrong</h2>
          <button 
            className="modal__close"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="modal__body">
          <div className="error-content">
            <div className="error-content__icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="42" height="37" viewBox="0 0 42 37" fill="none">
  <path d="M21 14V22M21 28H21.02M17.725 3.18238L1.51299 30.2504C1.17879 30.8291 1.00193 31.4853 1.00002 32.1537C0.998102 32.822 1.1712 33.4792 1.50209 34.0598C1.83298 34.6405 2.31012 35.1244 2.88607 35.4635C3.46202 35.8025 4.1167 35.9849 4.78499 35.9924H37.213C37.881 35.9847 38.5353 35.8023 39.111 35.4634C39.6867 35.1244 40.1636 34.6407 40.4945 34.0604C40.8253 33.48 40.9985 32.8231 40.9968 32.1551C40.9952 31.4871 40.8187 30.8311 40.485 30.2524L24.273 3.18038C23.9319 2.61739 23.4514 2.15186 22.8779 1.82877C22.3044 1.50568 21.6573 1.33594 20.999 1.33594C20.3407 1.33594 19.6936 1.50568 19.1201 1.82877C18.5466 2.15186 18.0661 2.61739 17.725 3.18038V3.18238Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
            </div>
            <div className="error-content__text">
              {message || "We couldn't complete your action, please try again. If this problem persists, please contact support."}
            </div>
          </div>
        </div>

        <div className="modal__footer modal__footer--single">
          <button 
            className="btn btn--primary"
            onClick={onClose}
          >
            OK
          </button>
        </div>
      </div>
    </>
  );
};

export default Errormodal;