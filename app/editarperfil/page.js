
'use client';
// app/editarPerfil/page.js
import React, { useEffect, useState } from 'react';

const EditarPerfil = ({ searchParams }) => {
//   const id = searchParams.id;
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
  });

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
          nacimiento: data.nacimiento,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/infoPerfil/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
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
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <h1>Editar Perfil</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre</label>
          <input name="nombre" value={formData.nombre} onChange={handleChange} />
        </div>
        <div>
          <label>Apellido</label>
          <input name="apellido" value={formData.apellido} onChange={handleChange} />
        </div>
        <div>
          <label>Teléfono</label>
          <input name="telefono" value={formData.telefono} onChange={handleChange} />
        </div>
        <div>
          <label>Email</label>
          <input name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div>
          <label>Fecha de Nacimiento</label>
          <input type="date" name="nacimiento" value={formData.nacimiento} onChange={handleChange} />
        </div>
        <button type="submit">Editar</button>
      </form>
    </div>
  );
};

export default EditarPerfil;
