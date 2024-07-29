import React, { useEffect, useState } from 'react';
import styles from './valoracion.module.css'; // Asegúrate de que el path sea correcto

const Valoracion = () => {
  const [valoracion, setValoracion] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    const selectedTiendaId = localStorage.getItem('selectedTiendaId');
    if (selectedTiendaId) {
      setId(selectedTiendaId);
    }
  }, []);

  useEffect(() => {
    if (id) {
      const apiUrl = `http://localhost:3000/infoTiendas`; // URL de tu API de tiendas
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          const tienda = data.find(tienda => tienda.id == id); // Encuentra la tienda con el ID seleccionado
          if (tienda) {
            setValoracion(tienda.cantestrellas); // Establece la valoración desde 'cantestrellas'
          } else {
            console.error("Tienda no encontrada con el ID:", id);
          }
        })
        .catch(error => console.error('Error fetching the tienda data:', error));
    }
  }, [id]);

  if (valoracion === null) {
    return <div>...</div>;
  }

  return (
    <div className={styles.valoracionContainer}>
      <img src='/estrella.png' alt='Estrella' className={styles.valoracionImg} />
      <p className={styles.valoracionNum}>
        <a className={styles.valorRight}>{valoracion}</a>
      </p>
    </div>
  );
};

export default Valoracion;
