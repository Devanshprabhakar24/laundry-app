// frontend/src/components/Alert.js
import React, { useContext } from 'react';
import { AlertContext } from '../context/alertContext';
import './Alert.css';

const Alert = () => {
  const { alert } = useContext(AlertContext);

  if (!alert) return null;

  return (
    <div className={`alert alert-${alert.type}`}>
      {alert.message}
    </div>
  );
};

export default Alert;
