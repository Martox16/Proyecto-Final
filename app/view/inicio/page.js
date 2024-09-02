// view/inicio/page.js
import React from 'react';
import ImagenFS from '../../components/inicio/ImagenFS';
import styles from './inicio.module.css';

const Inicio = () => {
  return (
    <div className={styles.inicioContainer}>
      <div className={styles.topSection}></div>
      <ImagenFS />
    </div>
  );
};

export default Inicio;
