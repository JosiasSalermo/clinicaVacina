import { useNavigate } from 'react-router-dom';
import Login from './Login';


function LoginComNavegacao(props) {
  const navigate = useNavigate();
  return <Login {...props} navigate={navigate} />;
}

export default LoginComNavegacao;
