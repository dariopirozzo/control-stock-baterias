// src/components/AdminUsers.tsx
import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

const AdminUsers: React.FC = () => {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');

  const handleAddUser = () => {
    if (!nickname || password.length < 6) {
      alert('Usuario obligatorio y contraseña mínimo 6 caracteres');
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

    if (usuarios.some((u: any) => u.nickname === nickname)) {
      alert('El usuario ya existe');
      return;
    }

    usuarios.push({ nickname, password });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    alert('Usuario creado correctamente');
    setNickname('');
    setPassword('');
  };

  return (
    <Box display="flex" flexDirection="column" maxWidth={300} mx="auto" mt={5}>
      <Typography variant="h6" mb={2}>Crear Usuario</Typography>
      <TextField label="Usuario" value={nickname} onChange={(e) => setNickname(e.target.value)} margin="normal" />
      <TextField label="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} margin="normal" />
      <Button variant="contained" onClick={handleAddUser}>Crear</Button>
    </Box>
  );
};

export default AdminUsers;
