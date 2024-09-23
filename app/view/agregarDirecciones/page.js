'use client';

import React, { useState } from 'react';
import styles from './agregarDirecciones.module.css';
import FlechaAtras from '../../components/componentesGenerales/flechaAtras';

const DireccionAgregar = () => {
  const [formData, setFormData] = useState({
    ciudad: '',
    calle: '',
    detalle: '',
    referencia: '',
    pais: '',
    etiqueta: '',             
    Detalledeentrega: '',
    idusuario: 1
  });

  const handleChange = (e) => {
    if(e.target.name == "etiqueta"){
        let value;
        switch(e.target.value){
            case 'Trabajo':
                value = 1;
                break;
            case 'Casa':
                value = 2;
                break;
            case 'Otro':
                value = 3;
                break;
            default:
              value = 0;
              break;
        };
        setFormData({ ...formData, [e.target.name]: value });
    }else if(e.target.name == "Detalledeentrega"){
        let value;
        console.log(e.target.value)
        switch(e.target.value){
            case 'Personal':
                value = 1;
                break;
            case 'Portería':
                value = 2;
                break;
            default:
              value = 0;
              break;
        };
        setFormData({ ...formData, [e.target.name]: value });
    }else{
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/direccion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error al agregar la dirección');
      }

      alert('Dirección agregada con éxito');
      setFormData({ 
        ciudad: '',
        calle: '',
        detalle: '',
        referencia: '',
        pais: '',
        etiqueta: '',
        Detalledeentrega: '',
        idusuario: 1
      });
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  return (
    <div className={styles.container}>
      <FlechaAtras />
      <h1 className={styles.title}>Agregar Dirección</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles['form-group']}>
          <label className={styles.label}>País</label>
          <input
            name="pais"
            value={formData.pais}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles['form-group']}>
          <label className={styles.label}>Ciudad</label>
          <input
            name="ciudad"
            value={formData.ciudad}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles['form-group']}>
          <label className={styles.label}>Calle</label>
          <input
            name="calle"
            value={formData.calle}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles['form-group']}>
          <label className={styles.label}>Detalle: Piso, dpto</label>
          <input
            name="detalle"
            value={formData.detalle}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles['form-group']}>
          <label className={styles.label}>Referencia</label>
          <textarea
            name="referencia"
            value={formData.referencia}
            onChange={handleChange}
            className={styles.textarea}
          />
        </div>
        <div className={styles['form-group']}>
          <label className={styles.label}>Etiqueta</label>
          <select
            name="etiqueta"
            value={formData.etiqueta}
            onChange={handleChange}
            className={styles.input}
          >
            <option value="">Seleccionar</option>
            <option value="Casa">Casa</option>
            <option value="Trabajo">Trabajo</option>
            <option value="Otro">Otro</option>
          </select>
        </div>
        <div className={styles['form-group']}>
          <label className={styles.label}>Detalle de Entrega</label>
          <select
            name="Detalledeentrega"
            value={formData.Detalledeentrega}
            onChange={handleChange}
            className={styles.input}
          >
            <option value="">Seleccionar</option>
            <option value="Personal">Personal</option>
            <option value="Portería">Portería</option>
          </select>
        </div>
        <button type="submit" className={styles.button}>
          Guardar Dirección
        </button>
      </form>
    </div>
  );
};

export default DireccionAgregar;
