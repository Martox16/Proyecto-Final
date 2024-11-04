'use client';

import React, { useState } from 'react';
import styles from './agregarDirecciones.module.css';

const AgregarDireccion = ({ onAddDireccion }) => {
  const [formData, setFormData] = useState({
    pais: '',
    ciudad: '',
    calle: '',
    detalledeentrega: '', // Cambiado de 'detalle' a 'detalledeentrega'
    referencia: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem('userId'); // Asegúrate de que 'userId' esté en localStorage
      if (!userId) {
        alert('ID de usuario no encontrado. Asegúrate de iniciar sesión.');
        return;
      }

      const response = await fetch('http://localhost:3000/guardarDireccion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, userId }), // Asegúrate de enviar 'userId' aquí
      });

      if (response.ok) {
        const data = await response.json();
        alert('Dirección agregada con éxito');
        setFormData({ pais: '', ciudad: '', calle: '', detalledeentrega: '', referencia: '' }); // Reiniciar el formulario
        onAddDireccion(data); // Actualiza el estado en el componente padre, si es necesario
      } else {
        const errorMessage = await response.text(); // Captura el mensaje de error
        alert(`Hubo un error al agregar la dirección: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Error al agregar dirección:', error);
      alert('Hubo un error al agregar la dirección 2');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Agregar Dirección</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles['form-group']}>
          <label className={styles.label} htmlFor="pais">País</label>
          <input type="text" name="pais" id="pais" className={styles.input} placeholder="País" value={formData.pais} onChange={handleChange} required />
        </div>
        <div className={styles['form-group']}>
          <label className={styles.label} htmlFor="ciudad">Ciudad</label>
          <input type="text" name="ciudad" id="ciudad" className={styles.input} placeholder="Ciudad" value={formData.ciudad} onChange={handleChange} required />
        </div>
        <div className={styles['form-group']}>
          <label className={styles.label} htmlFor="calle">Calle</label>
          <input type="text" name="calle" id="calle" className={styles.input} placeholder="Calle" value={formData.calle} onChange={handleChange} required />
        </div>
        <div className={styles['form-group']}>
          <label className={styles.label} htmlFor="detalledeentrega">Detalle</label>
          <textarea name="detalledeentrega" id="detalledeentrega" className={styles.textarea} placeholder="Detalle" value={formData.detalledeentrega} onChange={handleChange} />
        </div>
        <div className={styles['form-group']}>
          <label className={styles.label} htmlFor="referencia">Referencia</label>
          <input type="text" name="referencia" id="referencia" className={styles.input} placeholder="Referencia" value={formData.referencia} onChange={handleChange} />
        </div>
        <button type="submit" className={styles.button}>Guardar Dirección</button>
      </form>
    </div>
  );
};

export default AgregarDireccion;
