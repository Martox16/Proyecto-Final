// pages/editarDireccion.js
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const EditarDireccionPage = () => {
  const router = useRouter();
  const query = router.query; // Obtener parámetros de la URL

  const [direccion, setDireccion] = useState({
    calle: '',
    ciudad: '',
    pais: '',
    detalle: '',
    referencia: '',
  });

  useEffect(() => {
    if (query.id) {
      // Configurar el estado con los datos recibidos desde la URL
      setDireccion({
        calle: query.calle || '',
        ciudad: query.ciudad || '',
        pais: query.pais || '',
        detalle: query.detalle || '',
        referencia: query.referencia || '',
      });
    }
  }, [query]);

  const handleChange = (e) => {
    setDireccion({ ...direccion, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar la lógica para guardar los cambios, por ejemplo:
    console.log('Dirección editada:', direccion);
    // Luego, redirigir de vuelta a la página de direcciones
    router.push('/editarDirecciones'); // Cambia a la ruta que desees
  };

  return (
    <div>
      <h1>Editar Dirección</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="calle" value={direccion.calle} onChange={handleChange} placeholder="Calle" required />
        <input type="text" name="ciudad" value={direccion.ciudad} onChange={handleChange} placeholder="Ciudad" required />
        <input type="text" name="pais" value={direccion.pais} onChange={handleChange} placeholder="País" required />
        <input type="text" name="detalle" value={direccion.detalle} onChange={handleChange} placeholder="Detalle" />
        <input type="text" name="referencia" value={direccion.referencia} onChange={handleChange} placeholder="Referencia" />
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default EditarDireccionPage;
