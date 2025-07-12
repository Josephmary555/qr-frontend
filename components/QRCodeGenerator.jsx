import React, { useState } from 'react';
import axios from 'axios';
import QRCode from 'qrcode';

const QRCodeGenerator = () => {
  const [userId, setUserId] = useState('');
  const [eventId, setEventId] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleGenerate = async () => {
    try {
      const qrData = `user:${userId},event:${eventId}`;
      const qrCode = await QRCode.toDataURL(qrData);
      setQrCodeUrl(qrCode);
      // Rely on the global axios instance for auth headers and proxy.
      await axios.post('/api/notification/registration', { userId, eventId, qrData });
      setSuccess('QR code generated and email sent');
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Error generating QR code');
      setSuccess('');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Generate QR Code</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <div className="mb-4">
        <label className="block text-gray-700">User ID</label>
        <input
          type="number"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Event ID</label>
        <input
          type="number"
          value={eventId}
          onChange={(e) => setEventId(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <button
        onClick={handleGenerate}
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Generate QR Code
      </button>
      {qrCodeUrl && (
        <div className="mt-4">
          <img src={qrCodeUrl} alt="QR Code" className="w-40 h-40" />
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;