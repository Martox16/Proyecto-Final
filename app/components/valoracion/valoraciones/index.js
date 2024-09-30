'use client';

import React, { useEffect, useState } from 'react';
import styles from './valoraciones.module.css';

const Valoraciones = () => {
  const [valoraciones, setValoraciones] = useState([]);
  const [perfiles, setPerfiles] = useState({});
  const [error, setError] = useState(null);
  const [idlocal, setIdLocal] = useState(null);
  const [loading, setLoading] = useState(true);

  // Obtener el idLocal desde el localStorage
  useEffect(() => {
    const storedIdLocal = localStorage.getItem('selectedTiendaId');
    if (storedIdLocal) {
      setIdLocal(storedIdLocal);
    } else {
      setError('No se encontró el ID del local en el almacenamiento');
      setLoading(false);
    }
  }, []);

  // Llamada a la API para obtener las valoraciones
  useEffect(() => {
    if (idlocal) {
      const fetchValoraciones = async () => {
        try {
          const response = await fetch(`http://localhost:3000/mostrarTodasResenias/${idlocal}`);
          
          if (!response.ok) {
            throw new Error('Error al cargar las valoraciones');
          }

          const data = await response.json();

          if (data.length === 0) {
            setError('NO HAY VALORACIONES');
          } else {
            setValoraciones(data);
          }
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchValoraciones();
    }
  }, [idlocal]);

  // Llamada a la API para obtener la información de los perfiles
  useEffect(() => {
    const fetchPerfiles = async () => {
      try {
        const uniqueIds = [...new Set(valoraciones.map((valoracion) => valoracion.idusuario))];
        const perfilesData = {};

        await Promise.all(
          uniqueIds.map(async (id) => {
            const response = await fetch(`http://localhost:3000/infoPerfil/${id}`);
            if (response.ok) {
              const perfil = await response.json();
              perfilesData[id] = perfil.nombre;
            }
          })
        );

        setPerfiles(perfilesData);
      } catch (error) {
        console.error('Error al cargar los perfiles:', error);
      }
    };

    if (valoraciones.length > 0) {
      fetchPerfiles();
    }
  }, [valoraciones]);

  if (loading) {
    return <div>Cargando valoraciones...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.valoracionesContainer}>
      {valoraciones.length > 0 ? (
        <ul className={styles.listaValoraciones}>
          {valoraciones.map((valoracion) => (
            <li key={valoracion.id} className={styles.valoracionItem}>
              <strong>{perfiles[valoracion.idusuario] || 'Usuario desconocido'}</strong>
              <p>{valoracion.comentario}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.noValoraciones}>NO HAY VALORACIONES</div>
      )}
    </div>
  );
};

export default Valoraciones;
