import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import Card from '../components/Card';
import FormGroup from '../components/FormGroup';
import { mensagemSucesso, mensagemErro } from '../components/toastr';

import Stack from '@mui/material/Stack';
import { BASE_URL } from '../config/axios';

const baseURL = `${BASE_URL}/usuarios`;

function CadastroUsuario() {
  const { idParam } = useParams();
  const navigate = useNavigate();

  const [login, setLogin] = useState('');
  const [cpf, setCpf] = useState('');
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    if (idParam) {
      const buscar = async () => {
        try {
          const response = await axios.get(`${baseURL}/${idParam}`);
          const usuario = response.data;
          setLogin(usuario.login);
          setCpf(usuario.cpf);
          setAdmin(usuario.admin);
        } catch (error) {
          mensagemErro('Erro ao carregar os dados do usuário.');
        }
      };

      buscar();
    }
  }, [idParam]);

  const salvar = async () => {
    const data = { login, cpf, admin };

    try {
      if (idParam) {
        await axios.put(`${baseURL}/${idParam}`, data);
        mensagemSucesso('Usuário atualizado com sucesso!');
      } else {
        await axios.post(baseURL, data);
        mensagemSucesso('Usuário cadastrado com sucesso!');
      }
      navigate('/ListagemUsuarios');
    } catch (error) {
      mensagemErro('Erro ao salvar usuário.');
    }
  };

  return (
    <div className="container">
      <Card title={idParam ? 'Editar Usuário' : 'Cadastrar Usuário'}>
        <form>
          <div className="row">
            <div className="col-md-6 mb-3">
              <FormGroup label="Login: *" htmlFor="inputLogin">
                <input
                  type="text"
                  id="inputLogin"
                  className="form-control"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  required
                />
              </FormGroup>
            </div>
            <div className="col-md-6 mb-3">
              <FormGroup label="CPF: *" htmlFor="inputCpf">
                <input
                  type="text"
                  id="inputCpf"
                  className="form-control"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  required
                />
              </FormGroup>
            </div>
          </div>

          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              checked={admin}
              onChange={(e) => setAdmin(e.target.checked)}
              id="checkAdmin"
            />
            <label className="form-check-label" htmlFor="checkAdmin">
              Administrador
            </label>
          </div>

          <Stack spacing={1} padding={1} direction="row">
            <button type="button" className="btn btn-success" onClick={salvar}>
              Salvar
            </button>
            <button type="button" className="btn btn-danger" onClick={() => navigate('/ListagemUsuarios')}>
              Cancelar
            </button>
          </Stack>
        </form>
      </Card>
    </div>
  );
}

export default CadastroUsuario;
