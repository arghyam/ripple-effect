import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  element: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || 'null');

  return userInfo ? ( element ) : ( <Navigate to="/login" replace state={{ message: 'Please login to access this feature.' }} /> );
};

export default PrivateRoute;
