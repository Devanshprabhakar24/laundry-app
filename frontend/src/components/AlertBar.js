import React, { useContext } from 'react';
import { Alert, Snackbar } from '@mui/material';
import { AlertContext } from '../context/alertContext';

export default function AlertBar() {
  const { alert, hideAlert } = useContext(AlertContext);

  return (
    <Snackbar
      open={!!alert}
      autoHideDuration={5000}
      onClose={hideAlert}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      {alert && <Alert severity={alert.type}>{alert.message}</Alert>}
    </Snackbar>
  );
}
