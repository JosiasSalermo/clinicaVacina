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

function CadastroEstoque() {
  const { idParam } = useParams();
  const navigate = useNavigate();
  const baseURL = `${BASE_URL}/lotes`;

  const [id, setId] = useState('');
  const [dataValidade, setDataValidade] = useState('');
  const [numeroLote, setNumeroLote] = useState('');
  const [numeroAmpola, setNumeroAmpola] = useState('');
  const [dosesAmpola, setDosesAmpola] = useState('');
  const [numeroCompra, setNumeroCompra] = useState('');
  const [nomeVacina, setNomeVacina] = useState('');
  const [nomeEstoque, setNomeEstoque] = useState('');
  const [loading, setLoading] = useState(true);
  const [erros, setErros] = useState({});

async function salvar() {
  const novosErros = {};

  if (!dataValidade || !dataValidade.trim()) {
    novosErros.dataValidade = "A validade é obrigatória.";
  }

  if (!numeroLote || isNaN(numeroLote)) {
    novosErros.numeroLote = "O número do lote é obrigatório.";
  }

  if (!numeroCompra || isNaN(numeroCompra)) {
    novosErros.numeroCompra = "O número da compra é obrigatório.";
  }

  if (!nomeVacina || !nomeVacina.trim()) {
    novosErros.nomeVacina = "O nome da vacina é obrigatório.";
  }
  if (!nomeEstoque || !nomeEstoque.trim()) {
    novosErros.nomeEstoque = "O estoque é obrigatório.";
  }

  if (!nomeEstoque || isNaN(nomeEstoque)) {
    novosErros.nomeEstoque = "O estoque é obrigatório.";
  }


  setErros(novosErros);
  if (Object.keys(novosErros).length > 0) {
    mensagemErro("Preencha todos os campos obrigatórios corretamente.");
    return;
  }

  const data = {
    dataValidade,
    numeroLote,
    numeroAmpola,
    dosesAmpola,
    numeroCompra,
    nomeVacina,
    nomeEstoque,
  };
  if (idParam) data.id = id;

  try {
    if (!idParam) {
      await axios.post(baseURL, data);
      mensagemSucesso(`Lote ${numeroLote} cadastrado com sucesso!`);
    } else {
      await axios.put(`${baseURL}/${idParam}`, data);
      mensagemSucesso(`Lote ${numeroLote} alterado com sucesso!`);
      navigate(`/ListagemLotes`);
    }
  } catch (error) {
    mensagemErro(error?.response?.data || "Erro ao salvar o lote.");
  }
}


  async function buscar() {
    try {
      const response = await axios.get(`${baseURL}/${idParam}`);
      setId(response.data.id);
      setDataValidade(response.data.dataValidade);
      setNumeroLote(response.data.numeroLote);
      setDosesAmpola(response.data.dosesAmpola);
      setNumeroCompra(response.data.numeroCompra);
      setNomeVacina(response.data.nomeVacina);
      setNomeEstoque(response.data.nomeEstoque);
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
      <Card title="Cadastro de Lote">
        <div className="row">
          <div className="col-lg-12">
            <div className="form-row">
              <div className="mesmaLinha">
                <div className="col-md-12 mb-3">
                  <FormGroup
                    label="Número do Lote: *"
                    htmlFor="inputNumeroLote"
                  >
                    <input
                      type="text"
                      id="inputNumeroLote"
                      value={numeroLote}
                      className={`form-control ${
                        erros.numeroLote ? "is-invalid" : ""
                      }`}
                      onChange={(e) => setNumeroLote(e.target.value)}
                    />
                    {erros.numeroLote && (
                      <div className="invalid-feedback">{erros.numeroLote}</div>
                    )}
                  </FormGroup>
                </div>
              </div>

              <div className="col-md-12 mb-3">
                <FormGroup label="Data validade: *" htmlFor="inputDataValidade">
                  <input
                    type="date"
                    id="dataValidade"
                    value={dataValidade}
                    className={`form-control ${
                      erros.dataValidade ? "is-invalid" : ""
                    }`}
                    onChange={(e) => setDataValidade(e.target.value)}
                  />
                  {erros.dataValidade && (
                    <div className="invalid-feedback">{erros.dataValidade}</div>
                  )}
                </FormGroup>

                <FormGroup label="Número ampola: " htmlFor="inputNumeroAmpola">
                  <input
                    type="number"
                    id="inputNumeroAmpola"
                    value={numeroAmpola}
                    className="form-control"
                    onChange={(e) => setNumeroAmpola(e.target.value)}
                    min="0"
                  />
                  {erros.numeroAmpola && (
                    <div className="invalid-feedback">{erros.numeroAmpola}</div>
                  )}
                </FormGroup>

                <FormGroup label="Doses ampola: " htmlFor="inputDosesAmpola">
                  <input
                    type="number"
                    id="inputDosesAmpola"
                    value={dosesAmpola}
                    className="form-control"
                    onChange={(e) => setDosesAmpola(e.target.value)}
                    min="0"
                  />
                  {erros.dosesAmpola && (
                    <div className="invalid-feedback">{erros.dosesAmpola}</div>
                  )}
                </FormGroup>

                <FormGroup label="Vacina: *" htmlFor="inputNomeVacina">
                  <textarea
                    id="inputNomeVacina"
                    value={nomeVacina}
                    className="form-control col-md-6"
                    onChange={(e) => setNomeVacina(e.target.value)}
                    rows={2}
                    style={{ resize: "none" }}
                  />
                  {erros.nomeVacina && (
                    <div className="invalid-feedback">{erros.nomeVacina}</div>
                  )}
                </FormGroup>
                <FormGroup label="Estoque: *" htmlFor="inputNomeEstoque">
                    <textarea
                      id="inputNomeEstoque"
                      value={nomeEstoque}
                      className="form-control col-md-6"
                      onChange={(e) => setNomeEstoque(e.target.value)}
                      rows={2}
                      style={{ resize: "none" }}
                    />
                    {erros.nomeEstoque && (
                      <div className="invalid-feedback">
                        {erros.nomeEstoque}
                      </div>
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

export default CadastroEstoque;
