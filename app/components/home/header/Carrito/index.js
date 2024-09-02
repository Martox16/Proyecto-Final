'use client'; // todos los que tienen useState hay que poner arriba esto.
import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './carrito.modules.css'; 


function Carrito() {
  const router = useRouter();

  const handlePerfilClick = () => {
      router.push('/view/incio');
  };

  return (
      <a className="botonCarrito" onClick={handlePerfilClick}>
          <img src="/carrito.png" className="fotoCarrito" alt="Carrito" />
      </a>
  );
}

export default Carrito;
