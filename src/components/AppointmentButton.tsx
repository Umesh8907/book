'use client'
import React, { useState } from 'react';
import Modal from './Modal';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Book Free Appointment
      </button>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default App;
