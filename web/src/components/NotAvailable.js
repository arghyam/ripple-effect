import React from 'react';

const NotAvailable = () => {
  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      textAlign: 'center',
      flexDirection: 'column',
    },
    message: {
      fontSize: '24px',
      color: 'white',
      marginBottom: '20px',
    },
    svg: {
      width: '150px',
      height: '150px',
      fill: '#F2DFA4', // Light yellow color
    },
  };

  return (
    <div style={styles.container}>
      <svg style={styles.svg} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="30" fill="#F2DFA4" />
        <path d="M32 48c-1.1 0-2-.9-2-2V38H22c-1.1 0-2-.9-2-2s.9-2 2-2h8v-8H22c-1.1 0-2-.9-2-2s.9-2 2-2h8v-8h-6c-1.1 0-2-.9-2-2s.9-2 2-2h6V6c0-1.1.9-2 2-2s2 .9 2 2v6h6c1.1 0 2 .9 2 2s-.9 2-2 2h-6v8h8c1.1 0 2 .9 2 2s-.9 2-2 2h-8v8h8c1.1 0 2 .9 2 2s-.9 2-2 2h-8v8c0 1.1-.9 2-2 2z" fill="#ccc" />
      </svg>
      <div style={styles.message}>Oops! This feature is not available yet.</div>
    </div>
  );
};

export default NotAvailable;
