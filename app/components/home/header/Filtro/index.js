'use client' //todos los que tienen usestate hay que poner arriba esto.
import React, { useState } from 'react';
import styles from './filtro.module.css';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

function Filtro() {
    return (
      <a className={styles.botonFiltro}>
        <AdjustmentsHorizontalIcon style={{width: 35, height: 'auto'}}/>
      </a>
    );
}

export default Filtro;