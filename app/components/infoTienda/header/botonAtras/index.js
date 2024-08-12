'use client'; // Asegúrate de poner esto arriba si usas useState

import React from 'react';
import { useRouter } from 'next/navigation'; // Importa desde 'next/navigation'
import styles from './botonAtras.module.css'; // Asegúrate de crear un archivo CSS correspondiente

function BotonAtras() {
    const router = useRouter();

    const handleClick = () => {
        router.back();
    };

    return (
        <a className={styles.botonAtras} onClick={handleClick}>
            <img src="/flechaAtras.png" className={styles.imagenFlecha} alt="Flecha" />
        </a>
    );
}

export default BotonAtras;
