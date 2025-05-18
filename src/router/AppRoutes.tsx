import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../components/LoginPage';
import HomePage from '../pages/HomePage';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
