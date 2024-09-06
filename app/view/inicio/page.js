// view/inicio/page.js
import React from 'react';
import ImagenFS from '../../components/inicio/ImagenFS/index.js';
import BotonRegistro from '../../components/inicio/BotonRegistro/index.js';
import BotonInicio from '../../components/inicio/BotonInicio/index.js';
import RedesSociales from '../../components/inicio/RedesSociales/index.js';


import styles from './inicio.module.css';

const Inicio = () => {
  return (
    <div className={styles.inicioContainer}>
      <div className={styles.topSection}></div>
      <ImagenFS />
      <BotonRegistro />
      <BotonInicio />
      <RedesSociales />
    </div>
  );
};

export default Inicio;
