'use client';
import React from 'react';
import Carrito from '../../components/carrito/carrito';
import styles from "./carrito.module.css";
import { useRouter } from 'next/navigation'; 

const CarritoPage = () => {
    const router = useRouter();
    const handleClick = () => {
        router.back();
    };
    
    return (
    <div>
        <a className={styles.botonFlecha} onClick={handleClick}>
            <img src="/flechaAtras.png" className={styles.fotoFlecha} alt="Flecha" />
        </a>
        <h1 className={styles.name} > Carrito</h1>
      <Carrito />
    </div>
  );
};

export default CarritoPage;


