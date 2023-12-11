import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';


import LoadingOverlay from './LoadingOverlay';


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

        <Route path='/ListagemVacinacao' element={<ListagemVacinacao />} />
      

      </Routes>
    </BrowserRouter>
  );
}

export default Rotas;
