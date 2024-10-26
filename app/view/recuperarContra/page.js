import React from 'react';
import FlechaAtras from '../../components/componentesGenerales/flechaAtras/index.js';
import Titulo from '../../components/ingresarNuevaContra/titulo/index.js';
import Formulario from '../../components/ingresarNuevaContra/formulario/index.js'; // Importa el nuevo componente
import styles from './recuperarContra.module.css';

const RecuperarContra = () => {
    return (
        <div className={styles.ContraContainer}>
            <div className={styles.topSection}></div>

            <div className={styles.flechaContainer}>
                <FlechaAtras />
            </div>

            <div className={styles.contentContainer}>
                <Titulo />
                <Formulario /> {/* Añadir el formulario aquí */}
            </div>
        </div>
    );
};

export default RecuperarContra;
