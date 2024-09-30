import React from 'react';
import FlechaAtras from '../../components/componentesGenerales/flechaAtras/index.js';
import Header from '../../components/valoracion/header/index.js';
import Valoraciones from '../../components/valoracion/valoraciones/index.js';
import BotonCrearReseña from '../../components/valoracion/botonCrearReseña/index.js';
import styles from './valoracion.module.css';

const Valoracion = () => {
    return (
        <div>
            <FlechaAtras />
            <div className={styles.contentContainer}>
                {/* Tu contenido aquí */}
            </div>
            <Header />
            <Valoraciones />
            <BotonCrearReseña /> {/* Botón fijo en la parte inferior */}
        </div>
    );
};

export default Valoracion;
