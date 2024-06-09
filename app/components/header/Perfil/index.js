'use client' //todos los que tienen usestate hay que poner arriba esto.
import React, { useState } from 'react';
import './perfil.modules.css';

function Perfil() {
    return (
      <a className="botonPerfil">
        <img src="/perfil.png" className="fotoPerfil" alt="Perfil" />
        </a>
    );
}

export default Perfil;