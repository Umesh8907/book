// src/components/AppointmentButton.tsx
'use client'
import React, { useState } from 'react';
import Modal from './Modal';

const AppointmentButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <button onClick={handleOpen} className="bg-blue-500 text-white px-4 py-2 rounded">
        Book Free Appointment
      </button>
      {isOpen && <Modal onClose={handleClose} />}
    </>
  );
};

export default AppointmentButton;
