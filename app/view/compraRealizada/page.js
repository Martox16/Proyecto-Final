'use client';
import { useRouter } from 'next/navigation'; 
import React, { useState } from 'react';
import styles from './compraRealizada.module.css';
import CompraRealizada from '../../components/compraRealizada/compraRealizada';

const metodosAPagar = () => {
    const router = useRouter();
    const handleClick = () => {
        router.back();
    };

 
    return (
    <div>
        <a className={styles.botonFlecha} onClick={handleClick}>
            <img src="/flechaAtras.png" className={styles.fotoFlecha} alt="Flecha" />
        </a>
        <div className={styles.div}>
          <h1 className={styles.nombre} > Compra realizada</h1>
         <img src="/logo.png" className={styles.fotoLogo} alt="Logo" />
        </div>
        
        <CompraRealizada />
        
        
    </div>
  );
};

export default metodosAPagar;

