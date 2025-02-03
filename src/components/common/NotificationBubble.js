"use client";
import React from "react";
import { Snackbar, Alert } from "@mui/material";

const NotificationBubble = ({ open, message, severity, onClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        sx={{
          padding: "20px", // Add more padding for a bigger appearance
          fontSize: "1.5rem",
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default NotificationBubble;
