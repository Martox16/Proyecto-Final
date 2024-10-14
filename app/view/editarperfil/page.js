'use client';
// app/editarPerfil/page.js

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Importa useRouter
import styles from './editarperfil.module.css';
import FlechaAtras from '../../components/componentesGenerales/flechaAtras';

const EditarPerfil = ({ searchParams }) => {
  const router = useRouter(); // Inicializa el router
  const id = localStorage.getItem('userId');
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    password: '',
    vendedor: '',
    username: '',
    mail: '',
    fechaNac: '',
    id: '',
    fotoPerfil: ''
  });
  const [selectedImage, setSelectedImage] = useState(null);

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
          id: localStorage.getItem('userId')
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    const imageUrl = URL.createObjectURL(file);
    setFormData({ ...formData, fotoPerfil: imageUrl });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = {
        nombre: formData.nombre || '',
        apellido: formData.apellido || '',
        telefono: formData.telefono || '',
        password: formData.password || '',
        vendedor: false,
        username: formData.username || '',
        fechaNac: formData.fechaNac || '',
        fotoPerfil: formData.fotoPerfil || '',
        mail: formData.mail || '',
        id: localStorage.getItem('userId')
      };

      const response = await fetch(`http://localhost:3000/actualizarPerfil`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataToSend)
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el perfil');
      }

      alert('Perfil actualizado con éxito');
      router.push('/view/home'); // Redirigir a home después de guardar cambios
    } catch (error) {
      alert(error.message);
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
            style={{ display: 'none' }}
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
