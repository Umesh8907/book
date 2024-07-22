'use client'
import React, { useEffect, useState } from 'react';


interface Event {
  _id: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  comments: string;
}

const Dashboard: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/get-events');
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        setEvents(data.events);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <h1 className="text-2xl font-bold mb-4">Scheduled Events</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-black">Meeting Date</th>
              <th className="py-2 px-4 border-b text-black">Meeting Time</th>
              <th className="py-2 px-4 border-b text-black">Name</th>
              <th className="py-2 px-4 border-b text-black">Email</th>
              <th className="py-2 px-4 border-b text-black">Phone</th>
              <th className="py-2 px-4 border-b text-black">Comments</th>
            </tr>
          </thead>
          <tbody>
            {events.map(event => (
              <tr key={event._id}>
                <td className="py-2 px-4 border-b text-black">{event.date}</td>
                <td className="py-2 px-4 border-b text-black">{event.time}</td>
                <td className="py-2 px-4 border-b text-black">{event.name}</td>
                <td className="py-2 px-4 border-b text-black">{event.email}</td>
                <td className="py-2 px-4 border-b text-black">{event.phone}</td>
                <td className="py-2 px-4 border-b text-black">{event.comments}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
