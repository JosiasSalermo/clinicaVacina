import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import Card from "../components/Card";
import { mensagemSucesso, mensagemErro } from "../components/toastr";
import FormGroup from "../components/FormGroup";

import "../custom.css";
import LoadingOverlay from "../LoadingOverlay";

import axios from "axios";
import { BASE_URL } from '../config/axios';


function CadastroAgendamento() {
  const { idParam } = useParams();
  const navigate = useNavigate();
  const baseURL = `${BASE_URL}/agendamentos`;

  const [dataAgendamento, setDataAgendamento] = useState('');
  const [horarioAgendamento, setHorarioAgendamento] = useState('');
  const [pacienteId, setPacienteId] = useState('');
  const [descricao, setDescricao] = useState('');
  const [loading, setLoading] = useState(true);
  const [erros, setErros] = useState({});

  async function salvar() {
    const novosErros = {};

    if (!dataAgendamento.trim()) {
      novosErros.dataAgendamento = "Informe a data do agendamento.";
    }

    if (!horarioAgendamento.trim()) {
      novosErros.horarioAgendamento = "Informe o horário do agendamento.";
    }

    if (!pacienteId.trim()) {
      novosErros.pacienteId = "Informe o paciente.";
    }

    setErros(novosErros);
    if (Object.keys(novosErros).length > 0) {
      mensagemErro("Preencha todos os campos obrigatórios corretamente.");
      return;
    }

    const data = {
      dataAgendamento,
      horarioAgendamento,
      pacienteId,
      descricao
    };

    try {
      if (!idParam) {
        await axios.post(baseURL, data);
        mensagemSucesso(`Agendamento cadastrado com sucesso!`);
      } else {
        await axios.put(`${baseURL}/${idParam}`, data);
        mensagemSucesso(`Agendamento atualizado com sucesso!`);
        navigate(`/ListagemAgendamento`);
      }
    } catch (error) {
      mensagemErro(error?.response?.data || "Erro ao salvar agendamento.");
    }
  }

  async function buscar() {
    try {
      const response = await axios.get(`${baseURL}/${idParam}`);
      const agendamento = response.data;
      setDataAgendamento(agendamento.dataAgendamento || '');
      setHorarioAgendamento(agendamento.horarioAgendamento || '');
      setPacienteId(agendamento.pacienteId || '');
      setDescricao(agendamento.descricao || '');
    } catch (error) {
      console.error("Erro ao buscar os dados:", error);
      mensagemErro("Erro ao buscar os dados");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (idParam) {
      buscar();
    } else {
      setLoading(false);
    }
  }, [baseURL, idParam]);

  return (
    <div className="container">
      <LoadingOverlay loading={loading} />
      <Card title="Cadastro de Agendamento">
        <div className="row">
          <div className="col-lg-12">
            <div className="form-row">
              <div className="mesmaLinha">
                <div className="col-md-5 mb-3">
                  <FormGroup label="Data do Agendamento: *" htmlFor="dataAgendamento">
                    <input
                      type="date"
                      id="dataAgendamento"
                      value={dataAgendamento}
                      className={`form-control ${erros.dataAgendamento ? 'is-invalid' : ''}`}
                      onChange={(e) => setDataAgendamento(e.target.value)}
                    />
                    {erros.dataAgendamento && (
                      <div className="invalid-feedback">{erros.dataAgendamento}</div>
                    )}
                  </FormGroup>
                </div>
              </div>

              <div className="mesmaLinha">
                <div className="col-md-5 mb-3">
                  <FormGroup label="Horário: *" htmlFor="horarioAgendamento">
                    <input
                      type="time"
                      id="horarioAgendamento"
                      value={horarioAgendamento}
                      className={`form-control ${erros.horarioAgendamento ? 'is-invalid' : ''}`}
                      onChange={(e) => setHorarioAgendamento(e.target.value)}
                    />
                    {erros.horarioAgendamento && (
                      <div className="invalid-feedback">{erros.horarioAgendamento}</div>
                    )}
                  </FormGroup>
                </div>
              </div>

              <div className="mesmaLinha">
                <div className="col-md-5 mb-3">
                  <FormGroup label="Paciente: *" htmlFor="pacienteId">
                    <input
                      type="text"
                      id="pacienteId"
                      value={pacienteId}
                      className={`form-control ${erros.pacienteId ? 'is-invalid' : ''}`}
                      onChange={(e) => setPacienteId(e.target.value)}
                    />
                    {erros.pacienteId && (
                      <div className="invalid-feedback">{erros.pacienteId}</div>
                    )}
                  </FormGroup>
                </div>
              </div>

              <div className="col-md-12 mb-3">
                <FormGroup label="Descrição (opcional):" htmlFor="descricao">
                  <textarea
                    cols={30}
                    rows={4}
                    id="descricao"
                    value={descricao}
                    className="form-control"
                    onChange={(e) => setDescricao(e.target.value)}
                  />
                </FormGroup>
              </div>

              <Stack spacing={1} padding={1} direction="row">
                <button
                  onClick={salvar}
                  type="button"
                  className="btn btn-success"
                >
                  Salvar
                </button>
                <button
                  onClick={() => navigate('/ListagemAgendamento')}
                  type="button"
                  className="btn btn-danger"
                >
                  Cancelar
                </button>
              </Stack>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default CadastroAgendamento;
