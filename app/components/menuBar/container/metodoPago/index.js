'use client' //todos los que tienen usestate hay que poner arriba esto.

import React, { useState } from 'react';
import './metodo.modules.css';

function MetodoPago() {
    return (
      <>

        <a className='botonMetodo'>
        <img src="/menuBar/metodoPago.png" className="fotoMetodo" alt="Metodo" />
       </a>
      </>
      
      
    );
}

export default MetodoPago;