import React from 'react';
import FlechaAtras from '../../../components/componentesGenerales/flechaAtras/index.js';
import styles from './registro.module.css';

const Registro = () => {
    return (
        <div className={styles.RegistroContainer}>
            <div className={styles.topSection}></div>
            <div className={styles.flechaContainer}>
                <FlechaAtras />
            </div>
        
        </div>
    );
};

export default Registro;
