// src/components/Dashboard.tsx
import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Aquí podrías limpiar tokens o estado de sesión si los tienes
    navigate('/login');
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      gap={2}
    >
      <Typography variant="h4">¡Bienvenido al Dashboard!</Typography>
      <Button variant="contained" color="secondary" onClick={handleLogout}>
        Cerrar sesión
      </Button>
    </Box>
  );
};

export default Dashboard;
