// src/components/StepTwo.tsx
import React, { useState } from 'react';

interface StepTwoProps {
  onNext: (data: { name: string; email: string; phone: string; comments: string }) => void;
}

const StepTwo: React.FC<StepTwoProps> = ({ onNext }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [comments, setComments] = useState('');

  const handleSubmit = () => {
    if (name && email && phone) {
      onNext({ name, email, phone, comments });
    }
  };

  return (
    <div>
      <h2 className='text-black'>Enter Your Details</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 mt-2 mb-4 w-full text-black"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 mt-2 mb-4 w-full text-black"
      />
      <input
        type="tel"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="border p-2 mt-2 mb-4 w-full text-black"
      />
      <textarea
        placeholder="Comments"
        value={comments}
        onChange={(e) => setComments(e.target.value)}
        className="border p-2 mt-2 mb-4 w-full text-black"
      ></textarea>
      <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">
        Submit
      </button>
    </div>
  );
};

export default StepTwo;
