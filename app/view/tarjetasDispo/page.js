import React from 'react';
import styles from './tarjetasDispo.module.css';
import FlechaAtras from '../../components/componentesGenerales/flechaAtras/index.js';
import Titulo from '../../components/tarjetasDispo/titulo/index.js';
import TusTarjetas from '../../components/tarjetasDispo/tusTarjetas/index.js';
import BotonAgregar from '../../components/tarjetasDispo/botonAgregar'; // Importa el nuevo componente

const TarjetasDispo = () => {
    return (
        <div>
            <div className={styles.flechaContainer}>
                <FlechaAtras /> 
                <Titulo />
            </div>

            <div className={styles.contentContainer}>
                <TusTarjetas />
                <BotonAgregar />
            </div>

            
        </div>
    );
};

export default TarjetasDispo;
