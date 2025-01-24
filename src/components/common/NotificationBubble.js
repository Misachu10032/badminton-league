"use client";
import { useEffect, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { useNotification } from '../../context/NotificationContext';

const NotificationBubble = () => {
  const { id, message } = useNotification(); // Use id to detect changes
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (message) {
      setOpen(true);

      const timer = setTimeout(() => {
        setOpen(false);
      }, 2000);

      return () => clearTimeout(timer); // Cleanup timer
    }
  }, [id, message]); // Depend on both id and message

  return (
    <Snackbar
      open={open}
      autoHideDuration={2000}
      onClose={() => setOpen(false)}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={() => setOpen(false)} severity="success" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default NotificationBubble;
