// src/components/StepOne.tsx
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface StepOneProps {
  onNext: (data: { date: string; time: string }) => void;
}

const StepOne: React.FC<StepOneProps> = ({ onNext }) => {
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string>('');

  const handleSubmit = () => {
    if (date && time) {
      onNext({ date: date.toDateString(), time });
    }
  };

  return (
    <div>
      <h2 className='text-black'>Select Date and Time</h2>
      <DatePicker
        selected={date}
        onChange={(date: Date) => setDate(date)}
        dateFormat="MMMM d, yyyy"
        className="border p-2 mt-2 mb-4 w-full text-black"
      />
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="border p-2 mt-2 mb-4 w-full text-black"
      />
      <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">
        Next
      </button>
    </div>
  );
};

export default StepOne;
