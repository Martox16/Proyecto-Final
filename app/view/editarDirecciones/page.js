'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './editarDirecciones.module.css';
import FlechaAtras from '../../components/componentesGenerales/flechaAtras';

const EditarDireccion = () => {
  const id = localStorage.getItem('userId');
  const [direcciones, setDirecciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchDirecciones = async () => {
      try {
        const response = await fetch(`http://localhost:3000/direccion/${id}`);
        if (!response.ok) {
          throw new Error('Error al obtener las direcciones');
        }
        const data = await response.json();
        setDirecciones(data);
      } catch (error) {
        setError('Error al cargar las direcciones');
      } finally {
        setLoading(false);
      }
    };

    fetchDirecciones();
  }, [id]);

  const eliminarDireccion = async (direccionId) => {
    try {
      await fetch(`http://localhost:3000/direccion/${direccionId}`, {
        method: 'DELETE',
      });
      setDirecciones((prevDirecciones) => prevDirecciones.filter(d => d.id !== direccionId));
    } catch (error) {
      setError('Error al eliminar la dirección');
    }
  };

  const agregarDireccion = () => {
    router.push('/view/agregarDirecciones'); // Redirect to add address page
  };

  const irAEditar = (direccionId) => {
    router.push(`/agregarDireccion?id=${direccionId}`); // Redirect to edit address page
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.container}>
      <FlechaAtras />
      <h1>Editar Dirección</h1>
      <button className={styles.button} onClick={agregarDireccion}>Agregar Dirección</button>
      <div className={styles.direccionesList}>
        {direcciones.length > 0 ? (
          direcciones.map((direccion) => (
            <div key={direccion.id} className={styles.direccionItem}>
              {direccion.calle}
              <button className={styles.button} onClick={() => irAEditar(direccion.id)}>Editar</button>
              <button className={styles.button} onClick={() => eliminarDireccion(direccion.id)}>Eliminar</button>
            </div>
          ))
        ) : (
          <p>No tienes direcciones guardadas.</p>
        )}
      </div>
    </div>
  );
};

export default EditarDireccion;
