import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/Card';
import { mensagemSucesso, mensagemErro } from '../components/toastr';
import FormGroup from '../components/FormGroup';

import '../custom.css';
import LoadingOverlay from '../LoadingOverlay';

import axios from "axios";
import { BASE_URL } from '../config/axios';

function CadastroDescarte() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL}/descarte`;


  // Estado do formulário
  const [id, setId] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [dataDescarte, setDataDescarte] = useState('');
  const [motivo, setMotivo] = useState('');
  const [numeroLote, setNumeroLote] = useState('');


  const [loading, setLoading] = useState(true);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setQuantidade('');
      setDataDescarte('');
      setMotivo('');
      setNumeroLote('');
    } else if (dados) {
      setId(dados.id);
      setQuantidade(dados.quantidade);
      setDataDescarte(dados.dataDescarte);
      setMotivo(dados.motivo);
      setNumeroLote(dados.numeroLote);
    } else {
      buscar();
    }
  }


  async function salvar() {
    let data = { id, quantidade, dataDescarte, motivo, numeroLote };
    data = JSON.stringify(data);

    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Descarte ${id} cadastrada com sucesso!`);
          navigate(`/CadastroDescarte`);
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
          mensagemSucesso(`Descarte ${id} alterada com sucesso!`);
          navigate(`/CadastroDescarte`);
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
      setQuantidade(response.dados.quantidade);
      setDataDescarte(response.dados.dataDescarte);
      setMotivo(response.dados.motivo);
      setNumeroLote(response.dados.numeroLote);
    } catch (error) {
      console.error('Erro ao buscar os dados:', error);
    }
  }


  useEffect(() => {
    async function buscar() {
      try {
        console.log("Fetching data...");
        const response = await axios.get(`${BASE_URL}/${idParam}`);
        console.log("Data fetched successfully:", response.data);
        setId(response.data);
        setQuantidade(response.data.quantidade);
        setDataDescarte(response.data.dataDescarte);
        setMotivo(response.data.motivo);
        setNumeroLote(response.data.numeroLote);
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




  useEffect(() => {
    buscar();
  }, [id]);

  if (!dados) return null;


  return (
    <div className="container">
      <Card title="Descarte">
        <div className="row">
          <div className="col-lg-12">
            <FormGroup label="Quantidade (doses): *" htmlFor="inputQuantidade">
              <input
                type="number"
                id="inputQuantidade"
                className="form-control"
                value={quantidade}
                onChange={e => setQuantidade(e.target.value)}
                min="1"
                step="1"
              />
            </FormGroup>

            <FormGroup label="Data do Descarte: *" htmlFor="inputDataDescarte">
              <input
                type="date"
                id="inputDataDescarte"
                className="form-control"
                value={dataDescarte}
                onChange={e => setDataDescarte(e.target.value)}
              />
            </FormGroup>

            <FormGroup label="Motivo: *" htmlFor="inputMotivo">
              <textarea
                id="inputMotivo"
                className="form-control"
                value={motivo}
                onChange={e => setMotivo(e.target.value)}
                rows={3}
              />
            </FormGroup>

            <FormGroup label="Lote: *" htmlFor="selectNumeroLote">
              <select
                className="form-select"
                id="selectNumeroLote"
                name="numeroLote"
                value={numeroLote}
                onChange={e => setNumeroLote(e.target.value)}
              >
                <option value="">Selecione o Lote</option>
                {dados.map((item) => (
                  <option key={item.id} value={item.numeroLote}>
                    {item.numeroLote}
                  </option>
                ))}
              </select>
            </FormGroup>

            <Stack spacing={1} direction="row" className="mt-3">
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

export default CadastroDescarte;
