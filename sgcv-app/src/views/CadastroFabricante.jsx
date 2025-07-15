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


function CadastroFabricante() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL}/fabricantes`;


  const [id, setId] = useState('');
  const [nome_fabricante, setNome_fabricante] = useState('');
  const [email, setEmail] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [razaoSocial, setRazaoSocial] = useState('');
  const [ddd, setDdd] = useState('');
  const [telefone, setTelefone] = useState('');
  const [fotoPerfil, setFotoPerfil] = useState();
  const [logradouro, setLogradouro] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [cep, setCep] = useState('');
  const [uf, setUf] = useState('');
  const [cidade, setCidade] = useState('');
  const [nomeVacina, setNomeVacina] = useState('');
  const [tipoVacina, setTipoVacina] = useState('');



  const [loading, setLoading] = useState(true);



  async function salvar() {
    let data = {
      id: id || null,
      nome_fantasia,
      email,
      cnpj,
      razao_social,
      ddd,
      telefone,
      fotoPerfil,
      logradouro,
      numero,
      complemento,
      cep,
      uf,
      cidade,
      nomeVacina: parseInt(nomeVacina) || null,
      tipoVacina: parseInt(tipoVacina) || null,
    };


    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Fabricante ${nome_fabricante} cadastrada com sucesso!`);
          navigate(`/ListagemFabricantes`);
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
          mensagemSucesso(`Fabricante ${nome_fabricante} alterada com sucesso!`);
          navigate(`/ListagemFabricantes`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    }
  }

  async function buscar() {
    try {
      const response = await axios.get(`${baseURL}/${idParam}`);
      const data = response.data;

      setId(data.id);
      setNome_fabricante(data.nome_fabricante);
      setEmail(data.email);

      setCnpj(data.cnpj);
      setRazaoSocial(data.razaoSocial);
      setDdd(data.ddd);
      setTelefone(data.telefone);
      setFotoPerfil(data.fotoPerfil);
      setLogradouro(data.logradouro);
      setNumero(data.numero);
      setComplemento(data.complemento);
      setCep(data.cep);
      setUf(data.uf);
      setCidade(data.cidade);
      setNomeVacina(data.nomeVacina);
      setTipoVacina(data.tipoVacina);
    } catch (error) {
      console.error("Erro ao buscar os dados:", error);
      mensagemErro("Erro ao buscar os dados");
    } finally {
      setLoading(false);
    }
  }




  const [dados, setDados] = useState([]);
  useEffect(() => {
    axios.get(`${BASE_URL}/fabricantes`).then((response) => {
      setDados(response.data);
    });
  }, []);


  const [dados2, setDados2] = useState(null);
  useEffect(() => {
    axios.get(`${BASE_URL}/estados`).then((response) => {
      setDados2(response.data);
    });
  }, []);


  const [dados3, setDados3] = useState(null);
  useEffect(() => {
    axios.get(`${BASE_URL}/vacinas`).then((response) => {
      setDados3(response.data);
    });
  }, []);

  useEffect(() => {
    if (idParam) {
      buscar();
    } else {
      setLoading(false);
    }
  }, [idParam]);





  if (!dados) return null;
  if (!dados2) return null;
  if (!dados3) return null;


  return (
    <div className="container">
      <LoadingOverlay loading={loading} />
      <Card title="Cadastrar Fabricante">
        <div className="row">
          <div className="col-lg-12">
            <div className="form-row">
              <div className="col-md-12 mb-3">
                <FormGroup label="Nome: *" htmlFor="inputNome_fabricante">
                  <input
                    type="text"
                    id="inputNome_fabricante"
                    value={nome_fabricante}
                    className="form-control"
                    name="nome_fabricante"
                    onChange={(e) => setNome_fabricante(e.target.value)}
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
                <FormGroup label="CNPJ: *" htmlFor="inputCnpj">
                  <input
                    type="text"
                    id="inputCnpj"
                    value={cnpj}
                    className="form-control"
                    name="cnpj"
                    onChange={(e) => setCnpj(e.target.value)}
                  />
                </FormGroup>
              </div>

              <div className="col-md-6 mb-3">
                <FormGroup
                  label="Razão Social: "
                  htmlFor="inputRazaoSocial"
                >
                  <input
                    type="text"
                    id="inputRazaoSocial"
                    value={razaoSocial}
                    className="form-control"
                    name="razaoSocial"
                    onChange={(e) => setRazaoSocial(e.target.value)}
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
              </div>

              <div className="col-md-12 mb-3">
                <FormGroup label="Logradouro: " htmlFor="inputLogradouro">
                  <input
                    type="text"
                    maxLength="100"
                    id="inputLogradouro"
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
                      value={numero}
                      className="form-control"
                      name="numero"
                      onChange={(e) => setNumero(e.target.value)}
                    />
                  </FormGroup>
                </div>
                <div className="col-md-5 mb-3">
                  <FormGroup label="Complemento: " htmlFor="inputComplemento">
                    <input
                      type="text"
                      maxLength="100"
                      id="inputComplemento"
                      value={complemento}
                      className="form-control"
                      name="complemento"
                      onChange={(e) => setComplemento(e.target.value)}
                    />
                  </FormGroup>
                </div>
                <div className="col-md-4 mb-3">
                  <FormGroup label="CEP: " htmlFor="inputCep">
                    <input
                      type="text"
                      maxLength="8"
                      id="inputCep"
                      value={cep}
                      className="form-control"
                      name="cep"
                      onChange={(e) => setCep(e.target.value)}
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
                      value={cidade}
                      onChange={(e) => setCidade(e.target.value)}
                    >
                      <option key="0" value="">
                        Selecione a Cidade
                      </option>
                      {dados2
                        .filter((estados) => estados.uf === uf)
                        .map((estados) =>
                          estados.cidade.map((cidade) => (
                            <option key={cidade} value={cidade}>
                              {cidade}
                            </option>
                          ))
                        )}
                    </select>
                  </FormGroup>
                </div>
              </div>

              <div className="mesmaLinha">
                <div className="col-md-5 mb-3">
                  <FormGroup label="Nome Vacina: " htmlFor="selectNomeVacina">
                    <select
                      className="form-select"
                      id="inputNomeVacina"
                      name="nomeVacina"
                      value={nomeVacina}
                      onChange={(e) => setNomeVacina(e.target.value)}
                    >
                      <option key="0" value="0">
                        Selecione o Nome da Vacina
                      </option>
                      {dados3.map((dado) => (
                        <option key={dado.id} value={dado.id}
                        >
                          {dado.nomeVacina}
                        </option>
                      ))}
                    </select>
                  </FormGroup>
                </div>


                <div className="col-md-5 mb-3">
                  <FormGroup label="Tipo de Vacina: " htmlFor="selectTipo">
                    <select
                      className="form-select"
                      id="selectTipo"
                      name="tipoVacina"
                      value={tipoVacina}
                      onChange={(e) => setTipoVacina(e.target.value)}
                    >
                      <option key="0" value="0">
                        Selecione o Tipo de Vacina
                      </option>
                      {dados3.map((dado) => (
                        <option key={dado.id} value={dado.id}
                        >
                          {dado.tipoVacina}
                        </option>
                      ))}
                    </select>
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
              <button type="button" className="btn btn-danger"
                onClick={() => navigate('/ListagemFabricantes')}
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

export default CadastroFabricante;
