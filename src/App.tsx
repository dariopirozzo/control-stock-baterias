// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AdminUsers from './components/AdminUsers'; // si tenés esta vista
import UserTable from './components/UserTable';   // o cualquier otro componente

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/garantias" element={<UserTable />} />
        {/* Agregá más rutas según necesites */}
      </Routes>
    </Router>
  );
};

export default App;
