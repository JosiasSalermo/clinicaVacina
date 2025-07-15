import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import { mensagemSucesso, mensagemErro } from '../components/toastr';

import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

const baseURL = `${BASE_URL}/compras`;

function ListagemCompra() {
  const navigate = useNavigate();

  const [dadosCompra, setDadosCompra] = useState([]);
  const [listaFabricantes, setListaFabricantes] = useState([]);
  const [listaFornecedores, setListaFornecedores] = useState([]);

  const carregarDadosCompra = async () => {
    try {
      const [resCompra, resFabricantes, resFornecedores] = await Promise.all([
        axios.get(baseURL),
        axios.get(`${BASE_URL}/fabricantes`),
        axios.get(`${BASE_URL}/fornecedores`),
      ]);

      console.log('COMPRAS:', resCompra.data);
      console.log('FABRICANTES:', resFabricantes.data);
      console.log('FORNECEDORES:', resFornecedores.data);

      setDadosCompra(resCompra.data);
      setListaFabricantes(resFabricantes.data);
      setListaFornecedores(resFornecedores.data);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      mensagemErro('Erro ao carregar dados da listagem.');
    }
  };

  useEffect(() => {
    carregarDadosCompra();
  }, []);

  const redirecionarCadastro = () => {
    navigate('/CadastroCompra');
  };

  const redirecionarEdicao = (id) => {
    navigate(`/CadastroCompra/${id}`);
  };

  const excluirCompra = async (id) => {
    try {
      await axios.delete(`${baseURL}/${id}`);
      mensagemSucesso('Compra excluída com sucesso!');
      setDadosCompra((prev) => prev.filter((compra) => compra.id !== id));
    } catch (error) {
      mensagemErro('Erro ao excluir a compra.');
    }
  };

  const obterNomeFabricante = (id) => {
    const fabricante = listaFabricantes.find((f) => Number(f.id) === Number(id));
    return fabricante ? fabricante.nome_fantasia || fabricante.razao_social || fabricante.nomeFabricante || '??' : '---';
  };

  const obterNomeFornecedor = (id) => {
    const fornecedor = listaFornecedores.find((f) => Number(f.id) === Number(id));
    return fornecedor ? fornecedor.nome_fantasia : '---';
  };

  return (
    <div className="container">
      <Card title="Compras">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">
              <button
                type="button"
                className="btn btn-warning"
                onClick={redirecionarCadastro}
              >
                Nova Compra
              </button>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Valor</th>
                    <th>Fabricante</th>
                    <th>Fornecedor</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {dadosCompra.map((compra) => (
                    <tr key={compra.id}>
                      <td>{compra.dataCompra}</td>
                      <td>{parseFloat(compra.valor).toFixed(2)}</td>
                      <td>{obterNomeFabricante(compra.fabricanteId)}</td>
                      <td>{obterNomeFornecedor(compra.fornecedorId)}</td>
                      <td>
                        <Stack spacing={1} padding={0} direction="row">
                          <IconButton onClick={() => redirecionarEdicao(compra.id)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton onClick={() => excluirCompra(compra.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </Stack>
                      </td>
                    </tr>
                  ))}
                  {dadosCompra.length === 0 && (
                    <tr>
                      <td colSpan="5">Nenhuma compra cadastrada.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ListagemCompra;
