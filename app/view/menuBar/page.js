import React from 'react';
import styles from "./menuBar.module.css";
import NombreSaludo from '../../components/menuBar/nombreSaludo';
import Flecha from '../../components/menuBar/flechaAtras';
import MiPerfil from '../../components/menuBar/container/miPerfil';
import HistorialPedidos from '../../components/menuBar/container/historialPedidos';
import MetodoPago from '../../components/menuBar/container/metodoPago';
import CentroAyuda from '../../components/menuBar/container/centroAyuda';

function MenuBar() {
    return (
        <div className={styles.menuBarContainer}>
            <div className={styles.header}>
                <Flecha />
                <NombreSaludo />
            </div>
            <div className={styles.cardContainer}>
                <MiPerfil />
                <HistorialPedidos />
                <MetodoPago />
                <CentroAyuda />
            </div>
            <div className='micuenta-contenedor'>
              <p className='micuentaname'>Mi cuenta</p>  
              <div className='direcciones'>
              <img src="../../public/menuBar/ubicacion.png" className="fotoubicacion" alt="ubicacion"/>
              <p className='desc'>direcciones</p>
              </div>


            </div>

        </div>
    );
}


export default MenuBar;
