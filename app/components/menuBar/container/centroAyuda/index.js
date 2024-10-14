'use client' 

import React, { useState } from 'react';
import styles from './styles.module.css';
import { useRouter } from 'next/navigation';

function CentroAyuda() {
  const router = useRouter(); 

    const handleClick = () => {
        router.push('/view/centroAyuda'); 
    };
    return (
    <div className={styles.contenedor}>    
      <div onClick={handleClick}>
       <a className='botonAyuda'>
        <img src="/menuBar/centroAyuda.png" className="fotoAyuda" alt="Ayuda" />
      </a>
      </div>   
      <div>      <p className='desc'>Centro de <br />ayuda</p></div>

      
      </div>
      
      
    );
}

export default CentroAyuda;