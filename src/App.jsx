import React, { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage';
import WaitingPage from './components/WaitingPage';
import UserPage from './components/UserPage';
import AdminPage from './components/AdminPage';

function App() {
  const [isConnecting, setIsConnecting] = useState(true);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    // Simulate connecting to server
    setTimeout(() => {
      setIsConnecting(false);
    }, 5000);
  }, []);

  const handleLogin = (type) => {
    setUserType(type);
  };

  const handleLogout = () => {
    setUserType(null);
  };

  if (isConnecting) {
    return <WaitingPage />;
  }

  if (!userType) {
    return <LoginPage onLogin={handleLogin} />;
  }

  if (userType === 'user') {
    return <UserPage onLogout={handleLogout} />;
  }

  if (userType === 'admin') {
    return <AdminPage onLogout={handleLogout} />;
  }

  return null;
}

export default App;
