'use client'; // Necesario para usar hooks como useState o useRouter
import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './botonInicio.module.css';

function BotonInicio() {
    const router = useRouter();

    const handleIniciarSesionClick = () => {
        router.push('/view/iniciarSesion'); // Redirige a la página de inicio de sesión
    };

    return (
        <button className={styles.botonInicio} onClick={handleIniciarSesionClick}>
            Iniciar sesión
        </button>
    );
}

export default BotonInicio;
