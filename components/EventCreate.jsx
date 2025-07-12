import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from 'api/axios';
import { toast } from 'react-toastify';

const EventCreate = () => {
  const [formData, setFormData] = useState({
    purpose: '',
    date: '',
    location: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { purpose, date, location } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!purpose) {
      return toast.error('Event Name/Purpose is required.');
    }
    setIsLoading(true);
    try {
      // Use the custom api instance to automatically send the auth token.
      await api.post('/events', { purpose, date, location });

      toast.success('Event created successfully!');
      navigate('/admin'); // Redirect to the dashboard
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create event. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create New Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="purpose" className="block text-gray-700 font-bold mb-2">
            Event Name / Purpose
          </label>
          <input
            type="text"
            id="purpose"
            name="purpose"
            value={purpose}
            onChange={onChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            disabled={isLoading}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="block text-gray-700 font-bold mb-2">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={date}
            onChange={onChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            disabled={isLoading}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="location" className="block text-gray-700 font-bold mb-2">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={location}
            onChange={onChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="e.g., Conference Hall A"
            disabled={isLoading}
          />
        </div>
        <div className="flex items-center justify-between gap-4 mt-8">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full disabled:bg-blue-300"
            disabled={isLoading}
          >
            {isLoading ? 'Creating...' : 'Create Event'}
          </button>
          <Link to="/admin" className="text-center w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EventCreate;