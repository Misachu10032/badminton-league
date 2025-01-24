'use client';
import React, { useEffect, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { onNotification } from '../utils/eventBus';

const NotificationProvider = ({ children }) => {
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');

  useEffect(() => {
    // Listen for notification events
    const handleNotification = ({ message, severity }) => {
        setMessage(message);
        setSeverity(severity); // Set the severity based on the event
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
          autoHideDuration={3000}
          onClose={() => setMessage('')}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={() => setMessage('')} severity={severity} sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default NotificationProvider;
