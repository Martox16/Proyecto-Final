import React from 'react';
import styles from './redesSociales.module.css';

const RedesSociales = () => {
  return (
    <div className={styles.redesContainer}>
      <div className={styles.textoContainer}>
        <hr className={styles.linea} />
        <span className={styles.texto}>Continuar con</span>
        <hr className={styles.linea} />
      </div>
      <div className={styles.botonesContainer}>
        <button className={styles.boton}>
          <img src="/facebook.png" alt="Facebook" className={styles.icono} />
        </button>
        <button className={styles.boton}>
          <img src="/google.png" alt="Google" className={styles.icono} />
        </button>
        <button className={styles.boton}>
          <img src="/apple.png" alt="Apple" className={styles.icono} />
        </button>
      </div>
    </div>
  );
};

export default RedesSociales;
