'use client';

import React, { useState, useEffect } from 'react';
import styles from './carrito.module.css';

const Carrito = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCarritoItems = async () => {
      try {
        const response = await fetch('http://localhost:3000/carrito/1', {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Error al obtener el item del carrito');
        }

        const data = await response.json();

        // Set the fetched object directly to the state
        setItems(data);
        console.log(data); // Log the data to verify its structure
      } catch (error) {
        console.error('Error al conectar con la API:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarritoItems();
  }, []); // Solo se ejecuta una vez al montar el componente

  return (
    <div>
      <div className={styles.content}>
        {loading ? (
          <p>Cargando...</p>
        ) : items.length > 0 ? (
          <ul>
           <div className={styles.activo} ><p>Hay un pedido activo</p></div> 
            {items.map((item, index) => (
              <li key={index}>
{item.nombre}<br />
 ${item.preciooriginal}<br />
${item.precioxpagina}<br />
{item.descripcion}<br />
 {item.cantdisponible}<br />
{item.pedidoactivo ? 'Sí' : 'No'}
              </li>
            ))}
          </ul>
        ) : (
          <p>¡Aquí aparecerá la comida que agregues al carrito!</p>
        )}
      </div>
    </div>
  );
};

export default Carrito;