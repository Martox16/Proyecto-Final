'use client' //todos los que tienen usestate hay que poner arriba esto.

import React, { useState } from 'react';
import styles from './styles.module.css';

function MetodoPago() {
    return (
      <div className={styles.contenedor}>
        <div>      <a className='botonMetodo'>
        <img src="/menuBar/metodoPago.png" className="fotoMetodo" alt="Metodo" />
       </a></div>
<div>       <p className='desc'>Metodo de <br /> pago</p></div>

      </div>
    );
}

export default MetodoPago;