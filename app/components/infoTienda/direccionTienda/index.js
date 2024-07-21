import React, { useEffect, useState } from 'react';
import styles from './direccionTienda.module.css';

const DireccionTienda = () => {
  const [direccion, setDireccion] = useState(null);
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
            setDireccion(tienda.direccion);
          } else {
            console.error("Tienda no encontrada con el ID:", id);
          }
        })
        .catch(error => console.error('Error fetching the tienda data:', error));
    }
  }, [id]);

  if (!direccion) {
    return <div>Cargando dirección...</div>;
  }

  return (
    <div className={styles.direccionContainer}>
      <p>Dirección: {direccion}</p>
    </div>
  );
};

export default DireccionTienda;
