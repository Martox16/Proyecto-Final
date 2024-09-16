import React from 'react';
import NombreTienda from './nombreTienda/index.js';
import ImagenPrincipal from './imagenPrincipal/index.js';
import BotonAtras from './botonAtras/index.js';
import styles from './header.module.css';
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();


  const irAlCarrito = () => {
    router.push('/view/carrito'); 
  };

  return (
    <header>
      <BotonAtras />
      <ImagenPrincipal />
      <NombreTienda />
      <button className={styles.botonCarrito} onClick={irAlCarrito}>Ir al Carrito</button> 
    </header>
  );
};

export default Header;