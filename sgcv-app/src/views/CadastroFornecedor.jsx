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

function CadastroFornecedor() {
  const { idParam } = useParams();
  const navigate = useNavigate();
  const baseURL = `${BASE_URL}/fornecedores`;

  const [id, setId] = useState("");
  const [nomeFornecedor, setNomeFornecedor] = useState("");
  const [email, setEmail] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [razaoSocial, setRazaoSocial] = useState("");
  const [loading, setLoading] = useState(true);
  const [erros, setErros] = useState({});

async function salvar() {
  const novosErros = {};

  if (!nomeFornecedor || !nomeFornecedor.trim()) {
    novosErros.nomeFornecedor = "O nome do fornecedor é obrigatória.";
  }

  if (!email || !email.trim()) {
    novosErros.email = "O e-mail do fornecedor é obrigatório.";
  }

  setErros(novosErros);
  if (Object.keys(novosErros).length > 0) {
    mensagemErro("Preencha todos os campos obrigatórios corretamente.");
    return;
  }

  const data = {
    nomeFornecedor,
    email,
    cnpj,
    razaoSocial,
  };
  if (idParam) data.id = id;

  try {
    if (!idParam) {
      await axios.post(baseURL, data);
      mensagemSucesso(`Fornecedor ${nomeFornecedor} cadastrado com sucesso!`);
    } else {
      await axios.put(`${baseURL}/${idParam}`, data);
      mensagemSucesso(`Fornecedor ${nomeFornecedor} alterado com sucesso!`);
      navigate(`/ListagemFornecedores`);
    }
  } catch (error) {
    mensagemErro(error?.response?.data || "Erro ao salvar o fornecedor.");
  }
}


  async function buscar() {
    try {
      const response = await axios.get(`${baseURL}/${idParam}`);
      setId(response.data.id);
      setNomeFornecedor(response.data.nomeFornecedor);
      setEmail(response.data.email);
      setCnpj(response.data.cnpj);
      setRazaoSocial(response.data.razaoSocial);
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
      <Card title="Cadastro de Fornecedor">
        <div className="row">
          <div className="col-lg-12">
            <div className="form-row">
              <div className="mesmaLinha">
                <div className="col-md-12 mb-3">
                  <FormGroup
                    label="Fornecedor: *"
                    htmlFor="inputFornecedor"
                  >
                    <input
                      type="text"
                      id="inputFornecedor"
                      value={nomeFornecedor}
                      className={`form-control ${
                        erros.numeroLote ? "is-invalid" : ""
                      }`}
                      onChange={(e) => setNomeFornecedor(e.target.value)}
                    />
                    {erros.numeroLote && (
                      <div className="invalid-feedback">{erros.nomeFornecedor}</div>
                    )}
                  </FormGroup>
                </div>
              </div>

              <div className="col-md-12 mb-3">
                <FormGroup label="Email: *" htmlFor="inputEmail">
                  <input
                    type="text"
                    id="inputEmail"
                    value={email}
                    className={`form-control ${
                      erros.email ? "is-invalid" : ""
                    }`}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {erros.email && (
                    <div className="invalid-feedback">{erros.email}</div>
                  )}
                </FormGroup>

                <FormGroup label="CNPJ: *" htmlFor="inputCnpj">
                  <input
                    type="text"
                    id="inputCnpj"
                    value={cnpj}
                    className="form-control"
                    onChange={(e) => setCnpj(e.target.value)}
                  />
                  {erros.cnpj && (
                    <div className="invalid-feedback">{erros.cnpj}</div>
                  )}
                </FormGroup>

                <FormGroup label="Razão social: " htmlFor="inputRazaoSocial">
                  <input
                    type="text"
                    id="inputRazaoSocial"
                    value={razaoSocial}
                    className="form-control"
                    onChange={(e) => setRazaoSocial(e.target.value)}
                  />
                  {erros.razaoSocial && (
                    <div className="invalid-feedback">{erros.razaoSocial}</div>
                  )}
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
                  onClick={() => navigate("/ListagemEstoques")}
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

export default CadastroFornecedor;
