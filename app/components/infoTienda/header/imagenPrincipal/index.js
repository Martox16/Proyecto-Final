import React, { useState, useEffect } from 'react';
import styles from './imagenPrincipal.module.css';

const ImagenPrincipal = () => {
  const [imagenUrl, setImagenUrl] = useState('');

  useEffect(() => {
    const fetchImagen = async () => {
      const selectedTiendaId = localStorage.getItem('selectedTiendaId');
      if (selectedTiendaId) {
        try {
          const response = await fetch(`http://localhost:3000/infoTiendas`);
          const data = await response.json();
          // Buscar la tienda con el ID seleccionado
          const tienda = data.find(tienda => tienda.id.toString() === selectedTiendaId);
          if (tienda) {
            setImagenUrl(tienda.foto); // Asume que 'foto' es la propiedad que contiene la URL de la imagen
          }
        } catch (error) {
          console.error('Error al obtener la imagen:', error);
        }
      }
    };

    fetchImagen();
  }, []);

  return (
    <div className={styles.imagenContainer}>
      {imagenUrl ? (
        <img src={imagenUrl} alt="Imagen Principal" className={styles.imagen} />
      ) : (
        <p>Cargando imagen...</p>
      )}
    </div>
  );
};

export default ImagenPrincipal;
