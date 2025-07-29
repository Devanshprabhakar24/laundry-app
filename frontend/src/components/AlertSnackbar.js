import React, { useContext } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { AlertContext } from '../context/alertContext';

export default function AlertSnackbar() {
  const { alert, hideAlert } = useContext(AlertContext);

  return (
    <Snackbar
      open={!!alert}
      autoHideDuration={4000}
      onClose={hideAlert}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      {alert && (
        <Alert onClose={hideAlert} severity={alert.type} variant="filled">
          {alert.message}
        </Alert>
      )}
    </Snackbar>
  );
}
