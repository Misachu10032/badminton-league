export const formatDate = (timestamp) => {
    const date = new Date(timestamp);
  
    // Options for formatting
    const options = {
      weekday: 'long', // Day of the week (e.g., Monday)
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      timeZone: 'America/Edmonton',
    };
  
    return date.toLocaleDateString('en-US', options);
  };
  