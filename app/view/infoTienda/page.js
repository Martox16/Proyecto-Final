"use client";

import React, { useEffect, useState } from 'react';
import styles from './info.module.css';
import Header from "../../components/infoTienda/header/index.js";
import DireccionTienda from "../../components/infoTienda/direccionTienda/index.js";
import Valoracion from "../../components/infoTienda/valoracion/index.js";
import Paquete from "../../components/infoTienda/paquete/index.js";
import { useRouter } from 'next/navigation';



function InfoTienda() {
  const router = useRouter();

  const irAlCarrito = () => {
    router.push('/view/carrito');
  };

  return (
    <div className={styles.container}>
      <Header  />
      <div className={styles.direYval}>
        <DireccionTienda />
        <Valoracion />
      </div>
      <Paquete />
      <div>
        <button className={styles.botonCarrito} onClick={irAlCarrito}>Ir al Carrito</button>
      </div>
    </div>
  );
}

export default InfoTienda;
