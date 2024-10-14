"use client"; 

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from "./idioma.module.css";

function Idioma() {
    const router = useRouter(); // Inicializa el hook useRouter

    const handleIdiomaClick = () => {
        router.push('/view/idioma'); 
    };

    return (
        <div className={styles.contenedor} onClick={handleIdiomaClick}>
        <img src="/menuBar/idioma.png" className={styles.fotoimg} alt="imagen idioma" />
        <p className={styles.desc}>Idioma</p>
        <img src="/menuBar/flecha.png" className={styles.fotoflecha} alt="imagen flecha" />
        </div>
    );
}

export default Idioma;


