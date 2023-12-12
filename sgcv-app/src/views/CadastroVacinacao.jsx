import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Stack from "@mui/material/Stack";

import Card from "../components/Card";
import { mensagemSucesso, mensagemErro } from "../components/toastr";
import FormGroup from "../components/FormGroup";

import "../custom.css";
import LoadingOverlay from '../LoadingOverlay';

import axios from "axios";
import { BASE_URL } from '../config/axios';// api-fake-vacina
import { URL_paciente } from '../config/axios';// paciente
import { URL_agenda } from '../config/axios';// agenda


function CadastroVacinacao() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL}/vacinas`;

  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [dataNasc, setDataNasc] = useState('');
  const [ddd, setDDD] = useState('');
  const [telefone, setTelefone] = useState('');
  const [nomeVacina, setNomeVacina] = useState('');
  const [tipoVacina, setTipoVacina] = useState('');
  const [dataVacinacao, setDataVacinacao] = useState('');
  const [horaVacinacao, setHoraVacinacao] = useState('');

  const [loading, setLoading] = useState(true);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setNome('');
      setEmail('');
      setDataNasc('');
      setDDD('');
      setTelefone('');
      setNomeVacina('');
      setTipoVacina('');
      setDataVacinacao('');
      setHoraVacinacao('');

    } else if (dados) {
      setId(dados.id);
      setNome(dados.nome);
      setEmail(dados.email);
      setDataNasc(dados.dataNasc);
      setDDD(dados.ddd || '');
      setTelefone(dados.telefone);
      setNomeVacina(dados.nomeVacina);
      setDataVacinacao(dados.dataVacinacao);
      setHoraVacinacao(dados.dataVecinacao);
    } else {
      buscar();
    }

  }


  async function salvar() {
    let data = { id, nome, email, dataNasc, ddd, telefone, nomeVacina, tipoVacina, dataVacinacao, horaVacinacao };
    data = JSON.stringify(data);

    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Vacinação ${nomeVacina} cadastrada com sucesso!`);
          navigate(`/ListagemVacinacao`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    } else {
      await axios
        .put(`${baseURL}/${idParam}`, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Vacinação ${nomeVacina} alterada com sucesso!`);
          navigate(`/ListagemVacinacao`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    }
  }


  async function buscar() {
    try {
      const response = await axios.get(`${baseURL}/${idParam}`);
      setId(response.dados.id);
      setNome(response.dados.nome); ///
      setEmail(response.dados.email); //
      setDataNasc(response.dados.dataNasc); //
      setDDD(response.dados.ddd); //
      setTelefone(response.dados.telefone); //
      setNomeVacina(response.dados.nomeVacina); //
      setTipoVacina(response.dados.tipoVacina); //
      setDataVacinacao(response.dados.dataVacinacao);
      setHoraVacinacao(response.dados.horaVacinacao);
    } catch (error) {
      console.error("Erro ao buscar os dados:", error);
    }
  }


  useEffect(() => {
    async function buscar() {
      try {
        console.log("Fetching data...");
        const response = await axios.get(`${baseURL}/${idParam}`);
        console.log("Data fetched successfully:", response.data);
        setDados(response.data);
        setId(response.data.id);
        setNome(response.data.nome);
        setEmail(response.data.email);
        setDataNasc(response.data.dataNasc);
        setDDD(response.data.ddd);
        setTelefone(dados.telefone);
        setNomeVacina(response.data.nomeVacina);
        setDataVacinacao(response.data.dataVacinacao);
        setHoraVacinacao(response.data.dataVecinacao);
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
        mensagemErro("Erro ao buscar os dados");
      } finally {
        setLoading(false);
        console.log("Loading set to false");
      }
    }


    if (idParam) {
      buscar();
    } else {
      setLoading(false);
    }
  }, [baseURL, idParam]);


  const [dados, setDados] = useState([]);
  useEffect(() => {
    axios.get(`${BASE_URL}/vacinas`).then((response) => {
      setDados(response.data);
    });
  }, []);


  const [dados2, setDados2] = useState(null); // 
  useEffect(() => {
    axios.get(`${URL_paciente}/pacientes`).then((response) => {
      setDados2(response.data);
    });
  }, []);


  const [dados3, setDados3] = useState(null);
  useEffect(() => {
    axios.get(`${URL_agenda}/agendamento`).then((response) => {
      setDados3(response.data);
    });
  }, []);

  useEffect(() => {
    buscar();
  }, [id]);

  if (!dados) return null;
  if (!dados2) return null;
  if (!dados3) return null;


  return (
    <div className="container">
      <LoadingOverlay loading={loading} />
      <Card title="Cadastro de Vacinação">
        <div className="row">
          <div className="col-lg-12">
            <div className="form-row">


              <div className="mesmaLinha">
                <div className="col-md-5 mb-3">
                  <FormGroup
                    label="Nome: *"
                    htmlFor="inputNome">
                    <input
                      className="form-control"
                      type="text"
                      id="inputNome"
                      name="nome"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                    />
                  </FormGroup>
                </div>

              </div>


              <div className="mesmaLinha">
                <div className="col-md-5 mb-3">
                  <FormGroup
                    label="E-mail: *"
                    htmlFor="inputEmail">
                    <input
                      type="email"
                      id="inputEmail"
                      value={email}
                      className="form-control"
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormGroup>
                </div>
                <div className="col-md-5 mb-3">
                  <FormGroup
                    label="Data Nascimento: *"
                    htmlFor="inputDataNasc">
                    <input
                      type="date"
                      id="inputDate"
                      value={dataNasc}
                      className="form-control"
                      name="dataNasc"
                      onChange={(e) => setDataNasc(e.target.value)}
                    />
                  </FormGroup>
                </div>
              </div>


              <div className="mesmaLinha">
                <div className="col-md-2 mb-3">
                  <FormGroup label="DDD:" htmlFor="inputDDD">
                    <input
                      type="tel"
                      maxLength="2"
                      id="inputDDD"
                      className="form-control"
                      name="ddd"
                    />
                  </FormGroup>
                </div>
                <div className="col-md-5 mb-3">
                  <FormGroup label="Telefone: " htmlFor="inputTelefone">
                    <input
                      type="tel"
                      maxLength="9"
                      id="inputTelefone"
                      className="form-control"
                      name="telefone"
                    />
                  </FormGroup>
                </div>
              </div>


              <div className="mesmaLinha">
                <div className="col-md-5 mb-3">
                  <FormGroup
                    label="Nome da vacina: *"
                    htmlFor="selectNomeVacina"
                  >
                    <select
                      className="form-control"
                      id="selectNomeVacina"
                      name="nomeVacina"
                      value={nomeVacina}
                      onChange={(e) => setNomeVacina(e.target.value)}
                    >
                      <option key="0" value="0">
                        Selecione o Nome da Vacina
                      </option>
                      {dados.map((dado) => (
                        <option key={dado.id} value={dado.id}
                        >
                          {dado.nomeVacina}
                        </option>
                      ))}
                    </select>
                  </FormGroup>
                </div>


                <div className="col-md-5 mb-3">
                  <FormGroup label="Tipo de Vacina: *" htmlFor="selectTipo">
                    <select
                      className="form-select"
                      id="selectTipo"
                      name="tipoVacina"
                      value={tipoVacina}
                      onChange={(e) => setTipoVacina(e.target.value)}>
                      <option key="0" value="0">
                        Selecione o Tipo de Vacina
                      </option>
                      {dados.map((dado) => (
                        <option key={dado.id} value={dado.id}>
                          {dado.tipoVacina}
                        </option>
                      ))}
                    </select>
                  </FormGroup>
                </div>
              </div>


              <div className="mesmaLinha">
                <div className="col-md-5 mb-3">
                  <FormGroup
                    label="Data de Vacinação: "
                    htmlFor="inputDataVacinacao">
                    <input
                      type="date"
                      id="inputDataVacinacao"
                      value={dataVacinacao}
                      className="form-control"
                      name="dataVacinacao"
                      onChange={(e) => setDataVacinacao(e.target.value)}
                    />
                  </FormGroup>
                </div>
                <div className="col-md-5 mb-3">
                  <FormGroup
                    label="Hora da Vacinação: "
                    htmlFor="inputHoraVacinacao">
                    <input
                      type="time"
                      id="inputHoraVacinacao"
                      value={horaVacinacao}
                      className="form-control"
                      name="horaVacinacao"
                      onChange={(e) => setHoraVacinacao(e.target.value)}
                    />
                  </FormGroup>
                </div>
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
                  onClick={inicializar}
                  type="button"
                  className="btn btn-danger"
                >
                  Cancelar
                </button>
              </Stack>
            </div>
          </div>
        </div >
      </Card >
    </div >
  );
}

export default CadastroVacinacao;
