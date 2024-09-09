// components/iniciarSesion/cuentaNueva/index.js
import React from 'react';
import styles from './cuentaNueva.module.css';

const CuentaNueva = () => {
    return (
        <div className={styles.cuentaNueva}>
            ¿Eres nuevo? <a href="#">Creá una cuenta</a>
        </div>
    );
};

export default CuentaNueva;
