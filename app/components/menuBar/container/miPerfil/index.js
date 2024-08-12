'use client' //todos los que tienen usestate hay que poner arriba esto.

import React, { useState } from 'react';
import './miPerfil.modules.css';
import styles from './miPerfil.modules.css';

function MiPerfil() {
    return (
      <>
      <div>
        <div>      <a className='botonMiPerfil'>
        <img src="/menuBar/miPerfil.png" className="fotoMipefil" alt="MiPerfil" />
      </a></div>
      <div>      <p className='desc'>Mi perfil</p></div>


      </div>

      </>
      
      
    );
}

export default MiPerfil;