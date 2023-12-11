import React, { useState } from 'react';
import 'bootswatch/dist/minty/bootstrap.css';
import NavbarItem from './NavbarItem';
import '../custom.css';

function Navbar(props) {
  const [isDropdownOpen1, setDropdownOpen1] = useState(false);
  const [isDropdownOpen2, setDropdownOpen2] = useState(false);

  const handleMouseEnter = (index) => {
    if (index === 1) {
      setDropdownOpen1(true);
      setDropdownOpen2(false);
    } else if (index === 2) {
      setDropdownOpen1(false);
      setDropdownOpen2(true);
    }
  };

  const handleMouseLeave = () => {
    setDropdownOpen1(false);
    setDropdownOpen2(false);
  };


  return (
    <div className='navbar navbar-expand-lg fixed-top bg-primary'>
      <div className='container'>
        <a href='/' className='navbar-brand'>
          <img src="https://cdn-icons-png.flaticon.com/128/6064/6064458.png" alt="" width={35} />
        </a>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarResponsive'
          aria-controls='navbarResponsive'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse ' id='navbarResponsive '>
          <ul className='navbar-nav'>

            <li className={'nav-item dropdown'} onMouseEnter={() => handleMouseEnter(1)} onMouseLeave={handleMouseLeave}>
              <a
                className={`nav-link ${isDropdownOpen1 ? 'active' : ''}`}
                href='/ListagemVacinacao'
                id='navbarDropdown1'
                role='button'
                data-bs-toggle='dropdown'
                aria-haspopup="true"
                aria-expanded={isDropdownOpen1 ? 'true' : 'false'}
              >
                Vacinação do dia
              </a>
              <div
                className={`dropdown-menu ${isDropdownOpen1 ? 'show' : ''} `}
                aria-labelledby='navbarDropdown1'
              >
                <a className='dropdown-item' href='CadastroTipoVacina'>
                  Cadastrar Tipo de vacina
                </a>
              </div>
            </li>



            <li className={'nav-item dropdown'}
              onMouseEnter={() => handleMouseEnter(2)}
              onMouseLeave={handleMouseLeave}>
              <a
                className={`nav-link ${isDropdownOpen2 ? 'active' : ''}`}
                href='/ListagemVacinas'
                id='navbarDropdown2'
                role='button'
                data-bs-toggle='dropdown'
                aria-haspopup="true"
                aria-expanded={isDropdownOpen2 ? 'true' : 'false'}
              >
                Vacinas
              </a>
              <div className={`dropdown-menu ${isDropdownOpen2 ? 'show' : ''}`}
                aria-labelledby='navbarDropdown2'>
                <a className='dropdown-item'
                  href='CadastroTipoVacina'>
                  Cadastrar Tipo de vacina
                </a>
                <a className='dropdown-item'
                  href='CadastroFabricante'>
                  Cadastrar Fabricante
                </a>
              </div>
            </li>

            <li className='nav-item '>
              <NavbarItem render='true' href='/ListagemFuncionarios' label='Funcionários' />
            </li>

            <li className='nav-item'>
              <NavbarItem render='true' href='/ListagemFabricantes' label='Fabricantes' />
            </li>


          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
