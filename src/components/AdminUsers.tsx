import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

type Usuario = {
  id: number;
  nickname: string;
  password: string;
};

const STORAGE_KEY = 'usuariosApp';

const AdminUsers: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [newUser, setNewUser] = useState({ nickname: '', password: '' });
  const navigate = useNavigate();

  // Cargar usuarios desde localStorage al montar
  useEffect(() => {
    const storedUsers = localStorage.getItem(STORAGE_KEY);
    if (storedUsers) {
      setUsuarios(JSON.parse(storedUsers));
    }
  }, []);

  // Guardar usuarios en localStorage cuando cambian
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(usuarios));
  }, [usuarios]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleAddUser = () => {
    if (!newUser.nickname || !newUser.password) {
      alert('Todos los campos son obligatorios');
      return;
    }

    if (newUser.password.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    // Verifica si ya existe un usuario con el mismo nickname
    if (usuarios.some((u) => u.nickname === newUser.nickname)) {
      alert('Ese nombre de usuario ya existe');
      return;
    }

    const nuevoUsuario: Usuario = {
      id: Date.now(),
      nickname: newUser.nickname,
      password: newUser.password,
    };

    setUsuarios([...usuarios, nuevoUsuario]);
    setNewUser({ nickname: '', password: '' });
  };

  return (
    <Box p={4}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Administrar Usuarios</Typography>
        <Button variant="outlined" onClick={() => navigate('/login')}>
          Volver al Login
        </Button>
      </Box>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Crear nuevo usuario
        </Typography>
        <Box display="flex" gap={2} flexWrap="wrap">
          <TextField
            label="Nombre de usuario"
            name="nickname"
            value={newUser.nickname}
            onChange={handleInputChange}
            size="small"
          />
          <TextField
            label="Contraseña"
            name="password"
            type="password"
            value={newUser.password}
            onChange={handleInputChange}
            size="small"
          />
          <Button variant="contained" onClick={handleAddUser}>
            Crear Usuario
          </Button>
        </Box>
      </Paper>

      <Typography variant="h6" gutterBottom>
        Lista de usuarios
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nombre de usuario</TableCell>
            <TableCell>Contraseña</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usuarios.map((usuario) => (
            <TableRow key={usuario.id}>
              <TableCell>{usuario.id}</TableCell>
              <TableCell>{usuario.nickname}</TableCell>
              <TableCell>{usuario.password}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default AdminUsers;
