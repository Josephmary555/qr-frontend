import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { logout } from '../utils/auth';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Use the centralized logout function
    logout();
    toast.success('You have been logged out successfully.');
    navigate('/admin-login');
  };

  return (
    <header className="bg-blue-500 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold">Admin Portal</h1>
      <button onClick={handleLogout} className="btn-secondary">
        Logout
      </button>
    </header>
  );
};

export default Header;
