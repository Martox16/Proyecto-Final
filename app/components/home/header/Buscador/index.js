'use client' //todos los que tienen usestate hay que poner arriba esto.
import React, { useState } from 'react';
import './buscador.modules.css';

const Buscador = () => {
    return (
      <div className="buscador">
        <input type="text" placeholder="Buscar..." className="input-buscador" />
      </div>
    );
  }
  
  export default Buscador;