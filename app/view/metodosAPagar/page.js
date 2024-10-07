'use client';
import { useRouter } from 'next/navigation'; 
import React, { useState } from 'react';
import styles from './metodosAPagar.module.css';
import Subtotal from '../../components/Subtotal/Subtotal';
import MetodosAPagar from '../../components/metodosAPagar/metodosAPagar';
import Flecha from '../../components/menuBar/flechaAtras/index';

const metodosAPagar = () => {
    const router = useRouter();
    const handleClick = () => {
        router.back();
    };
    const [total, setTotal] = useState(0);

 
    return (
    <div>
        <a className={styles.botonFlecha} onClick={handleClick}>
            <img src="/flechaAtras.png" className={styles.fotoFlecha} alt="Flecha" />
        </a>
        <h1 className={styles.name} > Tu pedido</h1>
        <MetodosAPagar />
        
    </div>
  );
};

export default metodosAPagar;


