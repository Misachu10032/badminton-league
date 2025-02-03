"use client";
import React, { useEffect, useState } from "react";
import { onNotification } from "../utils/eventBus";
import NotificationBubble from "../components/common/NotificationBubble";

const NotificationProvider = ({ children }) => {
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  useEffect(() => {
    // Listen for notification events
    const handleNotification = ({ message, severity }) => {
      setMessage(message);
      setSeverity(severity); // Set the severity based on the event
    };

    onNotification(handleNotification);

    return () => {
      // Cleanup listener when the component unmounts
      eventBus.off("notification", handleNotification);
    };
  }, []);

  return (
    <>
      {children}

      <NotificationBubble
        open={Boolean(message)}
        message={message}
        severity={severity}
        onClose={() => setMessage("")}
      />
    </>
  );
};

export default NotificationProvider;
