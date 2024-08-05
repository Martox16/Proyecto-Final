'use client'; // todos los que tienen useState hay que poner arriba esto.
import React from 'react';
import { useRouter } from 'next/navigation'; // Asegúrate de importar desde 'next/navigation'
import styles from './flechaAtras.module.css';

function Flecha() {
    const router = useRouter();

    const handleClick = () => {
        router.back();
    };

    return (
        <a className={styles.botonFlecha} onClick={handleClick}>
            <img src="/flechaAtras.png" className={styles.fotoFlecha} alt="Flecha" />
        </a>
    );
}

export default Flecha;
