import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Cambia esta línea
import styles from './valoracion.module.css';

const Valoracion = () => {
  const router = useRouter();
  const [valoracion, setValoracion] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    const selectedTiendaId = localStorage.getItem('selectedTiendaId');
    if (selectedTiendaId) {
      setId(selectedTiendaId);
    }
  }, []);

  useEffect(() => {
    if (id) {
      const apiUrl = `http://localhost:3000/infoTiendas`;
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          const tienda = data.find(tienda => tienda.id == id);
          if (tienda) {
            setValoracion(tienda.cantestrellas);
          } else {
            console.error("Tienda no encontrada con el ID:", id);
          }
        })
        .catch(error => console.error('Error fetching the tienda data:', error));
    }
  }, [id]);

  const handleClick = () => {
    router.push('/view/valoracion');
  };

  if (valoracion === null) {
    return <div>...</div>;
  }

  return (
    <div className={styles.valoracionContainer} onClick={handleClick}>
      <img src='/estrella.png' alt='Estrella' className={styles.valoracionImg} />
      <p className={styles.valoracionNum}>
        <span className={styles.valorRight}>{valoracion}</span>
      </p>
    </div>
  );
};

export default Valoracion;
