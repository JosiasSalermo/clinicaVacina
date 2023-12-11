import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Stack from "@mui/material/Stack";

import Card from "../components/Card";
import { mensagemSucesso, mensagemErro } from "../components/toastr";
import FormGroup from "../components/FormGroup";

import "../custom.css";
import LoadingOverlay from '../LoadingOverlay';

import axios from "axios";
import { BASE_URL } from '../config/axios';
import { URL_fabricante } from "../config/axios";

function CadastroVacina() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL}/vacina`;

  const [id, setId] = useState('');
  const [nomeVacina, setNomeVacina] = useState('');
  const [descricao, setDescricao] = useState('');
  const [numeroLote, setNumeroLote] = useState('');
  const [dataValidade, setDataValidade] = useState('');
  const [dosesAmpola, setDosesAmpola] = useState('');
  const [tipoVacina, setTipoVacina] = useState('');
  const [nomeFabricante, setNomeFabricante] = useState('');

  const [loading, setLoading] = useState(true);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setNomeVacina('');
      setDescricao('');
      setNumeroLote('');
      setDataValidade('');
      setDosesAmpola('');
      setTipoVacina('');
      setNomeFabricante('');
    } else if(dados) {
      setId(dados.id);
      setNomeVacina(dados.nomeVacina);
      setDescricao(dados.descricao);
      setNumeroLote(dados.numeroLote);
      setDataValidade(dados.dataValidade);
      setDosesAmpola(dados.dosesAmpola);
      setTipoVacina(dados.tipoVacina);
      setNomeFabricante(dados.nomeFabricante);
    } else{
      buscar();
    }
  }


  async function salvar() {
    let data = { id, nomeVacina, descricao, numeroLote, dataValidade, dosesAmpola, tipoVacina, nomeFabricante };
    data = JSON.stringify(data);

    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Vacina ${nomeVacina} cadastrada com sucesso!`);
          navigate(`/ListagemVacinas`);
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
          mensagemSucesso(`Vacina ${nomeVacina} alterada com sucesso!`);
          navigate(`/ListagemVacinas`);
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
      setNomeVacina(response.dados.nomeVacina);
      setDescricao(response.dados.descricao);
      setNumeroLote(response.dados.numeroLote);
      setDataValidade(response.dados.dataValidade);
      setDosesAmpola(response.dados.dosesAmpola);
      setTipoVacina(response.dados.tipoVacina);
      setNomeFabricante(response.dados.nomeFabricante);

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
        setNomeVacina(response.data.nomeVacina);
        setDescricao(response.data.descricao);
        setNumeroLote(response.data.numeroLote);
        setDataValidade(response.data.dataValidade);
        setDosesAmpola(response.data.dosesAmpola);
        setTipoVacina(response.data.tipoVacina);
        setNomeFabricante(response.data.nomeFabricante);
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
    axios.get(`${BASE_URL}/vacina`).then((response) => {
      setDados(response.data);
    });
  }, []);


  const [dados2, setDados2] = useState(null); // TipoVacina
  useEffect(() => {
    axios.get(`${URL_fabricante}/fabricante`).then((response) => {
      setDados2(response.data);
    });
  }, []);


  useEffect(() => {
    buscar();
  }, [id]);

  if (!dados) return null;
  if (!dados2) return null;
 


  return (
    <div className="container">
      <LoadingOverlay loading={loading} />
      <Card title="Cadastro de Vacina">
        <div className="row">
          <div className="col-lg-12">
            <div className="form-row">
              <div className="mesmaLinha">
                <div className="col-md-5 mb-3">
                  <FormGroup
                    label="Nome da vacina: *"
                    htmlFor="inputNomeVacina"
                  >
                    <input
                      type="text"
                      id="inputNomeVacina"
                      value={nomeVacina}
                      className="form-control"
                      name="nomeVacina"
                      onChange={(e) => setNomeVacina(e.target.value)}
                    />
                  </FormGroup>
                </div>

                <div className="col-md-5 mb-3">
                  <FormGroup
                    label="Número do Lote: *"
                    htmlFor="inputNumeroLote"
                  >
                    <input
                      type="text"
                      id="inputNumeroLote"
                      value={numeroLote}
                      className="form-control"
                      name="numeroLote"
                      onChange={(e) => setNumeroLote(e.target.value)}
                    />
                  </FormGroup>
                </div>
              </div>

              <div className="mesmaLinha">
                <div className="col-md-5 mb-3">
                  <FormGroup
                    label="Tipo de Vacina: *" htmlFor="selectTipo">
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
                        <option key={dado.id} value={dado.id}>{dado.tipoVacina}
                        </option>
                      ))}
                    </select>
                  </FormGroup>
                </div>
                <div className="col-md-5 mb-3">
                  <FormGroup label="Fabricante: " htmlFor="selectFabricante">
                    <select
                      className="form-select"
                      id="selectFabricante"
                      name="nomeFabricante"
                      value={nomeFabricante}
                      onChange={(e) => setNomeFabricante(e.target.value)}
                    >
                      <option key="0" value="0">
                        Selecione o Fabricante
                      </option>
                      {dados2.map((dado) => (
                        <option key={dado.id} value={dado.id}>
                          {dado.nomeFabricante}
                        </option>
                      ))}
                    </select>
                  </FormGroup>
                </div>
              </div>

              <div className="mesmaLinha">
                <div className="col-md-5 mb-3">
                  <FormGroup
                    label="Data de Validade: "
                    htmlFor="inputDataValidade"
                  >
                    <input
                      type="date"
                      id="inputDataValidade"
                      value={dataValidade}
                      className="form-control"
                      name="dataValidade"
                      onChange={(e) => setDataValidade(e.target.value)}
                    />
                  </FormGroup>
                </div>

                <div className="col-md-5 mb-3">
                  <FormGroup
                    label="Doses por ampola:"
                    htmlFor="inpuDosesAmpola"
                  >
                    <input
                      type="number"
                      id="inputDosesAmpola"
                      value={dosesAmpola}
                      maxLength="4"
                      className="form-control"
                      name="dosesAmpola"
                      onChange={(e) => setDosesAmpola(e.target.value)}
                    />
                  </FormGroup>
                </div>
              </div>

              <div className="col-md-12 mb-3">
                <FormGroup
                  label="Descrição da Vacina: "
                  htmlFor="inputDescricao"
                >
                  <textarea
                    cols={30}
                    rows={6}
                    type="textarea"
                    id="inputDescricao"
                    value={descricao}
                    className="form-control"
                    name="descricao"
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




export default CadastroVacina;
