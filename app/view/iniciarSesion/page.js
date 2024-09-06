import React from 'react';
import FlechaAtras from '../../components/componentesGenerales/flechaAtras/index.js';
import styles from './iniciarSesion.module.css';

const IniciarSesion = () => {
    return (
        <div className={styles.iniciarSesionContainer}>
            <div className={styles.topSection}></div>
            {/* Flecha debajo de la sección naranja */}
            <div className={styles.flechaContainer}>
                <FlechaAtras />
            </div>
            {/* Aquí agregarás el resto del contenido de la pantalla */}
        </div>
    );
};

export default IniciarSesion;
