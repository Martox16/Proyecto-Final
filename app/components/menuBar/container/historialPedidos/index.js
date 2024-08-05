'use client' //todos los que tienen usestate hay que poner arriba esto.

import React, { useState } from 'react';
import './historial.modules.css';

function historialPedidos() {
    return (
      <>
        <a className='botonHistorial'>
        <img src="/menuBar/historialPedidos.png" className="fotoHistorial" alt="Historial" />
      </a>
      </>
      
      
    );
}

export default historialPedidos;