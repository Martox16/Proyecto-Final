'use client';
// app/editarPerfil/page.js

import React, { useEffect, useState } from 'react';
import styles from './editarperfil.module.css';
import FlechaAtras from '../../components/componentesGenerales/flechaAtras';

const EditarPerfil = ({ searchParams }) => {
  const id = 1;
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
    nacimiento: '',
    FotoPerfil: '', // Añadido para la imagen
  });
  const [selectedImage, setSelectedImage] = useState(null); // Nuevo estado para la imagen seleccionada

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/infoPerfil/${id}`);
        if (!response.ok) {
          throw new Error('Error al obtener los datos del perfil');
        }
        const data = await response.json();
        setPerfil(data);
        setFormData({
          nombre: data.nombre,
          apellido: data.apellido,
          telefono: data.telefono,
          email: data.mail,
          nacimiento: new Date(data.fechaNac).toISOString().split('T')[0],
          FotoPerfil: data.fotoPerfil,
        });
        setLoading(false);
      } catch (error) {
        setError('Error al cargar los datos del perfil');
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Nueva función para manejar la selección de la imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file); // Guarda la imagen seleccionada
    const imageUrl = URL.createObjectURL(file); // Muestra la vista previa de la imagen seleccionada
    setFormData({ ...formData, FotoPerfil: imageUrl });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('nombre', formData.nombre);
      formDataToSend.append('apellido', formData.apellido);
      formDataToSend.append('telefono', formData.telefono);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('nacimiento', formData.nacimiento);

      // Añadimos la imagen al FormData solo si se ha seleccionado una nueva
      if (selectedImage) {
        formDataToSend.append('FotoPerfil', selectedImage);
      }  

      const response = await fetch(`/api/infoPerfil/${id}`, {
        method: 'PUT',
        body: formDataToSend,
      });


      if (!response.ok) {
        throw new Error('Error al actualizar el perfil');
      }

      alert('Perfil actualizado con éxito');
    } catch (error) {
      alert('Error al actualizar el perfil');
    
}
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.container}>
      <FlechaAtras />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles['form-group']}>
          <img
            src={formData.FotoPerfil}
            alt="Foto de perfil"
            className={styles.imagenperfil}
          />
          <label htmlFor="fileInput" className={styles.fotocamara}>
            <img
              src="/fotocamara.png"
              alt="Foto camara"
              className={styles.fotocamara}
            />
          </label>
          <input
            id="fileInput"
            type="file"
            style={{ display: 'none' }} // Escondemos el input, y usamos el icono como disparador
            onChange={handleImageChange}
          />
        </div>
        <div className={styles['form-group']}>
          <label className={styles.label}>Nombre</label>
          <input
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div className={styles['form-group']}>
          <label className={styles.label}>Apellido</label>
          <input
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div className={styles['form-group']}>
          <label className={styles.label}>Teléfono</label>
          <input
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div className={styles['form-group']}>
          <label className={styles.label}>Email</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div className={styles['form-group']}>
          <label className={styles.label}>Fecha de Nacimiento</label>
          <input
            type="date"
            name="nacimiento"
            value={formData.nacimiento}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.button}>
          Guardar cambios
        </button>
      </form>
    </div>
  );
};

export default EditarPerfil;

