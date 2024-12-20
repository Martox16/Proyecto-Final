'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './editarDirecciones.module.css';
import FlechaAtras from '../../componentesGenerales/flechaAtras/index';
import AgregarDireccion from '../agregarDirecciones/agregarDirecciones';

const EditarDireccion = () => {
  const [direcciones, setDirecciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAgregar, setShowAgregar] = useState(false);
  const [direccionEditando, setDireccionEditando] = useState(null); // Estado para la dirección que se está editando
  const router = useRouter();
  const idusuario = localStorage.getItem('userId'); // Definir el idusuario que se usará al guardar la dirección

  useEffect(() => {
    const fetchDirecciones = async () => {
      try {
        const response = await fetch(`http://localhost:3000/mostrarDireccionToda/${idusuario}`);
        
        if (!response.ok) {
          throw new Error('Error al obtener las direcciones');
        }
        const data = await response.json();
        console.log(data);
        setDirecciones(data); 
      } catch (error) {
        setError('Error al cargar las direcciones');
      } finally {
        setLoading(false);
      }
    };
  
    fetchDirecciones();
  }, []);

  const eliminarDireccion = async (direccionId) => {
    console.log(direccionId);
    try {
      const response = await fetch(`http://localhost:3000/eliminarDireccion/${direccionId}/${idusuario}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setDirecciones((prevDirecciones) => prevDirecciones.filter(d => d.id !== direccionId));
      } else {
        alert('Error al eliminar la dirección');
      }
    } catch (error) {
      console.error(error);
      alert('Error al eliminar la dirección');
    }
  };

  const agregarDireccion = (nuevaDireccion) => {
    setDirecciones((prevDirecciones) => [...prevDirecciones, nuevaDireccion]);
    setShowAgregar(false); // Ocultar formulario de agregar
  };

  const irAEditar = (direccionId) => {
    const direccion = direcciones.find(d => d.id === direccionId);
    if (direccion) {
      setDireccionEditando(direccion); // Establecer la dirección en el estado para editar
    }
  };

  const guardarEdicion = async () => {
    try {
      // Incluir el idusuario en el objeto de dirección editada
      const direccionConIdUsuario = { ...direccionEditando, idusuario };

      const response = await fetch(`http://localhost:3000/editarDireccion/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(direccionConIdUsuario), // Ahora el idusuario está incluido
      });

      if (response.ok) {
        console.log('Datos enviados:', direccionConIdUsuario);

        // Actualizar la lista de direcciones con la editada
        setDirecciones((prevDirecciones) =>
          prevDirecciones.map((d) =>
            d.id === direccionEditando.id ? direccionEditando : d
          )
        );
        setDireccionEditando(null); // Restablecer el estado para dejar de editar
      } else {
        const errorMessage = await response.text();
        console.log('Error al guardar los cambios:', response.status, errorMessage);
        alert('Error al guardar los cambios');
      }
    } catch (error) {
      console.error(error);
      alert('Error al guardar la edición');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDireccionEditando(prev => ({ ...prev, [name]: value })); // Actualizar los valores del estado de la dirección
  };

  // Alternar la visibilidad del formulario de agregar dirección
  const toggleAgregarDireccion = () => {
    setShowAgregar((prevShow) => !prevShow);
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.container}>
      <FlechaAtras />
      <h1 className={styles.titulo}>Editar Direcciones</h1>
      <button className={styles.button} onClick={toggleAgregarDireccion}>
        {showAgregar ? 'Cerrar Formulario' : 'Agregar Dirección'}
      </button>
      {showAgregar && <AgregarDireccion onAddDireccion={agregarDireccion} />}
      <div className={styles.direccionesList}>
        {direcciones.length > 0 ? (
          direcciones.map((direccion) => (
            <div key={direccion.id} className={styles.direccionItem}>
              <div className={styles.props}>
                <span className={styles.span}>Calle:</span> {direccion.calle} <br />
                <span className={styles.span}>Ciudad:</span> {direccion.ciudad} <br />
                <span className={styles.span}>Pais:</span> {direccion.pais} <br />
                <span className={styles.span}>Detalle:</span> {direccion.detalle} <br />
                <span className={styles.span}>Referencia:</span> {direccion.referencia}
              </div>
              <div>
                <button className={styles.boton2} onClick={() => irAEditar(direccion.id)}>Editar</button>
                <button className={styles.boton2} onClick={() => eliminarDireccion(direccion.id)}>Eliminar</button>
              </div>
            </div>
          ))
        ) : (
          <p>No tienes direcciones guardadas.</p>
        )}
      </div>
      
      {direccionEditando && (
        <div className={styles.editarForm}>
          <h2 className={styles.titulo} >Editar Dirección</h2>
          <input className={styles.input}
            type="text"
            name="calle"
            value={direccionEditando.calle}
            onChange={handleChange}
            placeholder="Calle"
          />
          <input className={styles.input}
            type="text"
            name="ciudad"
            value={direccionEditando.ciudad}
            onChange={handleChange}
            placeholder="Ciudad"
          />
          <input className={styles.input}
            type="text"
            name="pais"
            value={direccionEditando.pais}
            onChange={handleChange}
            placeholder="País"
          />
          <input className={styles.input}
            type="text"
            name="detalle"
            value={direccionEditando.detalle}
            onChange={handleChange}
            placeholder="Detalle"
          />
          <input className={styles.input}
            type="text"
            name="referencia"
            value={direccionEditando.referencia}
            onChange={handleChange}
            placeholder="Referencia"
          />
          <button className={styles.boton3} onClick={guardarEdicion}>Guardar</button>
          <button className={styles.boton3} onClick={() => setDireccionEditando(null)}>Cancelar</button>
        </div>
      )}
    </div>
  );
};

export default EditarDireccion;
