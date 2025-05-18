
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => navigate('/')}>Volver a Login</button>
    </div>
  );
};

export default HomePage;
