import React from 'react';
import { Box, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box sx={{ textAlign: 'center', py: 3, mt: 5, background: '#f0f0f0' }}>
      <Typography variant="body2" color="textSecondary">
        © {new Date().getFullYear()} LaundryPro. All rights reserved.
      </Typography>
    </Box>
  );
}
