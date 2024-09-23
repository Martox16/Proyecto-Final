// view/inicio/page.js
import React from 'react';
import BotonRegistro from '../../components/inicio/botonRegistro/index.js';
import BotonInicio from '../../components/inicio/botonInicio/index.js';
import RedesSociales from '../../components/inicio/redesSociales/index.js';
import ImagenFS from '../../components/inicio/imagenFS/index.js';


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
