// view/iniciarSesion/page.js
import React from 'react';
import FlechaAtras from '../../../components/componentesGenerales/flechaAtras/index.js';
import Titulo from '../../../components/ingresarNuevaContra/titulo/index.js';
import styles from './ingresarMailContra.module.css';

const RecuperarContra = () => {
    return (
        <div className={styles.ContraContainer}>
            
            <div className={styles.topSection}></div>

            {/* Flecha debajo del topSection */}
            <div className={styles.flechaContainer}>
                <FlechaAtras />
            </div>

            
            <div className={styles.contentContainer}>
                {/* Aca van los componentes */}
                <Titulo />
            </div>
        </div>
    );
};

export default RecuperarContra;
