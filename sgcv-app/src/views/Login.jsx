import React from 'react';
import Stack from '@mui/material/Stack';
import Card from '../components/Card';
import FormGroup from '../components/FormGroup';

import axios from 'axios';
import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

// Componente principal
class Login extends React.Component {
  state = {
    login: '',
    senha: '',
    carregando: false,
  };

  componentDidMount() {
    document.body.classList.add('login-page');
  }

  componentWillUnmount() {
    document.body.classList.remove('login-page');
  }

  logar = async () => {
    const { login, senha } = this.state;

    if (!login || !senha) {
      mensagemErro('Informe o login e a senha.');
      return;
    }

    this.setState({ carregando: true });

    try {
      const response = await axios.post('http://localhost:8081/api/v1/usuarios/auth', {
        login,
        senha,
      });

      const token = response.data.token;

      // Armazena o token e define header global
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      mensagemSucesso(`Usuário ${login} logado com sucesso!`);

      // Redireciona com navigate (React Router v6)
      this.props.navigate('/agendamentos');

    } catch (error) {
      if (error.response?.status === 401) {
        mensagemErro('Login ou senha inválidos.');
      } else {
        mensagemErro('Erro ao tentar fazer login.');
      }
    } finally {
      this.setState({ carregando: false });
    }
  };

  cancelar = () => {
    this.setState({
      login: '',
      senha: '',
    });
  };

  render() {
    const { login, senha, carregando } = this.state;

    return (
      <div className='container'>
        <div className='col-lg-4'>
          <Card title='Acesso'>
            <div className='row'>
              <div className='bs-component'>
                <FormGroup label='Login: *' htmlFor='inputLogin'>
                  <input
                    type='text'
                    id='inputLogin'
                    value={login}
                    className='form-control'
                    name='login'
                    onChange={(e) => this.setState({ login: e.target.value })}
                  />
                </FormGroup>
                <FormGroup label='Senha: *' htmlFor='inputSenha'>
                  <input
                    type='password'
                    id='inputSenha'
                    value={senha}
                    className='form-control'
                    name='senha'
                    onChange={(e) => this.setState({ senha: e.target.value })}
                  />
                </FormGroup>
                <Stack spacing={1} padding={1} direction='row'>
                  <button
                    onClick={this.logar}
                    type='button'
                    className='btn btn-success'
                    disabled={carregando}
                  >
                    {carregando ? 'Entrando...' : 'Entrar'}
                  </button>
                  <button
                    onClick={this.cancelar}
                    type='button'
                    className='btn btn-danger'
                  >
                    Cancelar
                  </button>
                </Stack>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }
}

export default Login;
