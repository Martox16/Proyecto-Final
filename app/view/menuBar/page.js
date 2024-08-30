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
            <div  className={styles.micuentacontenedor}>
              <p className={styles.micuentaname}>Mi cuenta</p>  
             
              <div className={styles.contenedor}>
              <img src="/menuBar/direccion.png" className={styles.fotoimg} alt="imagen direccion"/>
              <p className={styles.desc}>Direcciones</p>
              <img src="/menuBar/flecha.png" className={styles.fotoflecha} alt="imagen flecha"/>
              </div>

              <div className={styles.contenedor}>
              <img src="/menuBar/idioma.png" className={styles.fotoimg} alt="imagen idioma"/>
              <p className={styles.desc}>Idioma</p>
              <img src="/menuBar/flecha.png" className={styles.fotoflecha} alt="imagen flecha"/>
              </div>

              <div className={styles.contenedor}>
              <img src="/menuBar/accesibilidad.png"className={styles.fotoimg} alt="imagen accesibilidad"/>
              <p className={styles.desc}>Accesibilidad</p>
              <img src="/menuBar/flecha.png" className={styles.fotoflecha} alt="imagen flecha"/>
              </div>


            </div>

        </div>
    );
}


export default MenuBar;
