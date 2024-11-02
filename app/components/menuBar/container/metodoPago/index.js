'use client' // todos los que tienen useState hay que poner arriba esto.

import React from 'react';
import Link from 'next/link'; // Importa Link
import styles from './styles.module.css';

function MetodoPago() {
    return (
      <div className={styles.contenedor}>
        <div>
          <Link href="/view/tarjetasDispo" className='botonMetodo'> {/* Usa Link para la navegación */}
            <img src="/menuBar/metodoPago.png" className="fotoMetodo" alt="Metodo" />
          </Link>
        </div>
        <div>
          <p className='desc'>Metodo de <br /> pago</p>
        </div>
      </div>
    );
}

export default MetodoPago;
