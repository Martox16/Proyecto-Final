"use client"; 

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from "./accesibilidad.module.css";

function Accesibilidad() {
    const router = useRouter(); // Inicializa el hook useRouter

    const handleDireccionClick = () => {
        router.push('/view/accesibilidad'); 
    };

    return (
        <div className={styles.contenedor} onClick={handleDireccionClick}>
        <img src="/menuBar/accesibilidad.png" className={styles.fotoimg} alt="imagen accesibilidad" />
        <p className={styles.desc}>Accesibilidad</p>
        <img src="/menuBar/flecha.png" className={styles.fotoflecha} alt="imagen flecha" />
        </div>
    );
}

export default Accesibilidad;

