// src/components/Dashboard.tsx
import React from 'react';
import { Typography, Box, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import UserTable from './UserTable'; // Asegúrate de que esta ruta sea correcta

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Aquí podrías limpiar tokens o estado de sesión si los tienes
    navigate('/login'); // o '/' según tu configuración
  };

  return (
    <Container maxWidth="lg">
      <Box display="flex" justifyContent="space-between" alignItems="center" my={4}>
        <Typography variant="h4">¡Bienvenido al Dashboard!</Typography>
        <Button variant="contained" color="secondary" onClick={handleLogout}>
          Cerrar sesión
        </Button>
      </Box>

      {/* Aquí se muestra la tabla */}
      <UserTable />
    </Container>
  );
};

export default Dashboard;
