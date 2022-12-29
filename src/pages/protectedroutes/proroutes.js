import React from 'react';
import { Navigate } from 'react-router-dom';

export default function Proroutes({ children, user }) {
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
}
