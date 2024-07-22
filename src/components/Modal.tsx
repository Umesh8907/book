'use client'
import React, { useState, useEffect } from 'react';

const Modal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    name: '',
    email: '',
    phone: '',
    comments: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateStep1 = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';
    return newErrors;
  };

  const validateStep2 = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone is required';
    return newErrors;
  };

  const handleNext = () => {
    let newErrors = {};

    if (step === 1) {
      newErrors = validateStep1();
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
      setErrors({});
      setStep(prevStep => prevStep + 1);
    } else if (step === 2) {
      newErrors = validateStep2();
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
      setErrors({});
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    setStep(prevStep => prevStep - 1);
  };

  const handleSubmit = async () => {
    const newErrors = validateStep2();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);
    try {
      const response = await fetch('/api/create-event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error: ${errorText}`);
      }

      const result = await response.json();
      console.log('Form submission result:', result);

      setStep(3);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Generate time slots with 20-minute intervals
  const generateTimeSlots = (start: string, end: string) => {
    const startTime = new Date(`1970-01-01T${start}:00`);
    const endTime = new Date(`1970-01-01T${end}:00`);
    const slots = [];
    while (startTime <= endTime) {
      slots.push(startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      startTime.setMinutes(startTime.getMinutes() + 30);
    }
    return slots;
  };

  const timeSlots = generateTimeSlots('08:00', '18:00');

  const today = new Date().toISOString().split('T')[0];
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const isSlotDisabled = (slot: string) => {
    if (formData.date !== today) return false;
    const [slotHour, slotMinute] = slot.split(':').map(Number);
    const [currentHour, currentMinute] = currentTime.split(':').map(Number);
    return slotHour < currentHour || (slotHour === currentHour && slotMinute < currentMinute);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 " >
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-96">
        {step === 1 && (
          <div className="space-y-4 text-gray-900">
            <h2 className="text-2xl font-bold">Select Date and Time</h2>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              min={today}
            />
            {errors.date && <p className="text-red-500">{errors.date}</p>}
            <select
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select Time</option>
              {timeSlots.map((slot, index) => (
                <option key={index} value={slot} disabled={isSlotDisabled(slot)}>
                  {slot}
                </option>
              ))}
            </select>
            {errors.time && <p className="text-red-500">{errors.time}</p>}
            <div className="flex justify-between">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Close
              </button>
              <button
                onClick={handleNext}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Next
              </button>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-4 text-gray-900">
            <h2 className="text-2xl font-bold">Enter Your Details</h2>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Name"
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.name && <p className="text-red-500">{errors.name}</p>}
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Email"
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="Phone"
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.phone && <p className="text-red-500">{errors.phone}</p>}
            <textarea
              value={formData.comments}
              onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
              placeholder="Comments"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <div className="flex justify-between">
              <button
                onClick={handlePrevious}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Submit
              </button>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="space-y-4 text-gray-900">
            <h2 className="text-2xl font-bold">Thank You</h2>
            <p>Your appointment has been booked successfully.</p>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Close
            </button>
          </div>
        )}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 " >
            <div className="w-10 h-10 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
