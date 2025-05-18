import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Stack from "@mui/material/Stack";

import Card from "../components/Card";
import { mensagemSucesso, mensagemErro } from "../components/toastr";
import FormGroup from "../components/FormGroup";



import "../custom.css";
import LoadingOverlay from '../LoadingOverlay';

import axios from "axios";
import { URL_fabricante } from "../config/axios";
import { URL_endereco } from "../config/axios";
import { URL_paciente } from "../config/axios";
import { BASE_URL } from "../config/axios";

function CadastroCompra() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${URL_fabricante}/fabricantes`;

  const [id, setId] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [razaoSocial, setRazaoSocial] = useState('');
  const [nomeFornecedor, setNomeFornecedor] = useState('');
  const [email, setEmail] = useState('');
  const [nomeFabricante, setNomeFabricante] = useState('');
  const [ddd, setDdd] = useState('');
  const [telefone, setTelefone] = useState('');
  const [fotoPerfil, setFotoPerfil] = useState();
  const [logradouro, setLogradouro] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [cep, setCep] = useState('');
  const [uf, setUf] = useState('');
  const [cidades, setCidades] = useState([]);
  const [valor, setValor] = useState([]);
  const [dataCompra, setDataCompra] = useState([]);
  const [nomeVacina, setNomeVacina] = useState('');
  const [tipoVacina, setTipoVacina] = useState('');
  const [dosesAmpola, setDosesAmpola] = useState('');
  const [indicacao, setIndicacao] = useState('');
  const [contraIndicacao, setContraIndicacao] = useState('');
  const [dataValidade, setDataValidade] = useState('');
  const [numeroLote, setNumeroLote] = useState('');
  const [numeroAmpola, setNumeroAmpola] = useState('');
  const [compra, setCompra] = useState('');





  const [loading, setLoading] = useState(true);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setCnpj('');
      setRazaoSocial('');
      setNomeFornecedor('');
      setEmail('');
      setNomeFabricante('');
      setDdd('');
      setTelefone('');
      setFotoPerfil('');
      setLogradouro('');
      setNumero('');
      setComplemento('');
      setCep('');
      setUf('');
      setCidades('');
      setValor('');
      setDataCompra('');
      setNomeVacina('');
      setTipoVacina('');
      setDosesAmpola('');
      setIndicacao('');
      setContraIndicacao('');
      setDataValidade('');
      setNumeroLote('');
      setNumeroAmpola('');
      setCompra('');

    } else if (dados) {
      setId(dados.id);
      setCnpj(dados.cnpj);
      setRazaoSocial(dados.razaoSocial);
      setNomeFornecedor(dados.nomeFornecedor);
      setEmail(dados.email);
      setNomeFabricante(dados.nomeFabricante);
      setDdd(dados.ddd);
      setTelefone(dados.telefone);
      setFotoPerfil(dados.fotoPerfil);
      setLogradouro(dados.logradouro);
      setNumero(dados.numero);
      setComplemento(dados.complemento);
      setCep(dados.cep);
      setUf(dados.uf);
      setCidades(dados.cidades);
      setValor(dados.valor);
      setDataCompra(dados.dataCompra);
      setNomeVacina(dados.nomeVacina);
      setTipoVacina(dados.tipoVacina);
      setDosesAmpola(dados.dosesAmpola);
      setIndicacao(dados.indicacao);
      setContraIndicacao(dados.contraIndicacao);
      setDataValidade(dados.dataValidade);
      setNumeroLote(dados.numeroLote);
      setNumeroAmpola(dados.numeroAmpola);
      setCompra(dados.compra);
    } else {
      buscar();
    }

  }

  async function salvar() {
    let data = { id, cnpj, razaoSocial, nomeFornecedor, email, nomeFabricante, ddd, telefone, fotoPerfil, logradouro, numero, complemento, cep, uf, cidades, valor, dataCompra, nomeVacina, tipoVacina, dosesAmpola, indicacao, contraIndicacao, dataValidade, numeroLote, numeroAmpola, compra };
    data = JSON.stringify(data);

    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Compra ${compra} cadastrada com sucesso!`);
          navigate(`/Compra`);
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
          mensagemSucesso(`Compra ${compra} alterada com sucesso!`);
          navigate(`/Compra`);
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
      setCnpj(response.dados.cnpj);
      setRazaoSocial(response.dados.razaoSocial);
      setNomeFornecedor(response.dados.nomeFornecedor);
      setEmail(response.dados.email);
      setNomeFabricante(response.dados.nomeFabricante);
      setDdd(response.dados.ddd);
      setTelefone(response.dados.telefone);
      setFotoPerfil(response.dados.fotoPerfil);
      setLogradouro(response.dados.logradouro);
      setNumero(response.dados.numero);
      setComplemento(response.dados.complemento);
      setCep(response.dados.cep);
      setUf(response.dados.uf);
      setCidades(response.dados.cidades);
      setValor(response.dados.valor);
      setDataCompra(response.dados.dataCompra);
      setNomeVacina(response.dados.nomeVacina);
      setTipoVacina(response.dados.tipoVacina);
      setDosesAmpola(response.dados.dosesAmpola);
      setIndicacao(response.dados.indicacao);
      setContraIndicacao(response.dados.contraIndicacao);
      setDataValidade(response.dados.dataValidade);
      setNumeroLote(response.dados.numeroLote);
      setNumeroAmpola(response.dados.numeroAmpola);


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
        setCnpj(response.data.cnpj);
        setRazaoSocial(response.data.razaoSocial);
        setNomeFornecedor(response.data.nomeFornecedor);
        setEmail(response.data.email);
        setNomeFabricante(response.data.nomeFabricante);
        setDdd(response.data.ddd);
        setTelefone(response.data.telefone);
        setFotoPerfil(response.data.fotoPerfil);
        setLogradouro(response.data.logradouro);
        setNumero(response.data.numero);
        setComplemento(response.data.complemento);
        setCep(response.data.cep);
        setUf(response.data.uf);
        setCidades(response.data.cidades);
        setValor(response.data.valor);
        setDataCompra(response.data.dataCompra);
        setNomeVacina(response.data.nomeVacina);
        setTipoVacina(response.data.tipoVacina);
        setDosesAmpola(response.data.dosesAmpola);
        setIndicacao(response.data.indicacao);
        setContraIndicacao(response.data.contraIndicacao);
        setDataValidade(response.data.dataValidade);
        setNumeroLote(response.data.numeroLote);
        setNumeroAmpola(response.data.numeroAmpola);
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
    axios.get(`${URL_fabricante}/fabricantes`).then((response) => {
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
    axios.get(`${BASE_URL}/vacinas`).then((response) => {
      setDados3(response.data);
    });
  }, []);

  const [dados4, setDados4] = useState(null);
  useEffect(() => {
    axios.get(`${URL_paciente}/contraIndicacao`).then((response) => {
      setDados4(response.data);
    });
  }, []);



  useEffect(() => {
    buscar();
  }, [id]);


  if (!dados) return null;
  if (!dados2) return null;
  if (!dados3) return null;
  if (!dados4) return null;


  return (
    <div className="container">
      <LoadingOverlay loading={loading} />
      <Card title="Cadastrar Compra">
        <div className="row">
          <div className="col-lg-12">
            <div className="form-row">

              <div className="col-md-12 mb-3">
                <FormGroup label="Nome Fornecedor: *" htmlFor="inputNomeFornecedor">
                  <input
                    type="text"
                    id="inputNomeFornecedor"
                    value={nomeFornecedor}
                    className="form-control"
                    name="nomeFornecedor"
                    onChange={(e) => setNomeFornecedor(e.target.value)}
                  />
                </FormGroup>
              </div>

              <div className="col-md-12 mb-3">
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

              <div className="col-md-12 mb-3">
                <FormGroup label="Razão Social: *" htmlFor="inputCnpj">
                  <input
                    type="text"
                    id="inputCnpj"
                    value={razaoSocial}
                    className="form-control"
                    name="razaoSocial"
                    onChange={(e) => setCnpj(e.target.value)}
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
                  <FormGroup label="Estado: " htmlFor="selectEstado">
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

              <div className="mesmaLinha mb-3">
                <div className="col-md-5" >
                  <FormGroup label="Valor da Compra: *" htmlFor="inputValor">
                    <input
                      type="text"
                      id="inputValor"
                      value={valor}
                      className="form-control"
                      name="valor"
                      inputMode="decimal"
                      pattern="^\d+([.,]\d{1,2})?$"
                      placeholder="R$ 0,00"
                      onChange={(e) => setValor(e.target.value)}
                    />
                  </FormGroup>
                </div>
                <div className="col-md-5">
                  <FormGroup label="Data da Compra: " htmlFor="inputDataCompra">
                    <input
                      type="date"
                      id="inputDataCompra"
                      value={dataCompra}
                      className="form-control"
                      name="dataCompra"
                      onChange={(e) => setDataCompra(e.target.value)}

                    />
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

              <div className="mesmaLinha mb-3">
                <div className="col-md-5" >
                  <FormGroup label="Doses Ampola: " htmlFor="inputDosesAmpola">
                    <input
                      type="number"
                      id="inputDosesAmpola"
                      value={dosesAmpola}
                      className="form-control"
                      name="dosesAmpola"
                      onChange={(e) => setDosesAmpola(e.target.value)}
                    />
                  </FormGroup>
                </div>
                <div className="col-md-5">
                  <FormGroup label="Contra Indicação: " htmlFor="selectContraIndicacao">
                    <select
                      className="form-select"
                      id="selectContraIndicação"
                      name="contraIndicação"
                      value={contraIndicacao}
                      onChange={(e) => setContraIndicacao(e.target.value)}
                    >
                      <option key="0" value="0">
                        Selecione a Contra Indicação
                      </option>
                      {dados4.map((dado) => (
                        <option key={dado.id} value={dado.id}>
                          {dado.contraIndicacao}
                        </option>
                      ))}
                    </select>
                  </FormGroup>
                </div>
              </div>

              <div className="mesmaLinha mb-3">
                <div className="col-md-4" >
                  <FormGroup label="Data Validade: " htmlFor="inputDataValidade">
                    <input
                      type="date"
                      id="inputDataValidade"
                      value={dataValidade}
                      className="form-control"
                      name="dataValidade"
                      onChange={(e) => setDataValidade(e.target.value)}
                    >
                    </input>
                  </FormGroup>
                </div>
                <div className="col-md-4">
                  <FormGroup label="Número Lote: " htmlFor="inputNumeroLote">
                    <input
                      type="number"
                      id="inputNumeroLote"
                      value={numeroLote}
                      className="form-control"
                      name="numeroLote"
                      onChange={(e) => setNumeroLote(e.target.value)}
                    >
                    </input>
                  </FormGroup>
                </div>
                <div className="col-md-2">
                  <FormGroup label="Número Ampola: " htmlFor="inputNumeroAmpola">
                    <input
                      type="number"
                      id="inputNumeroAmpola"
                      value={numeroAmpola}
                      className="form-control"
                      name="numeroAmpola"
                      onChange={(e) => setNumeroAmpola(e.target.value)}
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
      </Card >
    </div >
  );
}

export default CadastroCompra;
