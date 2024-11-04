'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './flechaAtras.module.css';

function FlechaAtras() {
    const router = useRouter();

    const handleBackClick = () => {
        router.push("/view/menuBar"); // Función para volver a la pantalla anterior
    };

    return (
        <button className={styles.botonAtras} onClick={handleBackClick}>
            <img src="/flechaAtras.png" alt="Volver" className={styles.imagenAtras} />
        </button>
    );
}

export default FlechaAtras;
