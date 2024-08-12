import React, { useState, useEffect } from 'react';
import styles from './imagenPrincipal.module.css';

const ImagenPrincipal = ({ children }) => {
  const [imagenUrl, setImagenUrl] = useState('');

  useEffect(() => {
    const fetchImagen = async () => {
      const selectedTiendaId = localStorage.getItem('selectedTiendaId');
      if (selectedTiendaId) {
        try {
          const response = await fetch(`http://localhost:3000/infoTiendas`);
          const data = await response.json();
          const tienda = data.find(tienda => tienda.id.toString() === selectedTiendaId);
          if (tienda) {
            setImagenUrl(tienda.foto);
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
      {children} {/* Renderiza los hijos dentro del contenedor de la imagen */}
    </div>
  );
};

export default ImagenPrincipal;
