'use client'; 
import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './botonRegistro.module.css';

function BotonRegistro() {
  const router = useRouter();

  const handleRegistro = () => {
      router.push('/view/registro');
  };

  return (
      <button className={styles.botonRegistro} onClick={handleRegistro}>
          Registrate gratis
      </button>
  );
}

export default BotonRegistro;
