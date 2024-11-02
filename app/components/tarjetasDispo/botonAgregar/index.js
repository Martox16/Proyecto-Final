// components/tarjetasDispo/botonAgregar.js
import React from 'react';
import Link from 'next/link';
import styles from './botonAgregar.module.css'; // Crea este archivo CSS

const BotonAgregar = () => {
    return (
        <div className={styles.botonContainer}>
            <Link href="/view/subirTarjeta">
                <button className={styles.botonAgregar}>Agregar Tarjeta</button>
            </Link>
        </div>
    );
};

export default BotonAgregar;
