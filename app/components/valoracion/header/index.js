'use client';

import React, { useEffect, useState } from 'react';
import styles from './header.module.css'; // Carga el archivo CSS específico

const Header = () => {
  const [nombreLocal, setNombreLocal] = useState('');
  const [imagenUrl, setImagenUrl] = useState('');
  const [valoracion, setValoracion] = useState(null); // Añadimos el estado para la valoración
  const [id, setId] = useState(null);

  // Obtener el ID de la tienda desde el localStorage
  useEffect(() => {
    const selectedTiendaId = localStorage.getItem('selectedTiendaId');
    if (selectedTiendaId) {
      setId(selectedTiendaId);
    }
  }, []);

  // Llamada para obtener el nombre, imagen y valoración del local
  useEffect(() => {
    if (id) {
      const apiUrl = `http://localhost:3000/infoTiendas`; // Asegúrate de que esta URL esté correcta
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          const tienda = data.find(tienda => tienda.id.toString() === id);
          if (tienda) {
            setNombreLocal(tienda.nombrelocal);
            setImagenUrl(tienda.foto); // Obtener la imagen
            setValoracion(tienda.cantestrellas); // Obtener la valoración
          } else {
            console.error('Tienda no encontrada con el ID:', id);
          }
        })
        .catch(error => console.error('Error al obtener los datos de la tienda:', error));
    }
  }, [id]);

  if (!nombreLocal || !imagenUrl || valoracion === null) {
    return <div>Cargando datos...</div>;
  }

  return (
    <div className={styles.headerContainer}>
      <div className={styles.imagenContainer}>
        <img src={imagenUrl} alt={`Imagen de ${nombreLocal}`} className={styles.imagen} />
      </div>
      <div className={styles.textContainer}>
        <p>
          <strong>{nombreLocal}</strong> tiene una calificación de{' '}
          <span className={styles.valoracionNum}>{valoracion}</span>{' '}
          <span className={styles.valoracionImg}>⭐</span> {/* Emoji de estrella */}
        </p>
      </div>
    </div>
  );
};

export default Header;
