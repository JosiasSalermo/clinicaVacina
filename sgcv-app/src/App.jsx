import React from 'react';
import 'bootswatch/dist/flatly/bootstrap.css';
import 'toastr/build/toastr.min';
import 'toastr/build/toastr.css';

import NavBar from './components/NavBar.jsx';
import Rotas from './rotas.jsx';

class App extends React.Component {
  render() {
    return (
      <div className='container'>
        <Rotas />
        <NavBar />
      </div>
    );
  }
}

export default App;
