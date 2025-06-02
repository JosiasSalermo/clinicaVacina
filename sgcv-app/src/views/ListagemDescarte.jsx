import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import { mensagemSucesso, mensagemErro } from '../components/toastr';
import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { BASE_URL } from '../config/axios';

const descarteURL = `${BASE_URL}/descarte`;

function ListagemDescarte() {
  const navigate = useNavigate();

  const [descartes, setDescartes] = useState([]);

  const carregarDescartes = async () => {
    try {
      const response = await axios.get(descarteURL);
      setDescartes(response.data);
    } catch (error) {
      console.error('Erro ao carregar descartes:', error);
      mensagemErro('Erro ao carregar descartes.');
    }
  };

  useEffect(() => {
    carregarDescartes();
  }, []);

  const redirecionarCadastro = () => {
    navigate('/CadastroDescarte');
  };

  const redirecionarEdicao = (id) => {
    navigate(`/CadastroDescarte/${id}`);
  };

  const excluirDescarte = async (id) => {
    try {
      await axios.delete(`${descarteURL}/${id}`);
      mensagemSucesso('Descarte excluído com sucesso!');
      setDescartes((prev) => prev.filter((d) => d.id !== id));
    } catch (error) {
      mensagemErro('Erro ao excluir o descarte.');
    }
  };

  return (
    <div className="container">
      <Card title="Listagem de Descartes">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">
              <button
                type="button"
                className="btn btn-warning"
                onClick={redirecionarCadastro}
              >
                Novo Descarte
              </button>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Quantidade</th>
                    <th>Data</th>
                    <th>Motivo</th>
                    <th>Estoque ID</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {descartes.map((descarte) => (
                    <tr key={descarte.id}>
                      <td>{descarte.quantidade_descarte}</td>
                      <td>{descarte.data || '-'}</td>
                      <td>{descarte.motivo || '-'}</td>
                      <td>{descarte.estoque_id}</td>
                      <td>
                        <Stack spacing={1} padding={0} direction="row">
                          <IconButton onClick={() => redirecionarEdicao(descarte.id)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton onClick={() => excluirDescarte(descarte.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </Stack>
                      </td>
                    </tr>
                  ))}
                  {descartes.length === 0 && (
                    <tr>
                      <td colSpan="5">Nenhum descarte cadastrado.</td>
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

export default ListagemDescarte;
