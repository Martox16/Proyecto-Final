import React from 'react';
import NombreTienda from './nombreTienda/index.js';
import ImagenPrincipal from './imagenPrincipal/index.js';
import BotonAtras from './botonAtras/index.js';
import styles from './header.module.css';

const Header = () => {
  return (
    <div className={styles.headerContainer}>
      <ImagenPrincipal>
        <BotonAtras />
        <NombreTienda />
      </ImagenPrincipal>
    </div>
  );
};

export default Header;
