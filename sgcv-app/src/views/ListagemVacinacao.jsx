import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css'

import { useNavigate } from 'react-router-dom';
import LoadingOverlay from '../LoadingOverlay';

import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

const baseURL = `${BASE_URL}/agendamento`;


function ListagemVacinacao() {
  const navigate = useNavigate();

  const cadastrar = () => {
    navigate(`/CadastroVacinacao`);
  };

  const editar = (id) => {
    navigate(`/CadastroVacinacao/${id}`);
  };

  const [dados, setDados] = useState(null);
  const [loading, setLoading] = useState(true);

  async function excluir(id) {
    let data = JSON.stringify({ id });
    let url = `${baseURL}/${id}`;
    console.log(url);
    await axios
      .delete(url, data, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then(function (response) {
        mensagemSucesso(`Vacinação excluído com sucesso!`);
        setDados(
          dados.filter((dado) => {
            return dado.id !== id;
          })
        );
      })
      .catch(function (error) {
        mensagemErro(`Erro ao excluir a vacinação`);
      });
  }



  useEffect(() => {
    axios.get(baseURL)
      .then((response) => {
        setDados(response.data);
        setLoading(false);
      })
      .catch((error) => {
        mensagemErro(`Erro ao obter dados de vacinação: ${error.message}`);
        setLoading(false);
      });
  }, []);
 
  if (!dados) return null;

  return (
    <div className='container'>
      <LoadingOverlay loading={loading} />
      <Card title='Vacinação do Dia'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <button
                type='button'
                className='btn btn-warning'
                onClick={() => cadastrar()}
              >
                Nova Vacinação
              </button>
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th scope='col'>Nome Paciente</th>
                    <th scope='col'>Data</th>
                    <th scope='col'>Hora</th>
                    <th scope='col'>Nome da Vacina</th>
                  </tr>
                </thead>
                <tbody>
                  {dados.map((dado) => (
                    <tr key={dado.id}>
                      <td>{dado.nome}</td>
                      <td>{dado.dataVacinacao}</td>
                      <td>{dado.horaVacinacao}</td>
                      <td>{dado.nomeVacina}</td>
                      <td>
                        <Stack spacing={1} padding={0} direction='row'>
                          <IconButton
                            aria-label='edit'
                            onClick={() => editar(dado.id)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            aria-label='delete'
                            onClick={() => excluir(dado.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Stack>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>{' '}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ListagemVacinacao;
