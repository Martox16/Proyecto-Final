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
    password:'',
    vendedor:'',
    username:'',
    mail: '',
    fechaNac: '',
    id:'',
    fotoPerfil: ''
  // Añadido para la imagen
  });
  const [selectedImage, setSelectedImage] = useState(null); // Nuevo estado para la imagen seleccionada
console.log(formData)
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
          password: data.password,
          vendedor: data.vendedor,
          username: data.username,
          mail: data.mail,
          fechaNac: new Date(data.fechaNac).toISOString().split('T')[0],
          fotoPerfil: data.fotoPerfil || '',
          id: 1
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
    console.log('tomi');
    try {
      console.log('formDataToSend Antes');
      
      /**/
      const formDataToSend = {
        nombre : formData.nombre || '',
        apellido: formData.apellido || '',
        telefono: formData.telefono || '',
        password: formData.password || '',
        vendedor: false,
        username: formData.username || '',
        fechaNac: formData.fechaNac || '',
        fotoPerfil: formData.fotoPerfil || '',
        mail: formData.mail || '',
        id: 1
    };
      
      console.log('formDataToSend despues');
      console.log(formDataToSend);
/*
      formDataToSend.append('nombre', formData.nombre || '');

      formDataToSend.append('apellido', formData.apellido || '');
      formDataToSend.append('telefono', formData.telefono || '');
      formDataToSend.append('password', formData.password || '');
      formDataToSend.append('vendedor', formData.vendedor || '');
      formDataToSend.append('username', formData.username || '');
      formDataToSend.append('fechaNac', formData.nacimiento || '');
      formDataToSend.append('mail', formData.mail || '');
      formDataToSend.append('id', id || '');
      formDataToSend.append('fotoPerfil',"a" || "");
      // Añadimos la imagen al FormData solo si se ha seleccionado una nueva
      if (selectedImage) {
        formDataToSend.append('fotoPerfil', selectedImage);
      }  
 */
      console.log('formDataToSend', formDataToSend);
      const response = await fetch (`http://localhost:3000/actualizarPerfil`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Otros encabezados si son necesarios
        },
        
        body: JSON.stringify(formDataToSend)
      });

      console.log(response);
      if (!response.ok) {
        throw new Error('No');
      }

      alert('Perfil actualizado con éxito');
    } catch (error) {
      alert(error);
    
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
            src={formData.fotoPerfil}
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
            required
          />
        </div>
        <div className={styles['form-group']}>
          <label className={styles.label}>Apellido</label>
          <input
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles['form-group']}>
          <label className={styles.label}>Usuario</label>
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles['form-group']}>
          <label className={styles.label}>Contraseña</label>
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles['form-group']}>
          <label className={styles.label}>Teléfono</label>
          <input
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            className={styles.input}
            type="tel"
            required
          />
        </div>
        <div className={styles['form-group']}>
          <label className={styles.label}>Email</label>
          <input
            name="mail"
            value={formData.mail}
            onChange={handleChange}
            className={styles.input}
            type="email"
            required
          />
        </div>
        <div className={styles['form-group']}>
          <label className={styles.label}>Fecha de Nacimiento</label>
          <input
            type="date"
            name="fechaNac"
            value={formData.fechaNac}
            onChange={handleChange}
            className={styles.input}
            required
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

