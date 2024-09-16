import React from 'react';
import NombreTienda from './nombreTienda/index.js';
import ImagenPrincipal from './imagenPrincipal/index.js';
import BotonAtras from './botonAtras/index.js';
import styles from './header.module.css';

const Header = () => {
  return (
    <header>
      <BotonAtras />
      <ImagenPrincipal />
      <NombreTienda />
    </header>
  );
};

export default Header;