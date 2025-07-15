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

function CadastroEspecialidade() {

  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL}/especialidades`;

  const [id, setId] = useState('');
  const [especialidade, setEspecialidade] = useState('');
  const [descricao, setDescricao] = useState('');

  const [loading, setLoading] = useState(true);




  async function salvar() {
    let data = { id, especialidade, descricao };


    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Especialidade ${especialidade} cadastrada com sucesso!`);
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
          mensagemSucesso(`Especialidade ${especialidade} alterada com sucesso!`);
          navigate(`ListagemFuncionarios`);
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
      setEspecialidade(data.especialidade);
      setDescricao(data.descricao);
    } catch (error) {

      mensagemErro("Erro ao buscar os dados");
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    async function buscar() {
      try {
        const response = await axios.get(`${baseURL}/${idParam}`);
        setId(response.data.id);
        setEspecialidade(response.data.especialidade);
        setDescricao(response.data.descricao);
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
    }, [idParam]);



    return (
      <div className="container">
        <LoadingOverlay loading={loading} />
        <Card title="Cadastro de Especialidade">
          <div className="row">
            <div className="col-lg-12">
              <div className="form-row">
                <div className="mesmaLinha">
                  <div className="col-md-5 mb-3">
                    <FormGroup
                      label="Especialidade: *"
                      htmlFor="inputNomeTipo"
                    >
                      <input
                        type="text"
                        id="inputEspecialidade"
                        value={especialidade}
                        className="form-control"
                        name="especialidade"

                        onChange={(e) => setEspecialidade(e.target.value)}
                      />
                    </FormGroup>
                  </div>
                </div>

                <div className="col-md-12 mb-3">
                  <FormGroup
                    label="Descrição do Perfil: "
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
                  <button type="button" className="btn btn-danger"
                    onClick={() => navigate('/ListagemEspecialidade')}


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

export default CadastroEspecialidade;
