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

const baseURL = `${BASE_URL}/cargos`;

function ListagemCargos() {
  const navigate = useNavigate();
  const [cargos, setCargos] = useState([]);

  useEffect(() => {
    carregarCargos();
  }, []);

  const carregarCargos = async () => {
    try {
      const response = await axios.get(baseURL);
      setCargos(response.data);
    } catch (error) {
      mensagemErro('Erro ao carregar os cargos.');
    }
  };

  const redirecionarCadastro = () => {
    navigate('/CadastroCargo');
  };

  const redirecionarEdicao = (id) => {
    navigate(`/CadastroCargo/${id}`);
  };

  const excluirCargo = async (id) => {
    try {
      await axios.delete(`${baseURL}/${id}`);
      mensagemSucesso('Cargo excluído com sucesso!');
      setCargos((prev) => prev.filter((cargo) => cargo.id !== id));
    } catch (error) {
      mensagemErro('Erro ao excluir o cargo.');
    }
  };

  return (
    <div className="container">
      <Card title="Cargos Cadastrados">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">
              <button
                type="button"
                className="btn btn-warning mb-3"
                onClick={redirecionarCadastro}
              >
                Novo Cargo
              </button>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nome do Cargo</th>
                    <th>Descrição</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {cargos.map((cargo) => (
                    <tr key={cargo.id}>
                      <td>{cargo.id}</td>
                      <td>{cargo.cargo}</td>
                      <td>{cargo.descricao || '---'}</td>
                      <td>
                        <Stack spacing={1} padding={0} direction="row">
                          <IconButton onClick={() => redirecionarEdicao(cargo.id)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton onClick={() => excluirCargo(cargo.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </Stack>
                      </td>
                    </tr>
                  ))}
                  {cargos.length === 0 && (
                    <tr>
                      <td colSpan="4">Nenhum cargo encontrado.</td>
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

export default ListagemCargos;
