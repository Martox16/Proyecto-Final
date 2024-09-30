import React from 'react';
import FlechaAtras from '../../components/componentesGenerales/flechaAtras/index.js';
import styles from './crearResenia.module.css';


const crearResenia = () => {
    return (
        <div>
            <FlechaAtras />
            <div className={styles.contentContainer}>
                {/* Tu contenido aquí */}
            </div>
            
        </div>
    );
};

export default crearResenia;
