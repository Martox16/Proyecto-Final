"use client";

import React, { useEffect, useState } from 'react';
import styles from './info.module.css';
import DireccionTienda from "../../components/infoTienda/direccionTienda/index.js"; // Verifica la ruta del archivo
import NombreTienda from "../../components/infoTienda/nombreTienda/index.js"; // Verifica la ruta del archivo

const InfoTienda = () => {
  const [id, setId] = useState(null);

  useEffect(() => {
    const selectedTiendaId = localStorage.getItem('selectedTiendaId');
    setId(selectedTiendaId);
  }, []);

  return (
    <div className={styles.container}>
      <h1>ID: {id}</h1>
      {id && (
        <>
          <NombreTienda />
          <DireccionTienda />
        </>
      )}
    </div>
  );
};

export default InfoTienda;
