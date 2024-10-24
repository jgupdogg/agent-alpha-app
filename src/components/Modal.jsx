// src/components/Modal.jsx
import React, { useEffect } from 'react';

const Modal = ({ children, onClose }) => {
  // Close the modal when the Escape key is pressed
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleClickOutside = (e) => {
    if (e.target.id === 'modal-overlay') {
      onClose();
    }
  };

  return (
    <div
      id="modal-overlay"
      onClick={handleClickOutside}
      className="
        fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center
        z-50
      "
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="
          bg-white dark:bg-gray-800 rounded-lg overflow-y-auto max-h-full
          w-full max-w-md mx-2
        "
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
