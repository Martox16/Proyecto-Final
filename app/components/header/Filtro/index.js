'use client' //todos los que tienen usestate hay que poner arriba esto.
import React, { useState } from 'react';
import './filtro.modules.css';

function Filtro() {
    return (
      <button className='botonFiltro'>
        <img src="/filtro.png" className="fotoFiltro" alt="Filtro" />
      </button>
    );
}

export default Filtro;