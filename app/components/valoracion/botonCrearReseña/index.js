'use client'; // Esta línea indica que el componente es un Client Component
import React from 'react';
import { useRouter } from 'next/navigation'; // Cambiamos a 'next/navigation'
import styles from './botonCrearReseña.module.css';

const BotonCrearReseña = () => {
    const router = useRouter();

    const handleClick = () => {
        router.push('/view/crearResenia'); // Ruta a la que deseas navegar
    };

    return (
        <div className={styles.botonContainer}>
            <button className={styles.boton} onClick={handleClick}>
                Crear Reseña
            </button>
        </div>
    );
};

export default BotonCrearReseña;
