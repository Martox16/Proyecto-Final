// components/agregarDireccion.js
'use client';

import React, { useState } from 'react';
import styles from './agregarDirecciones.module.css';
import FlechaAtras from '../../components/componentesGenerales/flechaAtras';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevaDireccion = { ...formData, id: Date.now() }; // Genera un ID único
    onAddDireccion(nuevaDireccion); // Llama a la función para agregar la dirección
    alert('Dirección agregada con éxito');
    setFormData({ pais: '', ciudad: '', calle: '', detalle: '', referencia: '' }); // Restablece el formulario
  };

  return (
    <div className={styles.container}>
      <FlechaAtras />
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
