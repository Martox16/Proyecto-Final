import React, { useEffect, useState } from 'react';
import styles from './nombreTienda.module.css';


const NombreTienda = () => {
  const [nombre, setNombre] = useState(null);
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
            setNombre(tienda.nombre);
          } else {
            console.error("Tienda no encontrada con el ID:", id);
          }
        })
        .catch(error => console.error('Error fetching the tienda data:', error));
    }
  }, [id]);

  if (!nombre) {
    return <div>Cargando nombre...</div>;
  }

  return (
    <div className={styles.nombreContainer}>
      <p>{nombre}</p>
    </div>
  );
};

export default NombreTienda;
