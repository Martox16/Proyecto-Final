'use client' //todos los que tienen usestate hay que poner arriba esto.

import React, { useState } from 'react';
import styles from './styles.module.css'

function CentroAyuda() {
    return (
    <div className={styles.contenedor}>    
      <div>
       <a className='botonAyuda'>
        <img src="/menuBar/centroAyuda.png" className="fotoAyuda" alt="Ayuda" />
      </a>
      </div>   
      <div>      <p className='desc'>Centro de <br />ayuda</p></div>

      
      </div>
      
      
    );
}

export default CentroAyuda;