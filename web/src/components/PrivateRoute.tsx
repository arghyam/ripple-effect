import React, { ComponentType } from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  element: ComponentType<any>;
  [key: string]: any;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element: Component, ...rest }) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || 'null');

  return userInfo ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/login" replace state={{ message: 'Please login to access this feature.' }} />
  );
};

export default PrivateRoute;
