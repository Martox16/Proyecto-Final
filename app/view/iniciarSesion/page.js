// view/iniciarSesion/page.js
import React from 'react';
import FlechaAtras from '../../components/componentesGenerales/flechaAtras/index.js';
import Titulo from '../../components/iniciarSesion/titulo/index.js';
import Formulario from '../../components/iniciarSesion/formulario/index.js';
import CuentaNueva from '../../components/iniciarSesion/cuentaNueva/index.js';
import styles from './iniciarSesion.module.css';

const IniciarSesion = () => {
    return (
        <div className={styles.iniciarSesionContainer}>
            {/* Esta es la sección naranja superior */}
            <div className={styles.topSection}></div>

            {/* Flecha debajo del topSection */}
            <div className={styles.flechaContainer}>
                <FlechaAtras />
            </div>

            {/* Aquí estará el contenido separado de la parte superior */}
            <div className={styles.contentContainer}>
                <Titulo />
                <Formulario />
                <CuentaNueva />
            </div>
        </div>
    );
};

export default IniciarSesion;
