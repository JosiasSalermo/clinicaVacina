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


function CadastroCompra() {
  const { idParam } = useParams();
  const navigate = useNavigate();

  const baseURL = `${BASE_URL}/compras`;


  // Estado para lista de compras (TODAS)
  const [compras, setCompras] = useState([]);

  // — Dados da Compra
  const [id, setId] = useState('');
  const [valor, setValor] = useState('');
  const [dataCompra, setDataCompra] = useState('');

  // — IDs de relacionamento
  const [fornecedorId, setFornecedorId] = useState('');
  const [fabricanteId, setFabricanteId] = useState('');


  // — Listas para selects (sempre arrays)
  const [fornecedores, setFornecedores] = useState([]);
  const [fabricantes, setFabricantes] = useState([]);

  //--- Controle de loading e edição --
  const [loading, setLoading] = useState(true);

  async function buscarTodasCompras() {
    try {
      const response = await axios.get(`${baseURL}/compras`);
      const listaCompras = response.data;

      console.log("Lista de Compras:");
      setCompras(listaCompras);
    } catch (error) {
      console.error("Erro ao buscar compra:", error);
      mensagemErro("Erro ao buscar compras");
    } finally {
      setLoading(false);
    }
  }

  async function buscarCompraPorId() {
    try {
      const response = await axios.get(`${baseURL}/compras/${idParam}`);
      const compra = response.data;
      setId(compra.id);
      setValor(compra.valor);
      setDataCompra(compra.dataCompra);
      setFornecedorId(compra.fornecedorId);
      setFabricanteId(compra.fabricanteId);
    } catch (error) {
      console.error("Erro ao buscar compra:", error);
      mensagemErro("Compra não encontrada");
    } finally {
      setLoading(false);
    }

  }


  async function salvar() {
    const data = {
      valor: parseFloat(valor),
      dataCompra,
      fornecedorId: parseInt((fornecedorId)),
      fabricanteId: parseInt(fabricanteId)
    };

    try {
      if (idParam == null) {
        await axios
          .post(`${baseURL}/compras`, data, {
            headers: { 'Content-Type': 'application/json' },
          });
        mensagemSucesso(`Compra cadastrada com sucesso!`);

      } else {
        await axios
          .put(`${baseURL}/compras/${idParam}`, data, {
            headers: { 'Content-Type': 'application/json' },
          });
        mensagemSucesso(`Compra ${id} alterada com sucesso!`);
      }

      navigate('/ListagemCompra');
    }
    catch (error) {
      console.error("Erro ao salvar compra:", error);
      mensagemErro("Erro ao salvar os dados");

    }
  }

  function inicializar() {
    if (idParam == null) {
      setId('');
      setValor('');
      setDataCompra('');
      setFornecedorId('');
      setFabricanteId('');
    } else {
      buscarCompraPorId();
    }
  }





  useEffect(() => {
    if (idParam) {
      buscarCompraPorId();
    } else {
      setLoading(false);
    }
  }, [idParam]);



  // - UseEffect para buscar compras ao carregar o componente

  // - Compras
  useEffect(() => {
    async function carregarCompras() {
      try {
        const response = await axios.get(`${baseURL}/compras`);
        setCompras(response.data);
      } catch (error) {
        mensagemErro("Erro ao carregar lista de compras.");
      }
    }
    carregarCompras();
  }, []);

  // - Fabricantes 
  useEffect(() => {
    async function carregarFabricantes() {
      try {
        const response = await axios.get(`${BASE_URL}/fabricantes`);
        setFabricantes(response.data);
      } catch (error) {
        mensagemErro("Erro ao carregar fabricantes.");
      }
    }
    carregarFabricantes();
  }, []);

  // - Fornecedores 
  useEffect(() => {
    async function carregarFornecedores() {
      try {
        const response = await axios.get(`${BASE_URL}/fornecedores`);
        setFornecedores(response.data);
      } catch (error) {
        mensagemErro("Erro ao carregar fornecedores.");
      }
    }
    carregarFornecedores();
  }, []);


  useEffect(() => {
    if (idParam) {
      buscarCompraPorId();
    } else {
      setLoading(false);
    }
  }, [idParam]);


  if (loading) return <LoadingOverlay loading={true} />;


  return (
    <div className="container">
      <LoadingOverlay loading={loading} />
      <Card title={idParam ? "Editar Compra" : "Cadastrar Compra"}>
        <form>
          <div className="row">
            <div className="col-md-6 mb-3">
              <FormGroup label="Valor da Compra: *" htmlFor="inputValor">
                <input
                  type="number"
                  step="0.01"
                  id="inputValor"
                  value={valor}
                  className="form-control"
                  name="valor"
                  onChange={e => setValor(e.target.value)}
                  required
                />
              </FormGroup>
            </div>
            <div className="col-md-6 mb-3">
              <FormGroup label="Data da Compra: *" htmlFor="inputDataCompra">
                <input
                  type="date"
                  id="inputDataCompra"
                  value={dataCompra}
                  className="form-control"
                  name="dataCompra"
                  onChange={e => setDataCompra(e.target.value)}
                  required
                />
              </FormGroup>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <FormGroup label="Fabricante: *" htmlFor="selectFabricante">
                <select
                  className="form-select"
                  id="selectFabricante"
                  value={fabricanteId}
                  onChange={e => setFabricanteId(e.target.value)}
                  required
                >
                  <option value="">Selecione o Fabricante</option>
                  {fabricantes.map(fab => (
                    <option key={fab.id} value={fab.id}>
                      {fab.nome_fantasia}
                    </option>
                  ))}
                </select>
              </FormGroup>
            </div>
            <div className="col-md-6 mb-3">
              <FormGroup label="Fornecedor: *" htmlFor="selectFornecedor">
                <select
                  className="form-select"
                  id="selectFornecedor"
                  value={fornecedorId}
                  onChange={e => setFornecedorId(e.target.value)}
                  required
                >
                  <option value="">Selecione o Fornecedor</option>
                  {fornecedores.map(forn => (
                    <option key={forn.id} value={forn.id}>
                      {forn.nome_fantasia}
                    </option>
                  ))}
                </select>
              </FormGroup>
            </div>
          </div>
          <Stack spacing={1} padding={1} direction="row">
            <button
              onClick={salvar}
              type="button"
              className="btn btn-success" >
              Salvar
            </button>
            <button
              onClick={() => navigate('/ListagemCompra')}
              type="button"
              className="btn btn-danger"
            >
              Cancelar
            </button>
          </Stack>
        </form>
      </Card>
    </div>
  );

}

export default CadastroCompra;
