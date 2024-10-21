"use client"; // Agrega esta línea al principio del archivo

import React from 'react';
import { useRouter } from 'next/navigation'; // Cambia aquí
import styles from "./menuBar.module.css";
import NombreSaludo from '../../components/menuBar/nombreSaludo';
import Flecha from '../../components/menuBar/flechaAtras';
import MiPerfil from '../../components/menuBar/container/miPerfil';
import HistorialPedidos from '../../components/menuBar/container/historialPedidos';
import MetodoPago from '../../components/menuBar/container/metodoPago';
import CentroAyuda from '../../components/menuBar/container/centroAyuda';
import Direccion from '../../components/menuBar/cuenta/direcciones';
import Idioma from '../../components/menuBar/cuenta/idioma/index';
import Accesibilidad from '../../components/menuBar/cuenta/accesibilidad/index';
function MenuBar() {
    const router = useRouter(); // Inicializa el hook useRouter

    const handlePerfilClick = () => {


        router.push('/view/inicio'); 
    };

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
            <div className={styles.micuentacontenedor}>
                <p className={styles.micuentaname}>Mi cuenta</p>

                <Direccion />
                <Idioma/>
                <Accesibilidad/>


                <div className={styles.logoutContainer}>
                    <button className={styles.logoutButton} onClick={handlePerfilClick}>
                        Cerrar sesión
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MenuBar;
