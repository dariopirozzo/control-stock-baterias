// src/router/AppRoutes.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../components/Login';
import Dashboard from '../components/Dashboard';
import AdminUsers from '../components/Login';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        {/* otras rutas */}
      </Routes>
    </Router>
  );
}

export default AppRoutes;
