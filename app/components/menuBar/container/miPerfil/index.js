'use client' //todos los que tienen usestate hay que poner arriba esto.

import React, { useState } from 'react';
import './miPerfil.modules.css';

function MiPerfil() {
    return (
      <>
        <a className='botonMiPerfil'>
        <img src="/menuBar/miPerfil.png" className="fotoMipefil" alt="MiPerfil" />
      </a>
      </>
      
      
    );
}

export default MiPerfil;