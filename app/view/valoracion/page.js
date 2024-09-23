import React from 'react';
import FlechaAtras from '../../components/componentesGenerales/flechaAtras/index.js';
import Header from '../../components/valoracion/header/index.js'
import Valoraciones from '../../components/valoracion/valoraciones/index.js';
import styles from './valoracion.module.css';

const Valoracion = () => {
    return (
        <div>
                
            <FlechaAtras />
            <div className={styles.contentContainer}>
                
            </div>
            <Header />
            <Valoraciones />

        </div>
    );
};

export default Valoracion;
