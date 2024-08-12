'use client' //todos los que tienen usestate hay que poner arriba esto.

import React, { useState } from 'react';
import './metodo.modules.css';

function MetodoPago() {
    return (
      <>
      <div>
        <div>      <a className='botonMetodo'>
        <img src="/menuBar/metodoPago.png" className="fotoMetodo" alt="Metodo" />
       </a></div>
<div>       <p className='desc'>Metodo de <br /> pago</p></div>

      </div>

      </>
      
      
    );
}

export default MetodoPago;