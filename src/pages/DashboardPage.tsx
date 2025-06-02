import React from 'react';

const DashboardPage: React.FC = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      fontSize: '2em',
      fontWeight: 'bold',
      color: '#333'
    }}>
      <h1>Welcome to the Dashboard!</h1>
    </div>
  );
};

export default DashboardPage;