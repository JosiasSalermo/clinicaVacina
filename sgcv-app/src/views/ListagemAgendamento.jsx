import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import { mensagemErro, mensagemSucesso } from '../components/toastr';

import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import axios from 'axios';
import { URL_paciente } from '../config/axios';

const baseURL = `${URL_paciente}/agendamento`;
const pacienteURL = `${URL_paciente}/pacientes`;

function ListagemAgendamento() {
  const navigate = useNavigate();
  const [agendamentos, setAgendamentos] = useState([]);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const [resAgendamento, resPacientes] = await Promise.all([
        axios.get(baseURL),
        axios.get(pacienteURL)
      ]);

      const mapaPacientes = resPacientes.data.reduce((map, p) => {
        map[p.id] = p.nome;
        return map;
      }, {});

      const agendamentosComNome = resAgendamento.data.map((a) => ({
        ...a,
        nomePaciente: mapaPacientes[a.paciente_id] || 'Não encontrado'
      }));

      setAgendamentos(agendamentosComNome);
    } catch (error) {
      mensagemErro('Erro ao carregar dados dos agendamentos ou pacientes.');
    }
  };

  const redirecionarCadastro = () => {
    navigate('/CadastroAgendamento');
  };

  const redirecionarEdicao = (id) => {
    navigate(`/CadastroAgendamento/${id}`);
  };

  const excluirAgendamento = async (id) => {
    try {
      await axios.delete(`${baseURL}/${id}`);
      mensagemSucesso('Agendamento excluído com sucesso!');
      setAgendamentos((prev) => prev.filter((a) => a.id !== id));
    } catch (error) {
      mensagemErro('Erro ao excluir agendamento.');
    }
  };

  return (
    <div className="container">
      <Card title="Agendamentos">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">
              <button
                type="button"
                className="btn btn-warning mb-3"
                onClick={redirecionarCadastro}
              >
                Novo Agendamento
              </button>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Data</th>
                    <th>Horário</th>
                    <th>Paciente</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {agendamentos.map((agendamento) => (
                    <tr key={agendamento.id}>
                      <td>{agendamento.id}</td>
                      <td>{agendamento.data_agendamento}</td>
                      <td>{agendamento.horario_agendamento}</td>
                      <td>{agendamento.nomePaciente}</td>
                      <td>
                        <Stack spacing={1} padding={0} direction="row">
                          <IconButton onClick={() => redirecionarEdicao(agendamento.id)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton onClick={() => excluirAgendamento(agendamento.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </Stack>
                      </td>
                    </tr>
                  ))}
                  {agendamentos.length === 0 && (
                    <tr>
                      <td colSpan="5">Nenhum agendamento encontrado.</td>
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

export default ListagemAgendamento;
