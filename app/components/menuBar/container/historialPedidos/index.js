'use client' //todos los que tienen usestate hay que poner arriba esto.

import React, { useState } from 'react';
import './historial.modules.css';

function historialPedidos() {
    return (
      <>
      <div>   
        <div><a className='botonHistorial'>
        <img src="/menuBar/historialPedidos.png" className="fotoHistorial" alt="Historial" />
      </a></div>
             <div>      <p className='desc'>Historial de <br /> pedidos</p></div>

      </div>
      </>
      
      
    );
}

export default historialPedidos;