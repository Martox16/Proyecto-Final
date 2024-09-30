// components/editarDireccion.js
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './editarDirecciones.module.css';
import FlechaAtras from '../../components/componentesGenerales/flechaAtras';
import AgregarDireccion from '../agregarDirecciones/page';

const EditarDireccion = () => {
  const [direcciones, setDirecciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAgregar, setShowAgregar] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchDirecciones = async () => {
      try {
        const response = await fetch('/direcciones.json'); // Cambia la URL al archivo JSON
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
  }, []);

  const eliminarDireccion = (direccionId) => {
    setDirecciones((prevDirecciones) => prevDirecciones.filter(d => d.id !== direccionId));
  };

  const agregarDireccion = (nuevaDireccion) => {
    setDirecciones((prevDirecciones) => [...prevDirecciones, nuevaDireccion]);
    setShowAgregar(false); // Ocultar formulario de agregar
  };

  const irAEditar = (direccionId) => {
    const direccion = direcciones.find(d => d.id === direccionId);
    if (direccion) {
      // Pasar todos los datos de la dirección a la página de edición
      const { calle, ciudad, pais, detalle, referencia } = direccion;
      router.push(`/editarDireccion`);
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.container}>
      <FlechaAtras />
      <h1>Editar Direcciones</h1>
      <button onClick={() => setShowAgregar(true)}>Agregar Dirección</button>
      {showAgregar && <AgregarDireccion onAddDireccion={agregarDireccion} />}
      <div className={styles.direccionesList}>
        {direcciones.length > 0 ? (
          direcciones.map((direccion) => (
            <div key={direccion.id} className={styles.direccionItem}>
              <div>
                {direccion.calle}, {direccion.ciudad}, {direccion.pais} - {direccion.detalle} ({direccion.referencia})
              </div>
              <button onClick={() => irAEditar(direccion.id)}>Editar</button>
              <button onClick={() => eliminarDireccion(direccion.id)}>Eliminar</button>
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
