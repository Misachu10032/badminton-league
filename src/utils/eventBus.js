import mitt from 'mitt';

const eventBus = mitt();

export const triggerNotification = (message) => {
  eventBus.emit('notification', message); // Emit a notification event with a message
};

export const onNotification = (callback) => {
  eventBus.on('notification', callback); // Listen for notification events
};

export default eventBus;
