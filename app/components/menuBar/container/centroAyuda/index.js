'use client' //todos los que tienen usestate hay que poner arriba esto.

import React, { useState } from 'react';
import './ayuda.modules.css';

function CentroAyuda() {
    return (
      <>
        <a className='botonAyuda'>
        <img src="/menuBar/centroAyuda.png" className="fotoAyuda" alt="Ayuda" />
      </a>
      </>
      
      
    );
}

export default CentroAyuda;