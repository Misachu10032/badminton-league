import mitt from 'mitt';

const eventBus = mitt();

export const triggerNotification = (message,severity="success") => {
  eventBus.emit('notification', { message, severity }); // Emit a notification event with a message
};

export const onNotification = (callback) => {
  eventBus.on('notification', callback); // Listen for notification events
};




export default eventBus;
