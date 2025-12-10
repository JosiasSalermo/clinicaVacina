import React, { useState } from 'react';
import 'bootswatch/dist/minty/bootstrap.css';
import '../custom.css';

function NavBar(props) {
  const [isNavOpen, setNavOpen] = useState(false);

  const [isDropdownOpen1, setDropdownOpen1] = useState(false);
  const [isDropdownOpen2, setDropdownOpen2] = useState(false);
  const [isDropdownOpen3, setDropdownOpen3] = useState(false);
  const [isDropdownOpen4, setDropdownOpen4] = useState(false);
  const [isDropdownOpen5, setDropdownOpen5] = useState(false);
  const [isDropdownOpen6, setDropdownOpen6] = useState(false);
  const [isDropdownOpen7, setDropdownOpen7] = useState(false);
  const [isDropdownOpen8, setDropdownOpen8] = useState(false);
  const [isDropdownOpen9, setDropdownOpen9] = useState(false);

  const closeAllDropdowns = () => {
    setDropdownOpen1(false);
    setDropdownOpen2(false);
    setDropdownOpen3(false);
    setDropdownOpen4(false);
    setDropdownOpen5(false);
    setDropdownOpen6(false);
    setDropdownOpen7(false);
    setDropdownOpen8(false);
    setDropdownOpen9(false);
  };

  const handleMouseEnter = (index) => {
    closeAllDropdowns();
    switch (index) {
      case 1: setDropdownOpen1(true); break;
      case 2: setDropdownOpen2(true); break;
      case 3: setDropdownOpen3(true); break;
      case 4: setDropdownOpen4(true); break;
      case 5: setDropdownOpen5(true); break;
      case 6: setDropdownOpen6(true); break;
      case 7: setDropdownOpen7(true); break;
      case 8: setDropdownOpen8(true); break;
      case 9: setDropdownOpen9(true); break;
      default: break;
    }
  };

  const handleMouseLeave = () => {
    closeAllDropdowns();
  };

  // Clique para funcionar bem em telas touch (mobile)
  const handleDropdownClick = (index) => {
    let alreadyOpen = false;

    switch (index) {
      case 1: alreadyOpen = isDropdownOpen1; break;
      case 2: alreadyOpen = isDropdownOpen2; break;
      case 3: alreadyOpen = isDropdownOpen3; break;
      case 4: alreadyOpen = isDropdownOpen4; break;
      case 5: alreadyOpen = isDropdownOpen5; break;
      case 6: alreadyOpen = isDropdownOpen6; break;
      case 7: alreadyOpen = isDropdownOpen7; break;
      case 8: alreadyOpen = isDropdownOpen8; break;
      case 9: alreadyOpen = isDropdownOpen9; break;
      default: break;
    }

    if (alreadyOpen) {
      // se já está aberto, fecha
      closeAllDropdowns();
    } else {
      // fecha todos e abre só o selecionado (mesma lógica do hover)
      closeAllDropdowns();
      handleMouseEnter(index);
    }
  };

  const toggleNavbar = () => {
    const newValue = !isNavOpen;
    setNavOpen(newValue);

    // ao fechar o menu, garante que nenhum dropdown fique aberto
    if (!newValue) {
      closeAllDropdowns();
    }
  };

  const handleItemClick = () => {
    // ao clicar em qualquer link, fecha tudo (bom para mobile)
    setNavOpen(false);
    closeAllDropdowns();
  };

  return (
    <div className="navbar navbar-expand-lg navbar-dark fixed-top bg-primary">
      <div className="container-fluid">
        <a href="/" className="navbar-brand">
          <img src="https://cdn-icons-png.flaticon.com/128/6064/6064458.png" alt="" width={20} />
        </a>

        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar}
          aria-controls="navbarResponsive"
          aria-expanded={isNavOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isNavOpen ? "show" : ""}`} id="navbarResponsive">
          <ul className="navbar-nav">

            {/* 1 - Agendamento */}
            <li
              className="nav-item dropdown"
              onMouseEnter={() => handleMouseEnter(1)}
              onMouseLeave={handleMouseLeave}
            >
              <span
                className={`nav-link ${isDropdownOpen1 ? "active" : ""}`}
                id="navbarDropdown1"
                role="button"
                aria-haspopup="true"
                aria-expanded={isDropdownOpen1}
                onClick={() => handleDropdownClick(1)}
              >
                Agendamento
              </span>
              <div className={`dropdown-menu ${isDropdownOpen1 ? "show" : ""}`} aria-labelledby="navbarDropdown1">
                <a className="dropdown-item" href="CadastroAgendamento" onClick={handleItemClick}>
                  Cadastrar Agendamento
                </a>
                <a className="dropdown-item" href="ListagemAgendamento" onClick={handleItemClick}>
                  Listagem dos Agendamentos
                </a>
              </div>
            </li>

            {/* 2 - Usuários */}
            <li
              className="nav-item dropdown"
              onMouseEnter={() => handleMouseEnter(2)}
              onMouseLeave={handleMouseLeave}
            >
              <span
                className={`nav-link ${isDropdownOpen2 ? "active" : ""}`}
                id="navbarDropdown2"
                role="button"
                aria-haspopup="true"
                aria-expanded={isDropdownOpen2}
                onClick={() => handleDropdownClick(2)}
              >
                Usuários
              </span>
              <div className={`dropdown-menu ${isDropdownOpen2 ? "show" : ""}`} aria-labelledby="navbarDropdown2">
                <a className="dropdown-item" href="CadastroUsuario" onClick={handleItemClick}>
                  Cadastrar Usuário
                </a>
                <a className="dropdown-item" href="ListagemUsuarios" onClick={handleItemClick}>
                  Listagem de Usuários
                </a>
              </div>
            </li>

            {/* 3 - Vacinações */}
            <li
              className="nav-item dropdown"
              onMouseEnter={() => handleMouseEnter(3)}
              onMouseLeave={handleMouseLeave}
            >
              <span
                className={`nav-link ${isDropdownOpen3 ? "active" : ""}`}
                id="navbarDropdown3"
                role="button"
                aria-haspopup="true"
                aria-expanded={isDropdownOpen3}
                onClick={() => handleDropdownClick(3)}
              >
                Vacinações
              </span>
              <div className={`dropdown-menu ${isDropdownOpen3 ? "show" : ""}`} aria-labelledby="navbarDropdown3">
                <a className="dropdown-item" href="CadastroVacinacao" onClick={handleItemClick}>
                  Cadastrar Vacinação
                </a>
                <a className="dropdown-item" href="ListagemVacinacao" onClick={handleItemClick}>
                  Vacinação do dia
                </a>
              </div>
            </li>

            {/* 4 - Vacinas */}
            <li
              className="nav-item dropdown"
              onMouseEnter={() => handleMouseEnter(4)}
              onMouseLeave={handleMouseLeave}
            >
              <span
                className={`nav-link ${isDropdownOpen4 ? "active" : ""}`}
                id="navbarDropdown4"
                role="button"
                aria-haspopup="true"
                aria-expanded={isDropdownOpen4}
                onClick={() => handleDropdownClick(4)}
              >
                Vacinas
              </span>
              <div className={`dropdown-menu ${isDropdownOpen4 ? "show" : ""}`} aria-labelledby="navbarDropdown4">
                <a className="dropdown-item" href="CadastroVacina" onClick={handleItemClick}>
                  Cadastrar Vacina
                </a>
                <a className="dropdown-item" href="ListagemVacinas" onClick={handleItemClick}>
                  Listagem de Vacinas
                </a>
                <a className="dropdown-item" href="CadastroTipoVacina" onClick={handleItemClick}>
                  Cadastrar Tipo de vacina
                </a>
                <a className="dropdown-item" href="ListagemTipoVacinas" onClick={handleItemClick}>
                  Listagem de Tipo de vacina
                </a>
              </div>
            </li>

            {/* 5 - Funcionários */}
            <li
              className="nav-item dropdown"
              onMouseEnter={() => handleMouseEnter(5)}
              onMouseLeave={handleMouseLeave}
            >
              <span
                className={`nav-link ${isDropdownOpen5 ? "active" : ""}`}
                id="navbarDropdown5"
                role="button"
                aria-haspopup="true"
                aria-expanded={isDropdownOpen5}
                onClick={() => handleDropdownClick(5)}
              >
                Funcionários
              </span>
              <div className={`dropdown-menu ${isDropdownOpen5 ? "show" : ""}`} aria-labelledby="navbarDropdown5">
                <a className="dropdown-item" href="CadastroFuncionario" onClick={handleItemClick}>
                  Cadastrar Funcionário
                </a>
                <a className="dropdown-item" href="ListagemFuncionarios" onClick={handleItemClick}>
                  Listagem de Funcionários
                </a>
                <a className="dropdown-item" href="CadastroCargo" onClick={handleItemClick}>
                  Cadastrar Cargo
                </a>
                <a className="dropdown-item" href="ListagemCargos" onClick={handleItemClick}>
                  Listagem de Cargos
                </a>
              </div>
            </li>

            {/* 7 - Pacientes */}
            <li
              className="nav-item dropdown"
              onMouseEnter={() => handleMouseEnter(7)}
              onMouseLeave={handleMouseLeave}
            >
              <span
                className={`nav-link ${isDropdownOpen7 ? "active" : ""}`}
                id="navbarDropdown7"
                role="button"
                aria-haspopup="true"
                aria-expanded={isDropdownOpen7}
                onClick={() => handleDropdownClick(7)}
              >
                Pacientes
              </span>
              <div className={`dropdown-menu ${isDropdownOpen7 ? "show" : ""}`} aria-labelledby="navbarDropdown7">
                <a className="dropdown-item" href="CadastroPaciente" onClick={handleItemClick}>
                  Cadastrar Paciente
                </a>
                <a className="dropdown-item" href="ListagemPacientes" onClick={handleItemClick}>
                  Listagem de Pacientes
                </a>
                <a className="dropdown-item" href="CadastroComorbidade" onClick={handleItemClick}>
                  Cadastrar Comorbidade
                </a>
                <a className="dropdown-item" href="ListagemComorbidades" onClick={handleItemClick}>
                  Listagem de Comorbidades
                </a>
              </div>
            </li>

            {/* 8 - Compras */}
            <li
              className="nav-item dropdown"
              onMouseEnter={() => handleMouseEnter(8)}
              onMouseLeave={handleMouseLeave}
            >
              <span
                className={`nav-link ${isDropdownOpen8 ? "active" : ""}`}
                id="navbarDropdown8"
                role="button"
                aria-haspopup="true"
                aria-expanded={isDropdownOpen8}
                onClick={() => handleDropdownClick(8)}
              >
                Compras
              </span>
              <div className={`dropdown-menu ${isDropdownOpen8 ? "show" : ""}`} aria-labelledby="navbarDropdown8">
                <a className="dropdown-item" href="CadastroCompra" onClick={handleItemClick}>
                  Cadastrar Compra
                </a>
                <a className="dropdown-item" href="ListagemCompra" onClick={handleItemClick}>
                  Listagem de Compras
                </a>
                <a className="dropdown-item" href="CadastroFornecedor" onClick={handleItemClick}>
                  Cadastrar Fornecedor
                </a>
                <a className="dropdown-item" href="ListagemFornecedores" onClick={handleItemClick}>
                  Listagem de Fornecedores
                </a>
                <a className="dropdown-item" href="CadastroFabricante" onClick={handleItemClick}>
                  Cadastrar Fabricante
                </a>
                <a className="dropdown-item" href="ListagemFabricantes" onClick={handleItemClick}>
                  Listagem de Fabricantes
                </a>
              </div>
            </li>

            {/* 9 - Estoques */}
            <li
              className="nav-item dropdown"
              onMouseEnter={() => handleMouseEnter(9)}
              onMouseLeave={handleMouseLeave}
            >
              <span
                className={`nav-link ${isDropdownOpen9 ? "active" : ""}`}
                id="navbarDropdown9"
                role="button"
                aria-haspopup="true"
                aria-expanded={isDropdownOpen9}
                onClick={() => handleDropdownClick(9)}
              >
                Estoques
              </span>
              <div className={`dropdown-menu ${isDropdownOpen9 ? "show" : ""}`} aria-labelledby="navbarDropdown9">
                <a className="dropdown-item" href="CadastroEstoque" onClick={handleItemClick}>
                  Cadastrar Estoque
                </a>
                <a className="dropdown-item" href="ListagemEstoques" onClick={handleItemClick}>
                  Listagem de Estoques
                </a>
                <a className="dropdown-item" href="CadastroLote" onClick={handleItemClick}>
                  Cadastrar Lote
                </a>
                <a className="dropdown-item" href="ListagemLotes" onClick={handleItemClick}>
                  Listagem de Lotes
                </a>
                <a className="dropdown-item" href="CadastroDescarte" onClick={handleItemClick}>
                  Cadastrar Descarte
                </a>
                <a className="dropdown-item" href="ListagemDescarte" onClick={handleItemClick}>
                  Listagem de Descartes
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
