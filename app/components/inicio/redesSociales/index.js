'use client'; // Añadir esta línea para convertir el componente en un Client Component

import React, { useState } from 'react';
import styles from './redesSociales.module.css';

const RedesSociales = () => {
  const [mensajeVisible, setMensajeVisible] = useState(false);

  const manejarClickGoogle = (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto
    setMensajeVisible(true); // Mostrar el mensaje

    // Ocultar el mensaje después de 5 segundos y redirigir
    setTimeout(() => {
      setMensajeVisible(false);
      window.location.href = 'http://localhost:3000/auth/google'; // Redirigir a la URL de Google
    }, 5000);
  };

  return (
    <div className={styles.redesContainer}>
      {mensajeVisible && (
        <div className={styles.mensajeContainer}>
          <span className={styles.mensaje}>Tu contraseña será, logingGoogle</span>
        </div>
      )}
      <div className={styles.textoContainer}>
        <hr className={styles.linea} />
        <span className={styles.texto}>Continuar con</span>
        <hr className={styles.linea} />
      </div>
      <div className={styles.botonesContainer}>
        <button className={styles.boton}>
          <img src="/facebook.png" alt="Facebook" className={styles.icono} />
        </button>
        <button className={styles.boton} onClick={manejarClickGoogle}>
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
