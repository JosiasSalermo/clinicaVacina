import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Stack from "@mui/material/Stack";

import Card from "../components/Card";
import { mensagemSucesso, mensagemErro } from "../components/toastr";
import FormGroup from "../components/FormGroup";


import "../custom.css";
import LoadingOverlay from "../LoadingOverlay";

import axios from "axios";
import { BASE_URL } from '../config/axios';

function CadastroTipoVacina() {

  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL}/vacinas`;

  const [id, setId] = useState('');
  const [tipoVacina, setTipoVacina] = useState('');
  const [descricao, setDescricao] = useState('');

  const [loading, setLoading] = useState(true);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setTipoVacina('');
      setDescricao('');
    } else if (dados) {
      setId(dados.id);
      setTipoVacina(dados.tipoVacina);
      setDescricao(dados.descricao);
    } else {
      buscar();
    }
  }



  async function salvar() {
    let data = { id, tipoVacina, descricao };
    data = JSON.stringify(data);

    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Tipo de vacina ${tipoVacina} cadastrada com sucesso!`);
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
          mensagemSucesso(`Tipo de vacina ${tipoVacina} alterada com sucesso!`);
          navigate(`ListagemVacinacao`);
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
      setTipoVacina(response.dados.tipoVacina);
      setDescricao(response.dados.descricao);

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
        setTipoVacina(response.data.tipoVacina);
        setDescricao(response.data.descricao);
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
    axios.get(`${BASE_URL}/vacinas`).then((response) => {
      setDados(response.data);
    });
  }, []);

  useEffect(() => {
    buscar();
  }, [id]);

  if (!dados) return null;

  return (
    <div className="container">
      <LoadingOverlay loading={loading} />
      <Card title="Cadastro Tipo de Vacina">
        <div className="row">
          <div className="col-lg-12">
            <div className="form-row">
              <div className="mesmaLinha">
                <div className="col-md-5 mb-3">
                  <FormGroup
                    label="Tipo: *"
                    htmlFor="inputNomeTipo"
                  >
                    <input
                      type="text"
                      id="inputTipoVacina"
                      value={tipoVacina}
                      className="form-control"
                      name=""
                      onChange={(e) => setTipoVacina(e.target.value)}
                    />
                  </FormGroup>
                </div>
              </div>

              <div className="col-md-12 mb-3">
                <FormGroup
                  label="Descrição do Tipo de Vacina: "
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

export default CadastroTipoVacina;
