import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NotificationStatus = () => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Rely on the global axios instance for auth headers and proxy.
        const response = await axios.get('/api/notifications');
        setNotifications(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching notifications');
      }
    };
    fetchNotifications();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Notification Status</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">User ID</th>
            <th className="p-2">Event ID</th>
            <th className="p-2">Type</th>
            <th className="p-2">Status</th>
            <th className="p-2">Sent At</th>
          </tr>
        </thead>
        <tbody>
          {notifications.map((notification, index) => (
            <tr key={index} className="border-b">
              <td className="p-2">{notification.user_id}</td>
              <td className="p-2">{notification.event_id}</td>
              <td className="p-2">{notification.type}</td>
              <td className="p-2">{notification.status}</td>
              <td className="p-2">{new Date(notification.sent_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NotificationStatus;