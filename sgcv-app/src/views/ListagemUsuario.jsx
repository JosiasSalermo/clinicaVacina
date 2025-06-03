import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import { mensagemSucesso, mensagemErro } from '../components/toastr';

import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import axios from 'axios';
import { URL_usuario } from '../config/axios';

const baseURL = `${URL_usuario}/usuarios`;

function ListagemUsuarios() {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);

  const carregarUsuarios = async () => {
    try {
      const response = await axios.get(baseURL);
      setUsuarios(response.data);
    } catch (error) {
      mensagemErro('Erro ao carregar os usuários.');
    }
  };

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const redirecionarCadastro = () => {
    navigate('/CadastroUsuario');
  };

  const redirecionarEdicao = (id) => {
    navigate(`/CadastroUsuario/${id}`);
  };

  const excluirUsuario = async (id) => {
    try {
      await axios.delete(`${baseURL}/${id}`);
      mensagemSucesso('Usuário excluído com sucesso!');
      setUsuarios((prev) => prev.filter((usuario) => usuario.id !== id));
    } catch (error) {
      mensagemErro('Erro ao excluir o usuário.');
    }
  };

  return (
    <div className="container">
      <Card title="Usuários">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">
              <button
                type="button"
                className="btn btn-warning"
                onClick={redirecionarCadastro}
              >
                Novo Usuário
              </button>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Login</th>
                    <th>CPF</th>
                    <th>Administrador</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map((usuario) => (
                    <tr key={usuario.id}>
                      <td>{usuario.login}</td>
                      <td>{usuario.cpf}</td>
                      <td>{usuario.admin ? 'Sim' : 'Não'}</td>
                      <td>
                        <Stack spacing={1} padding={0} direction="row">
                          <IconButton onClick={() => redirecionarEdicao(usuario.id)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton onClick={() => excluirUsuario(usuario.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </Stack>
                      </td>
                    </tr>
                  ))}
                  {usuarios.length === 0 && (
                    <tr>
                      <td colSpan="4">Nenhum usuário cadastrado.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ListagemUsuarios;
