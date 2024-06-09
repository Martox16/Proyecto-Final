'use client' //todos los que tienen usestate hay que poner arriba esto.
import React, { useState } from 'react';
import './perfil.modules.css';

function Perfil() {
    return (
        <button className='botonPerfil'>
        <img src="/perfil.png" className="fotoPerfil" alt="Perfil" />
      </button>
    );
}

export default Perfil;