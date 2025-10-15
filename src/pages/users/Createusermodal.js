import React, { useState } from 'react';
import Invite from '../../components/icons/Invite';

const Createusermodal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (isFormValid()) {
      onSubmit(formData);
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({ name: '', surname: '', email: '' });
    onClose();
  };

  const isFormValid = () => {
    return formData.name.trim() !== '' && 
           formData.surname.trim() !== '' && 
           formData.email.trim() !== '';
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="modal-overlay" onClick={handleClose} />
      <div className="modal">
        <div className="modal__header">
          <h2 className="modal__title">Create user</h2>
          <button 
            className="modal__close"
            onClick={handleClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="modal__body">
          <div className="form-field">
            <label className="form-field__label">
              NAME<span className="form-field__required">*</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Please enter name"
              value={formData.name}
              onChange={handleChange}
              className="form-field__input"
            />
          </div>

          <div className="form-field">
            <label className="form-field__label">
              SURNAME<span className="form-field__required">*</span>
            </label>
            <input
              type="text"
              name="surname"
              placeholder="Please enter surname"
              value={formData.surname}
              onChange={handleChange}
              className="form-field__input"
            />
          </div>

          <div className="form-field">
            <label className="form-field__label">
              COMPANY EMAIL<span className="form-field__required">*</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Please enter email address"
              value={formData.email}
              onChange={handleChange}
              className="form-field__input"
            />
          </div>
        </div>

        <div className="modal__footer">
          <button 
            className="btn btn--secondary"
            onClick={handleClose}
          >
            <svg className="btn__icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            CANCEL
          </button>
          <button 
            className="btn btn--primary"
            onClick={handleSubmit}
            disabled={!isFormValid()}
          >
            <Invite />
            CREATE USER
          </button>
        </div>
      </div>
    </>
  );
};

export default Createusermodal;