'use client';

import React, { useState } from 'react';
import styles from './agregarDirecciones.module.css';

const AgregarDireccion = ({ onAddDireccion }) => {
  const [formData, setFormData] = useState({
    pais: '',
    ciudad: '',
    calle: '',
    detalle: '',
    referencia: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       const userId = localStorage.getItem('userId'); 
      console.log(JSON.stringify({ ...formData, userId }));
      const response = await fetch('http://localhost:3000/guardarDireccion/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, userId }),
      });

      if (response.ok) {
        const data = await response.json();
        alert('Dirección agregada con éxito');
        setFormData({ pais: '', ciudad: '', calle: '', detalle: '', referencia: '' });
        onAddDireccion(data); // Actualiza el estado en el componente padre, si es necesario
        window.location.reload(); // Recarga la página
      } else {
        alert('Hubo un error al agregar la dirección 1');
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
          <label className={styles.label} htmlFor="detalle">Detalle</label>
          <textarea name="detalle" id="detalle" className={styles.textarea} placeholder="Detalle" value={formData.detalle} onChange={handleChange} />
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
