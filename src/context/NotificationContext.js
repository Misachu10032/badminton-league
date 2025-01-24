'use client';
import React, { useEffect, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { onNotification } from '../utils/eventBus';

const NotificationProvider = ({ children }) => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Listen for notification events
    const handleNotification = (msg) => {
      setMessage(msg);
    };

    onNotification(handleNotification);

    return () => {
      // Cleanup listener when the component unmounts
      eventBus.off('notification', handleNotification);
    };
  }, []);

  return (
    <>
      {children}
      {message && (
        <Snackbar
          open
          autoHideDuration={2000}
          onClose={() => setMessage('')}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={() => setMessage('')} severity="success" sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default NotificationProvider;
