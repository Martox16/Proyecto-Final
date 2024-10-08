import React from 'react';
import FlechaAtras from '../../components/componentesGenerales/flechaAtras/index.js';
import Title from '../../components/crearResenia/title/index.js';
import Formulario from '../../components/crearResenia/formulario/index.js';
import styles from './crearResenia.module.css';

const crearResenia = () => {
    return (
        <div>
            <FlechaAtras />
            <div className={styles.contentContainer}>
                <Title />
            </div>
            <Formulario />

        </div>
    );
};

export default crearResenia;
