// src/components/Login.tsx
import React from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

type LoginFormInputs = {
  nickname: string;
  password: string;
};

const validationSchema = Yup.object().shape({
  nickname: Yup.string().required('El nombre de usuario es obligatorio'),
  password: Yup.string()
    .required('La contraseña es obligatoria')
    .min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

const Login: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: LoginFormInputs) => {
    console.log('Datos enviados:', data);
    // Aquí iría la lógica de autenticación (API, JWT, etc.)
    navigate('/dashboard');
  };

  return (
    <Box
      sx={{
        backgroundImage: 'url(/background_login.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backdropFilter: 'blur(4px)',
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          display: 'flex',
          flexDirection: 'column',
          width: 300,
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Iniciar sesión
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            label="Nombre de usuario"
            fullWidth
            margin="normal"
            {...register('nickname')}
            error={!!errors.nickname}
            helperText={errors.nickname?.message}
          />

          <TextField
            label="Contraseña"
            type="password"
            fullWidth
            margin="normal"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            sx={{ mt: 2 }}
          >
            INGRESAR
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
