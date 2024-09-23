'use client'; // todos los que tienen useState hay que poner arriba esto.
import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './carrito.modules.css'; 
import { ShoppingCartIcon } from '@heroicons/react/24/solid';


function Carrito() {
  const router = useRouter();

  const handlePerfilClick = () => {
      router.push('/view/carrito');
  };

  return (
      <a className="botonCarrito" onClick={handlePerfilClick}>
        <ShoppingCartIcon style={{fill:"#FFA500"}}/>
      </a>
  );
}

export default Carrito;
