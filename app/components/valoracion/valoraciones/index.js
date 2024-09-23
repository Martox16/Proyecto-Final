'use client';

import React, { useEffect, useState } from 'react';
import styles from './valoraciones.module.css'; // Carga el archivo CSS específico

const Valoraciones = () => {
  const [reseñas, setReseñas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReseñas = async () => {
      setLoading(true);
      const idlocal = localStorage.getItem('selectedTiendaId');
      if (idlocal) {
        try {
          const response = await fetch(`/mostrarTodasResenias/${idlocal}`);
          if (!response.ok) {
            if (response.status === 500) {
              throw new Error('Error en la base de datos');
            } else {
              throw new Error('Error al cargar las reseñas');
            }
          }
          const data = await response.json();
          setReseñas(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      } else {
        setError('ID de tienda no encontrado en el localStorage');
        setLoading(false);
      }
    };

    fetchReseñas();
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.valoracionesContainer}>
      {reseñas.length > 0 ? (
        <ul className={styles.listaResenas}>
          {reseñas.map((reseña) => (
            <li key={reseña.id} className={styles.elementoResena}>
              <strong className={styles.autorResena}>{reseña.autor}:</strong> {reseña.comentario}
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.noResenias}>NO HAY RESEÑAS</div>
      )}
    </div>
  );
};

export default Valoraciones;
