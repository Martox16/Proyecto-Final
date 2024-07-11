"use client";

import React, { useEffect, useState } from 'react';
import styles from './info.module.css';

const InfoTiendaPage = () => {
  const [id, setId] = useState(null);

  useEffect(() => {
    const selectedTiendaId = localStorage.getItem('selectedTiendaId');
    setId(selectedTiendaId);
  }, []);

  return (
    <div className={styles.container}>
      <h1>ID: {id}</h1>
      <p>Hola</p>
    </div>
  );
};

export default InfoTiendaPage;
