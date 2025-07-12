import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios'; // Use the custom axios instance
import { toast } from 'react-toastify';

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/events/${id}`);
        setEvent(response.data);
      } catch (err) {
        const errorMessage = err.response?.data?.message || 'Failed to fetch event details.';
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]);

  if (loading) {
    return <div className="text-center p-8">Loading event details...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">{error}</div>;
  }

  if (!event) {
    return <div className="text-center p-8">Event not found.</div>;
  }

  const handleExport = () => {
    if (!event || !event.users || event.users.length === 0) {
      toast.info('There are no users to export.');
      return;
    }

    const headers = ['Name', 'Email'];
    const rows = event.users.map(user => [user.name, user.email]);

    let csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n" 
      + rows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${event.purpose.replace(/ /g, '_')}_users.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">{event.purpose}</h2>
          <p className="text-gray-500 mt-1">
            {event.date ? new Date(event.date).toLocaleDateString() : 'No date specified'} | {event.location || 'No location specified'}
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={handleExport} className="btn-primary">
            Export Users (CSV)
          </button>
          <Link to="/admin" className="btn-secondary">
            Back to Dashboard
          </Link>
        </div>
      </div>

      {/* User table content goes here */}
    </div>
  );
};

export default EventDetail;