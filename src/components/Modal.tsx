// src/components/Modal.tsx
import React, { useState } from 'react';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import ThankYou from './ThankYou';

interface ModalProps {
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    name: '',
    email: '',
    phone: '',
    comments: ''
  });

  const handleNext = (data: any) => {
    setFormData(prev => ({ ...prev, ...data }));
    setStep(step + 1);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/create-event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
      console.log('Form submission result:', result);
  
      setStep(3); // Go to the Thank You step
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded shadow-md w-full max-w-lg">
        {step === 1 && <StepOne onNext={handleNext} />}
        {step === 2 && (
          <StepTwo
            onNext={(data) => {
              handleNext(data);
              handleSubmit(); // Call the submit handler
            }}
          />
        )}
        {step === 3 && <ThankYou />}
        <button onClick={onClose} className="mt-4 text-red-500">Close</button>
      </div>
    </div>
  );
};

export default Modal;
