import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Stack from "@mui/material/Stack";

import Card from "../components/Card";
import { mensagemSucesso, mensagemErro } from "../components/toastr";
import FormGroup from "../components/FormGroup";


import "../custom.css";
import LoadingOverlay from '../LoadingOverlay';

import axios from "axios";
import { BASE_URL } from "../config/axios";
import { URL_paciente } from "../config/axios";
import { URL_funcionario } from "../config/axios";
import { URL_fabricante } from "../config/axios";
import { URL_estado } from "../config/axios";
import { URL_agenda } from "../config/axios";

function CadastroPaciente() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${URL_paciente}/pacientes`;

  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [dataNasc, setDataNasc] = useState('');
  const [ddd, setDdd] = useState('');
  const [telefone, setTelefone] = useState('');
  const [fotoPerfil, setFotoPerfil] = useState();
  const [logradouro, setLogradouro] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [cep, setCep] = useState('');
  const [uf, setUf] = useState('');
  const [cidades, setCidades] = useState([]);
  const [tipoSangue, setTipoSangue] = useState('');
  const [contraIndicacao, setContraIndicacao] = useState('');




  const [loading, setLoading] = useState(true);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setNome('');
      setEmail('');
      setCpf('');
      setDataNasc('');
      setDdd('');
      setTelefone('');
      setFotoPerfil('');
      setLogradouro('');
      setNumero('');
      setComplemento('');
      setCep('');
      setUf('');
      setCidades('');
      setTipoSangue('');
      setContraIndicacao('');
      setContraIndicacao('');

    } else if (dados) {
      setId(dados.id);
      setNome(dados.nome);
      setEmail(dados.email);
      setCpf(dados.cpf);
      setDataNasc(dados.dataNasc);
      setDdd(dados.ddd);
      setTelefone(dados.telefone);
      setFotoPerfil(dados.fotoPerfil);
      setLogradouro(dados.logradouro);
      setNumero(dados.numero);
      setComplemento(dados.complemento);
      setCep(dados.cep);
      setUf(dados.uf);
      setCidades(dados.cidades);
      setTipoSangue(dados.tipoSangue);
      setContraIndicacao(dados.contraIndicacao);

    } else {
      buscar();
    }

  }

  async function salvar() {
    let data = { id, nome, email, cpf, dataNasc, ddd, telefone, fotoPerfil, logradouro, numero, complemento, cep, uf, cidades, tipoSangue, contraIndicacao };
    data = JSON.stringify(data);

    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Paciente ${nome} cadastrada com sucesso!`);
          navigate(`/ListagemPacientes`);
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
          mensagemSucesso(`Paciente ${nome} alterada com sucesso!`);
          navigate(`/ListagemPacientes`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    }
  }

  async function buscar() {
    try {
      const response = await axios.get(`${baseURL}/${idParam}`);
      setDados(response.data);
      setId(response.dados.id);
      setNome(response.dados.nome);
      setEmail(response.dados.email);
      setCpf(response.dados.cpf);
      setDataNasc(response.dados.dataNasc);
      setDdd(response.dados.ddd);
      setTelefone(response.dados.telefone);
      setFotoPerfil(response.dados.fotoPerfil);
      setLogradouro(response.dados.logradouro);
      setNumero(response.dados.numero);
      setComplemento(response.dados.complemento);
      setCep(response.dados.cep);
      setUf(response.dados.uf);
      setCidades(response.dados.cidades);
      setTipoSangue(response.dados.tipoSangue);
      setContraIndicacao(response.dados.contraIndicacao);


    } catch (error) {
      console.error("Erro ao buscar os dados:", error);
    }
  }

  useEffect(() => {
    async function buscar() {
      try {
        const response = await axios.get(`${baseURL}/${idParam}`);
        setDados(response.data);
        setId(response.data.id);
        setNome(response.data.nome);
        setEmail(response.data.email);
        setCpf(response.data.cpf);
        setDataNasc(response.data.dataNasc);
        setDdd(response.data.ddd);
        setTelefone(response.data.telefone);
        setFotoPerfil(response.data.fotoPerfil);
        setLogradouro(response.data.logradouro);
        setNumero(response.data.numero);
        setComplemento(response.data.complemento);
        setCep(response.data.cep);
        setUf(response.data.uf);
        setCidades(response.data.cidades);
        setTipoSangue(response.data.tipoSangue);
        setContraIndicacao(response.data.contraIndicacao);


      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
        mensagemErro("Erro ao buscar os dados");
      } finally {
        setLoading(false);
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
    axios.get(`${URL_paciente}/pacientes`).then((response) => {
      setDados(response.data);
    });
  }, []);


  const [dados2, setDados2] = useState(null);
  useEffect(() => {
    axios.get(`${URL_estado}/estados`).then((response) => {
      setDados2(response.data);
    });
  }, []);

  const [dados3, setDados3] = useState(null);
  useEffect(() => {
    axios.get(`${URL_paciente}/sangue`).then((response) => {
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
      <Card title="Cadastrar Paciente">
        <div className="row">
          <div className="col-lg-12">
            <div className="form-row">
              <div className="col-md-12 mb-3">
                <FormGroup label="Nome: *" htmlFor="inputNome">
                  <input
                    type="text"
                    id="inputNome"
                    value={nome}
                    className="form-control"
                    name="nome"
                    onChange={(e) => setNome(e.target.value)}
                  />
                </FormGroup>
              </div>

              <div className="col-md-12 mb-3">
                <FormGroup label="Email: *" htmlFor="inputEmail">
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

              <div className="col-md-6 mb-3">
                <FormGroup label="CPF: *" htmlFor="inputCPF">
                  <input
                    type="text"
                    id="inputCPF"
                    value={cpf}
                    className="form-control"
                    name="cpf"
                    onChange={(e) => setCpf(e.target.value)}
                  />
                </FormGroup>
              </div>

              <div className="col-md-6 mb-3">
                <FormGroup
                  label="Data de Nascimento: "
                  htmlFor="inputDataNascimento"
                >
                  <input
                    type="date"
                    id="inputDataNascimento"
                    value={dataNasc}
                    className="form-control"
                    name="dataNascimento"
                    onChange={(e) => setDataNasc(e.target.value)}
                  />
                </FormGroup>
              </div>

              <div className="mesmaLinha">
                <div className="col-md-2 mb-3">
                  <FormGroup label="DDD:" htmlFor="inputDDD">
                    <input
                      type="tel"
                      maxLength="2"
                      id="inputDDD"
                      value={ddd}
                      className="form-control"
                      name="ddd"
                      onChange={(e) => setDdd(e.target.value)}
                    />
                  </FormGroup>
                </div>
                <div className="col-md-6 mb-3">
                  <FormGroup label="Telefone: " htmlFor="inputTelefone">
                    <input
                      type="tel"
                      maxLength="9"
                      id="inputTelefone"
                      value={telefone}
                      className="form-control"
                      name="telefone"
                      onChange={(e) => setTelefone(e.target.value)}
                    />
                  </FormGroup>
                </div>
                <div className="col-md-3 mb-3">
                  <FormGroup label="Foto de perfil: " htmlFor="selectFotoPerfil">
                    <input
                      type="file"
                      id="selectFotoPerfil"
                      value={fotoPerfil}
                      className="form-control"
                      name="idFotoPerfil"
                      onChange={(e) => setFotoPerfil(e.target.value)}
                    />
                  </FormGroup>
                </div>
              </div>

              <div className="col-md-12 mb-3">
                <FormGroup label="Logradouro: " htmlFor="inputLogradouro">
                  <input
                    type="text"
                    maxLength="100"
                    id="inputEmail"
                    value={logradouro}
                    className="form-control"
                    name="logradouro"
                    onChange={(e) => setLogradouro(e.target.value)}
                  />
                </FormGroup>
              </div>

              <div className="mesmaLinha">
                <div className="col-md-2 mb-3">
                  <FormGroup label="Número: " htmlFor="inputNumero">
                    <input
                      type="text"
                      maxLength="4"
                      id="inputNumero"
                      className="form-control"
                      name="numero"
                    />
                  </FormGroup>
                </div>
                <div className="col-md-5 mb-3">
                  <FormGroup label="Complemento: " htmlFor="inputComplemento">
                    <input
                      type="text"
                      maxLength="100"
                      id="inputComplemento"
                      className="form-control"
                      name="complemento"
                    />
                  </FormGroup>
                </div>
                <div className="col-md-4 mb-3">
                  <FormGroup label="CEP: " htmlFor="inputCep">
                    <input
                      type="text"
                      maxLength="8"
                      id="inputCep"
                      className="form-control"
                      name="cep"
                    />
                  </FormGroup>
                </div>
              </div>

              <div className="mesmaLinha mb-3">
                <div className="col-md-5" >
                  <FormGroup label="Estado: " htmlFor="inputEstado">
                    <select
                      className="form-select"
                      id="selectUf"
                      name="uf"
                      value={uf}
                      onChange={(e) => setUf(e.target.value)}
                    >
                      <option key="0" value="0">
                        Selecione o Estado
                      </option>
                      {dados2.map((estados) => (
                        <option key={estados.id} value={estados.uf}>
                          {estados.uf}
                        </option>
                      ))}
                    </select>
                  </FormGroup>
                </div>
                <div className="col-md-5">
                  <FormGroup label="Cidade: " htmlFor="selectCidade">
                    <select
                      className="form-select"
                      id="selectCidade"
                      name="cidade"
                      value={cidades}
                      onChange={(e) => setCidades(e.target.value)}
                    >
                      <option key="0" value="0">
                        Selecione a Cidade
                      </option>
                      {dados2
                        .filter((estados) => estados.uf === uf)
                        .map((estados) =>
                          estados.cidades.map((cidades) => (
                            <option key={cidades} value={cidades}>
                              {cidades}
                            </option>
                          ))
                        )}
                    </select>
                  </FormGroup>
                </div>
              </div>

              <div className="mesmaLinha">
                <div className="col-md-5 mb-3">
                  <FormGroup label="Tipo Sanguineo: " htmlFor="selecttipoSangue">
                    <select
                      className="form-select"
                      id="inputTipoSangue"
                      name="tipoSangue"
                      value={tipoSangue}
                      onChange={(e) => setTipoSangue(e.target.value)}
                    >
                      <option key="0" value="0">
                        Selecione o Tipo de Sangue
                      </option>
                      {dados3.map((dado) => (
                        <option key={dado.id} value={dado.id}
                        >
                          {dado.tipoSangue}
                        </option>
                      ))}
                    </select>
                  </FormGroup>
                </div>


                <div className="col-md-5 mb-3">
                  <FormGroup label="Contra Indicação: " htmlFor="selectContraIndicacao">
                    <textarea
                      cols={15}
                      rows={3}
                      type="textarea"
                      id="selectContraIndicacao"
                      value={contraIndicacao}
                      className="form-control"
                      name="contraIndicacao"
                      onChange={(e) => setContraIndicacao(e.target.value)}
                    />
                  </FormGroup>
                </div>
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
      </Card>
    </div>
  );
}

export default CadastroPaciente;
