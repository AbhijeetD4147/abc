import React, { useEffect, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { idleManager } from './IdleManager';

interface IdleWrapperProps {
  children: ReactNode;
}

export const IdleWrapper: React.FC<IdleWrapperProps> = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleIdle = () => {
      // Navigate to login screen when idle
      navigate('/login', { replace: true });
    };

    // Start listening for idle events
    idleManager.startListening({
      onIdle: handleIdle
    });

    // Cleanup on component unmount
    return () => {
      idleManager.stopListening();
    };
  }, [navigate]);

  return <>{children}</>;
};

export default IdleWrapper;