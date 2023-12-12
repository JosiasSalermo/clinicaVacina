import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Stack from "@mui/material/Stack";

import Card from "../components/Card";
import { mensagemSucesso, mensagemErro } from "../components/toastr";
import FormGroup from "../components/FormGroup";


import "../custom.css";
import LoadingOverlay from '../LoadingOverlay';

import axios from "axios";
import { URL_funcionario } from "../config/axios";
import { URL_endereco } from "../config/axios";

function CadastroFuncionario() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${URL_funcionario}/funcionarios`;

  const [id, setId] = useState('');
  const [nomeFuncionario, setNomeFuncionario] = useState('');
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
  const [cargo, setCargo] = useState('');
  const [perfilAcesso, setPerfilAcesso] = useState('');
  const [especialidade, setEspecialidade] = useState('');
  const [conselho, setConcelho] = useState('');


  const [loading, setLoading] = useState(true);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setNomeFuncionario('');
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
      setCargo('');
      setPerfilAcesso('');
      setEspecialidade('');
      setConcelho('');
    } else if (dados) {
      setId(dados.id);
      setNomeFuncionario(dados.nome);
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
      setCargo(dados.cargo);
      setPerfilAcesso(dados.perfilAcesso);
      setEspecialidade(dados.especialidade);
      setConcelho(dados.conselho);
    } else {
      buscar();
    }

  }

  async function salvar() {
    let data = { id, nomeFuncionario, email, cpf, dataNasc, ddd, telefone, fotoPerfil, logradouro, numero, complemento, cep, uf, cidades, cargo, perfilAcesso, especialidade, conselho };
    data = JSON.stringify(data);

    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Funcionario ${nomeFuncionario} cadastrada com sucesso!`);
          navigate(`/ListagemFuncionarios`);
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
          mensagemSucesso(`Funcionario ${nomeFuncionario} alterada com sucesso!`);
          navigate(`/ListagemFuncionarios`);
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
      setNomeFuncionario(response.dados.nomeFuncionario);
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
      setCargo(response.dados.cargo);
      setPerfilAcesso(response.dados.perfilAcesso);
      setEspecialidade(response.dados.especialidade);
      setConcelho(response.dados.conselho);

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
        setNomeFuncionario(response.data.nomeFuncionario);
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
        setCargo(response.data.cargo);
        setPerfilAcesso(response.data.perfilAcesso);
        setEspecialidade(response.data.especialidade);
        setConcelho(response.data.conselho);
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
    axios.get(`${URL_funcionario}/funcionarios`).then((response) => {
      setDados(response.data);
    });
  }, []);


  const [dados2, setDados2] = useState(null);
  useEffect(() => {
    axios.get(`${URL_endereco}/estados`).then((response) => {
      setDados2(response.data);
    });
  }, []);

  const [dados3, setDados3] = useState(null);
  useEffect(() => {
    axios.get(`${URL_funcionario}/perfil`).then((response) => {
      setDados3(response.data);
    });
  }, []);


  const [dados4, setDados4] = useState(null);
  useEffect(() => {
    axios.get(`${URL_funcionario}/cargos`).then((response) => {
      setDados4(response.data);
    });
  }, []);

  const [dados5, setDados5] = useState(null);
  useEffect(() => {
    axios.get(`${URL_funcionario}/especialidades`).then((response) => {
      setDados5(response.data);
    });
  }, []);

  useEffect(() => {
    buscar();
  }, [id]);


  if (!dados) return null;
  if (!dados2) return null;
  if (!dados3) return null;
  if (!dados4) return null;
  if (!dados5) return null;


  return (
    <div className="container">
      <LoadingOverlay loading={loading} />
      <Card title="Cadastrar Funcionario">
        <div className="row">
          <div className="col-lg-12">
            <div className="form-row">
              <div className="col-md-12 mb-3">
                <FormGroup label="Nome: *" htmlFor="inputNomeFuncionario">
                  <input
                    type="text"
                    id="inputNomeFuncionario"
                    value={nomeFuncionario}
                    className="form-control"
                    name="nomeFuncionario"
                    onChange={(e) => setNomeFuncionario(e.target.value)}
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
                  <FormGroup label="Perfil de acesso: " htmlFor="selectPerfilAcesso">
                    <select
                      className="form-select"
                      id="inputPerfilAcesso "
                      name="perfilAcesso"
                      value={perfilAcesso}
                      onChange={(e) => setPerfilAcesso(e.target.value)}
                    >
                      <option key="0" value="0">
                        Selecione o Perfil de Acesso
                      </option>
                      {dados3.map((dado) => (
                        <option key={dado.id} value={dado.id}
                        >
                          {dado.perfilAcesso}
                        </option>
                      ))}
                    </select>
                  </FormGroup>
                </div>


                <div className="col-md-5 mb-3">
                  <FormGroup label="Cargo do Funcionário: " htmlFor="selectCargoFuncionario">
                    <select
                      className="form-select"
                      id="selectCargoFuncionario "
                      name="cargoFuncionario"
                      value={cargo}
                      onChange={(e) => setCargo(e.target.value)}
                    >
                      <option key="0" value="0">
                        Selecione o Cargo
                      </option>
                      {dados4.map((dado) => (
                        <option key={dado.id} value={dado.id}
                        >
                          {dado.cargo}
                        </option>
                      ))}
                    </select>
                  </FormGroup>
                </div>
              </div>
              <div className="mesmaLinha">
                <div className="col-md-5 mb-3">
                  <FormGroup label="Especialidade: " htmlFor="inputEspecialidade">
                    <select
                      className="form-select"
                      id="inputEspecialidade"
                      name="especialidade"
                      value={especialidade}
                      onChange={(e) => setEspecialidade(e.target.value)}
                    >
                      <option key="0" value="0">
                        Selecione a Especialidade
                      </option>
                      {dados5.map((dado) => (
                        <option key={dado.id} value={dado.id}
                        >
                          {dado.especialidade}
                        </option>
                      ))}
                    </select>
                  </FormGroup>
                </div>
                <div className="col-md-5 mb-3">
                  <FormGroup label="Registro do conselho: " htmlFor="inputRegistroConselho">
                    <input
                      type="text"
                      id="inputRegistroConselho"
                      className="form-control"
                      name="cargoRegistroConselho"
                    >

                    </input>
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

export default CadastroFuncionario;
