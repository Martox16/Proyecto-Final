"use client";

import React, { useEffect, useState } from 'react';
import styles from './info.module.css';
import Header from "../../components/infoTienda/header/index.js";
import DireccionTienda from "../../components/infoTienda/direccionTienda/index.js";

const InfoTienda = () => {
  const [id, setId] = useState(null);

  useEffect(() => {
    const selectedTiendaId = localStorage.getItem('selectedTiendaId');
    setId(selectedTiendaId);
  }, []);

  return (
    <div className={styles.container}>
      {id && (
        <>
          <Header />
          <DireccionTienda/>
        </>
      )}
      <h1>ID: {id}</h1>
    </div>
  );
};

export default InfoTienda;
