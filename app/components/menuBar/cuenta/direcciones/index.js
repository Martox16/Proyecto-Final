"use client"; 

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from "./direcciones.module.css";

function Direccion() {
    const router = useRouter(); // Inicializa el hook useRouter

    const handleDireccionClick = () => {
        console.log("Redirigiendo a /view/direccion..."); // Para depuración
        router.push('/view/editarDirecciones'); 
    };

    return (
        <div className={styles.contenedor} onClick={handleDireccionClick}>
            <img src="/menuBar/direccion.png" className={styles.fotoimg} alt="imagen direccion" />
            <p className={styles.desc}>Direcciones</p>
            <img src="/menuBar/flecha.png" className={styles.fotoflecha} alt="imagen flecha" />
        </div>
    );
}

export default Direccion;
