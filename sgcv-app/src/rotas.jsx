import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoadingOverlay from './LoadingOverlay';


import CadastroFuncionario from './views/CadastroFuncionario';
import CadastroTipoVacina from './views/CadastroTipoVacina';
import CadastroVacina from './views/CadastroVacina';
import CadastroVacinacao from './views/CadastroVacinacao';

import ListagemFabricantes from './views/ListagemFabricantes';
import ListagemFuncionarios from './views/ListagemFuncionarios';
import ListagemVacinas from './views/ListagemVacinas';
import ListagemVacinacao from './views/ListagemVacinacao';



function Rotas() {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
         {loading && <LoadingOverlay loading={loading} />}
   
      <Routes>
        <Route path="/" element={<Navigate to='/ListagemVacinacao' />} />

        <Route path='/CadastroFuncionario' element={<CadastroFuncionario />} />
        <Route path='/CadastroTipoVacina' element={<CadastroTipoVacina />} />
        <Route path='/CadastroVacina' element={<CadastroVacina />} />
        <Route path='/CadastroVacinacao' element={<CadastroVacinacao />} />
        
        <Route path='/ListagemFabricantes' element={<ListagemFabricantes />} />
        <Route path='/ListagemFuncionarios' element={<ListagemFuncionarios />} />
        <Route path='/ListagemVacinas' element={<ListagemVacinas />} />
        <Route path='/ListagemVacinacao' element={<ListagemVacinacao />} />
      

      </Routes>
    </BrowserRouter>
  );
}

export default Rotas;
