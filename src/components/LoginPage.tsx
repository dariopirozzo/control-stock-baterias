import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Login</h1>
      <button onClick={() => navigate('/home')}>Ir a Home</button>
    </div>
  );
};

export default LoginPage;
