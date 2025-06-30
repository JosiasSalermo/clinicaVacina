import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Stack from '@mui/material/Stack';

import Card from '../components/Card';
import FormGroup from '../components/FormGroup';
import { mensagemSucesso, mensagemErro } from '../components/toastr';

import axios from 'axios';
import { URL_paciente } from '../config/axios';

function CadastroAgendamento() {
  const navigate = useNavigate();
  const { idParam } = useParams();

  const [dataAgendamento, setDataAgendamento] = useState('');
  const [horarioAgendamento, setHorarioAgendamento] = useState('');
  const [pacienteId, setPacienteId] = useState('');
  const [pacientes, setPacientes] = useState([]);
  const [erros, setErros] = useState({});
  const [erroCarregado, setErroCarregado] = useState(false);

  useEffect(() => {
    let mounted = true;

    const carregarPacientes = async () => {
      try {
        const resposta = await axios.get(`${URL_paciente}/pacientes`);
        if (mounted) {
          setPacientes(resposta.data);
          setErroCarregado(false);
        }
      } catch (error) {
        if (mounted && !erroCarregado) {
          mensagemErro('Erro ao carregar pacientes.');
          setErroCarregado(true);
        }
      }
    };

    const buscarAgendamento = async () => {
      try {
        const resposta = await axios.get(`${URL_paciente}/agendamento/${idParam}`);
        const agendamento = resposta.data;
        setDataAgendamento(agendamento.data_agendamento || '');
        setHorarioAgendamento(agendamento.horario_agendamento || '');
        setPacienteId(String(agendamento.paciente_id || ''));
      } catch (error) {
        mensagemErro('Erro ao buscar agendamento.');
      }
    };

    carregarPacientes();
    if (idParam) buscarAgendamento();

    return () => {
      mounted = false;
    };
  }, [idParam, erroCarregado]);

  const salvar = async () => {
    const novosErros = {};

    if (!dataAgendamento) novosErros.dataAgendamento = 'Informe a data do agendamento.';
    if (!horarioAgendamento) novosErros.horarioAgendamento = 'Informe o horário do agendamento.';
    if (!pacienteId) novosErros.pacienteId = 'Selecione um paciente.';

    setErros(novosErros);

    if (Object.keys(novosErros).length > 0) {
      mensagemErro('Preencha todos os campos obrigatórios.');
      return;
    }

    const dados = {
      dataAgendamento,
      horarioAgendamento,
      pacienteId: Number(pacienteId),
    };

    try {
      if (!idParam) {
        await axios.post(`${URL_paciente}/agendamento`, dados);
        mensagemSucesso('Agendamento cadastrado com sucesso!');
      } else {
        await axios.put(`${URL_paciente}/agendamento/${idParam}`, dados);
        mensagemSucesso('Agendamento atualizado com sucesso!');
      }
      navigate('/ListagemAgendamento');
    } catch (error) {
      mensagemErro('Erro ao salvar agendamento.');
    }
  };

  return (
    <div>
      <Card title="Cadastrar Agendamento">
        <form>
          <Stack spacing={2}>
            <FormGroup label="Data do Agendamento: *" htmlFor="dataAgendamento">
              <input
                type="date"
                id="dataAgendamento"
                value={dataAgendamento}
                onChange={e => setDataAgendamento(e.target.value)}
                className={`form-control ${erros.dataAgendamento ? 'is-invalid' : ''}`}
              />
              {erros.dataAgendamento && (
                <div className="invalid-feedback">{erros.dataAgendamento}</div>
              )}
            </FormGroup>

            <FormGroup label="Horário do Agendamento: *" htmlFor="horarioAgendamento">
              <input
                type="time"
                id="horarioAgendamento"
                value={horarioAgendamento}
                onChange={e => setHorarioAgendamento(e.target.value)}
                className={`form-control ${erros.horarioAgendamento ? 'is-invalid' : ''}`}
              />
              {erros.horarioAgendamento && (
                <div className="invalid-feedback">{erros.horarioAgendamento}</div>
              )}
            </FormGroup>

            <FormGroup label="Paciente: *" htmlFor="pacienteId">
              <select
                id="pacienteId"
                className={`form-control ${erros.pacienteId ? 'is-invalid' : ''}`}
                value={pacienteId}
                onChange={e => setPacienteId(e.target.value)}
              >
                <option value="">Selecione o Paciente</option>
                {pacientes.map(paciente => (
                  <option key={paciente.id} value={paciente.id}>
                    {paciente.nome}
                  </option>
                ))}
              </select>
              {erros.pacienteId && (
                <div className="invalid-feedback">{erros.pacienteId}</div>
              )}
            </FormGroup>

            <Stack direction="row" spacing={2}>
              <button type="button" className="btn btn-success" onClick={salvar}>
                Salvar
              </button>
              <button type="button" className="btn btn-danger" onClick={() => navigate('/ListagemAgendamento')}>
                Cancelar
              </button>
            </Stack>
          </Stack>
        </form>
      </Card>
    </div>
  );
}

export default CadastroAgendamento;
