import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

import Card from '../components/Card';
import FormGroup from '../components/FormGroup';
import { mensagemSucesso, mensagemErro } from '../components/toastr';

import axios from 'axios';
import { URL_paciente } from '../config/axios';

function CadastroAgendamento() {
  const navigate = useNavigate();
  const { idParam } = useParams();

  const [dataAgendamento, setDataAgendamento] = useState(null);
  const [horarioAgendamento, setHorarioAgendamento] = useState('');
  const [pacienteId, setPacienteId] = useState('');
  const [pacientes, setPacientes] = useState([]);
  const [erros, setErros] = useState({});
  const [erroCarregado, setErroCarregado] = useState(false);

  const horariosDisponiveis = {
    'default': [
      '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
      '11:00', '13:30', '14:00', '14:30', '15:00', '15:30'
    ]
  };

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
        setDataAgendamento(dayjs(agendamento.data_agendamento));
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

    if (!dataAgendamento) {
      novosErros.dataAgendamento = 'Informe a data do agendamento.';
    } else {
      const hoje = dayjs().startOf('day');
      if (dataAgendamento.isBefore(hoje)) {
        novosErros.dataAgendamento = 'A data deve ser futura.';
      }
    }

    if (!horarioAgendamento) {
      novosErros.horarioAgendamento = 'Selecione um horário disponível.';
    }

    if (!pacienteId) {
      novosErros.pacienteId = 'Selecione um paciente.';
    }

    setErros(novosErros);
    if (Object.keys(novosErros).length > 0) {
      mensagemErro('Preencha todos os campos obrigatórios corretamente.');
      return;
    }

    const dados = {
      dataAgendamento: dataAgendamento.format('YYYY-MM-DD'),
      horarioAgendamento: horarioAgendamento.trim(),
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

  const horariosParaData = () => {
    return horariosDisponiveis['default'];
  };

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Card title="Agendar Consulta">
          <form>
            <Stack spacing={2}>
              <FormGroup label="Data do Agendamento: *" htmlFor="dataAgendamento">
                <DatePicker
                  value={dataAgendamento}
                  onChange={setDataAgendamento}
                  format="DD/MM/YYYY"
                  slotProps={{ textField: { fullWidth: true, error: !!erros.dataAgendamento, helperText: erros.dataAgendamento } }}
                  disablePast
                />
              </FormGroup>

              <FormGroup label="Horário Disponível: *" htmlFor="horarioAgendamento">
                <TextField
                  select
                  id="horarioAgendamento"
                  value={horarioAgendamento}
                  onChange={e => setHorarioAgendamento(e.target.value)}
                  fullWidth
                  error={!!erros.horarioAgendamento}
                  helperText={erros.horarioAgendamento}
                >
                  <MenuItem value="">Selecione o horário</MenuItem>
                  {horariosParaData().map(horario => (
                    <MenuItem key={horario} value={horario}>{horario}</MenuItem>
                  ))}
                </TextField>
              </FormGroup>

              <FormGroup label="Paciente: *" htmlFor="pacienteId">
                <TextField
                  select
                  id="pacienteId"
                  value={pacienteId}
                  onChange={e => setPacienteId(e.target.value)}
                  fullWidth
                  error={!!erros.pacienteId}
                  helperText={erros.pacienteId}
                >
                  <MenuItem value="">Selecione o Paciente</MenuItem>
                  {pacientes.map(p => (
                    <MenuItem key={p.id} value={p.id}>{p.nome}</MenuItem>
                  ))}
                </TextField>
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
      </LocalizationProvider>


    </div >
  );
}

export default CadastroAgendamento;
