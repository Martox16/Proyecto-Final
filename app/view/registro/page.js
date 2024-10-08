import React from 'react';
import FlechaAtras from '../../components/componentesGenerales/flechaAtras/index.js';
import styles from './registro.module.css';
import Titulo from '../../components/registro/titulo/index.js';
import Formulario from '../../components/registro/formulario/index.js';



const Registro = () => {
    return (
        <div className={styles.RegistroContainer}>
            <div className={styles.topSection}></div>

            <div className={styles.flechaContainer}>
                <FlechaAtras />
            </div>

            <div className={styles.contentContainer}>
                <Titulo />
                <Formulario />

            </div>
        
        </div>
    );
};

export default Registro;
