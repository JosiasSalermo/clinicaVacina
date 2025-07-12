import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Stack from '@mui/material/Stack';

import Card from '../components/Card';
import FormGroup from '../components/FormGroup';
import { mensagemSucesso, mensagemErro } from '../components/toastr';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

function CadastroDescarte() {
  const navigate = useNavigate();
  const { idParam } = useParams();

  const [quantidade, setQuantidade] = useState('');
  const [dataDescarte, setDataDescarte] = useState('');
  const [motivo, setMotivo] = useState('');
  const [loteId, setLoteId] = useState('');
  const [lotes, setLotes] = useState([]);

  const carregarLotes = async () => {
    try {
      const resposta = await axios.get(`${BASE_URL}/lote`);
      setLotes(resposta.data);
    } catch (error) {
      mensagemErro('Erro ao carregar os lotes.');
    }
  };

  const buscarDescarte = async () => {
    try {
      const resposta = await axios.get(`${BASE_URL}/descarte/${idParam}`);
      const descarte = resposta.data;
      setQuantidade(descarte.quantidadeDescarte);
      setDataDescarte(descarte.data?.substring(0, 10));
      setMotivo(descarte.motivo);
      setLoteId(descarte.loteId);
    } catch (error) {
      mensagemErro('Erro ao buscar descarte.');
    }
  };

  useEffect(() => {
    carregarLotes();
    if (idParam) buscarDescarte();
  }, [idParam]); // Se quiser eliminar o warning, inclua buscarDescarte na lista

  const salvar = async () => {
    const dados = {
      quantidadeDescarte: Number(quantidade),
      data: dataDescarte,
      motivo,
      loteId: Number(loteId),
    };

    try {
      if (!idParam) {
        await axios.post(`${BASE_URL}/descarte`, dados);
        mensagemSucesso('Descarte cadastrado com sucesso!');
      } else {
        await axios.put(`${BASE_URL}/descarte/${idParam}`, dados);
        mensagemSucesso('Descarte atualizado com sucesso!');
      }
      navigate('/ListagemDescarte');
    } catch (error) {
      mensagemErro('Erro ao salvar o descarte.');
    }
  };

  return (
    <div className="container">
      <Card title={idParam ? 'Editar Descarte' : 'Cadastrar Descarte'}>
        <form>
          <div className="row">
            <div className="col-md-6 mb-3">
              <FormGroup label="Quantidade (doses): *" htmlFor="inputQuantidade">
                <input
                  type="number"
                  id="inputQuantidade"
                  className="form-control"
                  value={quantidade}
                  onChange={(e) => setQuantidade(e.target.value)}
                  required
                />
              </FormGroup>
            </div>
            <div className="col-md-6 mb-3">
              <FormGroup label="Data do Descarte: *" htmlFor="inputDataDescarte">
                <input
                  type="date"
                  id="inputDataDescarte"
                  className="form-control"
                  value={dataDescarte}
                  onChange={(e) => setDataDescarte(e.target.value)}
                  required
                />
              </FormGroup>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12 mb-3">
              <FormGroup label="Motivo: *" htmlFor="inputMotivo">
                <textarea
                  id="inputMotivo"
                  className="form-control"
                  value={motivo}
                  onChange={(e) => setMotivo(e.target.value)}
                  required
                />
              </FormGroup>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12 mb-3">
              <FormGroup label="Lote: *" htmlFor="selectLote">
                <select
                  id="selectLote"
                  className="form-select"
                  value={loteId}
                  onChange={(e) => setLoteId(e.target.value)}
                  required
                >
                  <option value="">Selecione o Lote</option>
                  {lotes.map((lote) => (
                    <option key={lote.id} value={lote.id}>
                      {`${lote.numero_lote} - Val.: ${lote.data_validade}`}
                    </option>
                  ))}
                </select>
              </FormGroup>
            </div>
          </div>

          <Stack spacing={1} padding={1} direction="row">
            <button type="button" className="btn btn-success" onClick={salvar}>
              Salvar
            </button>
            <button type="button" className="btn btn-danger" onClick={() => navigate('/ListagemDescarte')}>
              Cancelar
            </button>
          </Stack>
        </form>
      </Card>
    </div>
  );
}

export default CadastroDescarte;
