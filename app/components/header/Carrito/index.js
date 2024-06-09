'use client' //todos los que tienen usestate hay que poner arriba esto.

import React, { useState } from 'react';
import './carrito.modules.css';

function Carrito() {
    return (
      <a className='botonCarrito'>
        <img src="/carrito.png" className="fotoCarrito" alt="Carrito" />
      </a>
    );
}

export default Carrito;