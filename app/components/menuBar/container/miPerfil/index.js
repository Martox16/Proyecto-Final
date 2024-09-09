'use client' //todos los que tienen usestate hay que poner arriba esto.

import React, { useState } from 'react';
import './miPerfil.modules.css';
import styles from './miPerfil.modules.css';
import { useRouter } from 'next/navigation';


function MiPerfil() {
    const router = useRouter(); // Inicializa el router

    const handleClick = () => {
        router.push('/view/editarperfil'); // Reemplaza '/nuevaPagina' con la ruta a la que quieras navegar
    };

    return (
      <>
        <div onClick={handleClick}> 
          <a className='botonMiPerfil'>
            <img src="/menuBar/miPerfil.png" className="fotoMipefil" alt="MiPerfil" />
          </a>
          <div>
            <p className='desc'>Mi perfil</p>
          </div>
        </div>
      </>
    );
}

export default MiPerfil;
