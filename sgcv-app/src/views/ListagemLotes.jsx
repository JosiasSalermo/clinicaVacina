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

const baseURL = `${BASE_URL}/lotes`;

function ListagemLotes() {
  const navigate = useNavigate();
  const [lotes, setLotes] = useState([]);

  useEffect(() => {
    carregarLotes();
  }, []);

  const carregarLotes = async () => {
    try {
      const response = await axios.get(baseURL);
      setLotes(response.data);
    } catch (error) {
      mensagemErro('Erro ao carregar os lotes.');
    }
  };

  const redirecionarLotes = () => {
    navigate('/CadastroLote');
  };

  const redirecionarEdicao = (id) => {
    navigate(`/CadastroLote/${id}`);
  };

  const excluirLote = async (id) => {
    try {
      await axios.delete(`${baseURL}/${id}`);
      mensagemSucesso('Lote excluído com sucesso!');
      setLotes((prev) => prev.filter((lote) => lote.id !== id));
    } catch (error) {
      mensagemErro('Lote ao excluir o estoque.');
    }
  };

  return (
    <div className="container">
      <Card title="Lotes Cadastrados">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">
              <button
                type="button"
                className="btn btn-warning mb-3"
                onClick={redirecionarLotes}
              >
                Novo Lote
              </button>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Lote</th>
                    <th>Data Validade</th>
                    <th>Ampolas</th>
                    <th>Doses de Ampolas</th>
                    <th>Compra do Lote</th>
                    <th>Vacina</th>
                    <th>Estoque</th>
                  </tr>
                </thead>
                <tbody>
                  {lotes.map((lote) => (
                    <tr key={lote.id}>
                      <td>{lote.id}</td>
                      <td>{lote.cargo}</td>
                      <td>{lote.descricao || '---'}</td>
                      <td>
                        <Stack spacing={1} padding={0} direction="row">
                          <IconButton onClick={() => redirecionarEdicao(lote.id)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton onClick={() => excluirLote(lote.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </Stack>
                      </td>
                    </tr>
                  ))}
                  {lotes.length === 0 && (
                    <tr>
                      <td colSpan="4">Nenhum lote encontrado.</td>
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

export default ListagemLotes;
