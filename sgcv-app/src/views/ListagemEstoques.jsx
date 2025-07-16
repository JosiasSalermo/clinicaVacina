import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import { mensagemSucesso, mensagemErro } from '../components/toastr';

import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

const baseURL = `${BASE_URL}/estoques`;

function ListagemEstoques() {
  const navigate = useNavigate();
  const [estoques, setEstoques] = useState([]);

  useEffect(() => {
    carregarEstoques();
  }, []);

  const carregarEstoques = async () => {
    try {
      const response = await axios.get(baseURL);
      setEstoques(response.data);
    } catch (error) {
      mensagemErro('Erro ao carregar os estoques.');
    }
  };

  const redirecionarEstoques = () => {
    navigate('/CadastroEstoque');
  };

  const redirecionarEdicao = (id) => {
    navigate(`/CadastroEstoque/${id}`);
  };

  const excluirEstoque = async (id) => {
    try {
      await axios.delete(`${baseURL}/${id}`);
      mensagemSucesso('Estoque excluído com sucesso!');
      setEstoques((prev) => prev.filter((estoque) => estoque.id !== id));
    } catch (error) {
      mensagemErro('Erro ao excluir o estoque.');
    }
  };

  return (
    <div className="container">
      <Card title="Estoque Cadastrados">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">
              <button
                type="button"
                className="btn btn-warning mb-3"
                onClick={redirecionarEstoques}
              >
                Novo Estoque
              </button>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Quantidade disponível</th>
                    <th>Quantidade mínima</th>
                    <th>Quantidade máxima</th>
                    <th>Pode de ressuprimento</th>
                    <th>Nome do Fabricante</th>
                  </tr>
                </thead>
                <tbody>
                  {estoques.map((estoque) => (
                    <tr key={estoque.id}>
                      <td>{estoque.id}</td>
                      <td>{estoque.cargo}</td>
                      <td>{estoque.descricao || '---'}</td>
                      <td>
                        <Stack spacing={1} padding={0} direction="row">
                          <IconButton onClick={() => redirecionarEdicao(estoque.id)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton onClick={() => excluirEstoque(estoque.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </Stack>
                      </td>
                    </tr>
                  ))}
                  {estoques.length === 0 && (
                    <tr>
                      <td colSpan="4">Nenhum estoque encontrado.</td>
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

export default ListagemEstoques;
