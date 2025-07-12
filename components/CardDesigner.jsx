import React, { useState, useRef } from 'react';
import api from 'api/axios';
import { showSuccess, showError } from 'utils/notifications';
import html2canvas from 'html2canvas';

const CardDesigner = () => {
  const [templateName, setTemplateName] = useState('');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [textColor, setTextColor] = useState('#000000');
  const [error, setError] = useState('');
  const cardRef = useRef(null);

  const handleSave = async () => {
    try {
      const canvas = await html2canvas(cardRef.current);
      const designJson = {
        bgColor,
        textColor,
        image: canvas.toDataURL('image/png')
      };
      // Rely on the custom api instance for auth headers.
      await api.post('/card-designs', { templateName, designJson });
      showSuccess('Card design saved successfully');
      setTemplateName('');
      setBgColor('#ffffff');
      setTextColor('#000000');
      setError('');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error saving card design';
      showError(errorMessage);
      setError(errorMessage);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Card Designer</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4">
        <label className="block text-gray-700">Template Name</label>
        <input
          type="text"
          value={templateName}
          onChange={(e) => setTemplateName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Background Color</label>
        <select
          value={bgColor}
          onChange={(e) => setBgColor(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="#ffffff">White</option>
          <option value="#f97316">Orange</option>
          <option value="#000000">Black</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Text Color</label>
        <select
          value={textColor}
          onChange={(e) => setTextColor(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="#000000">Black</option>
          <option value="#f97316">Orange</option>
          <option value="#ffffff">White</option>
        </select>
      </div>
      <div ref={cardRef} className="card-preview mb-4" style={{ backgroundColor: bgColor, color: textColor }}>
        <p>Sample Card Text</p>
      </div>
      <button
        onClick={handleSave}
        className="btn-orange p-2 rounded"
      >
        Save Design
      </button>
    </div>
  );
};

export default CardDesigner;