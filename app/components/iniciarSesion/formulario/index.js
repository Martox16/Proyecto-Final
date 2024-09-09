// components/iniciarSesion/formulario/index.js
import React from 'react';
import styles from './formulario.module.css';

const Formulario = () => {
    return (
        <form className={styles.formulario}>
            <input type="text" placeholder="Usuario" className={styles.input} />
            <input type="password" placeholder="Contraseña" className={styles.input} />
            <div className={styles.extra}>
                <a href="#" className={styles.olvidaste}>¿Olvidaste tu contraseña?</a>
                <button type="submit" className={styles.boton}>Iniciar sesión</button>
            </div>
        </form>
    );
};

export default Formulario;
