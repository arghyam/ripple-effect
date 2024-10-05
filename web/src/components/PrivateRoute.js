import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * Higher-order component for protecting routes.
 */
const PrivateRoute = ({ element: Component, ...rest }) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  return userInfo ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/login" replace state={{ message: 'Please login to access this feature.' }} />
  );
};

export default PrivateRoute;
