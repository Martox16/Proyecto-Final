'use client';

import React, { useState, useEffect } from 'react';
import styles from './carrito.module.css';
import Subtotal from '../Subtotal/Subtotal'; 

const Carrito = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mostrarDetalles, setMostrarDetalles] = useState(false);

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

  const toggleDetalles = () => {
    setMostrarDetalles(!mostrarDetalles);
  }

    const calcularSubtotal = () => {
      return items.reduce((total, item) => total + item.precioxpagina, 0);
    };
  
    const mostrarPagar = (item) =>{
      if(item == items[items.length-1]){
        return <Subtotal amount={calcularSubtotal} />
      }
    }

    return (
    <div>
      <div className={styles.content}>
        {loading ? (
          <p>Cargando...</p>
        ) : items.length > 0 ? (
          <>
            <ul className={styles.list}>
              <div
                className={styles.activo}
                onClick={toggleDetalles}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && toggleDetalles()}
                style={{ cursor: 'pointer' }} // Añadir estilo para indicar que es interactivo
              >
                <p>Hay un pedido activo</p>
              </div>
              <p>¡Pedido en marcha!</p>
              {mostrarDetalles &&
                items.map((item, index) => (
                  <div>
                  <li className={styles.li} key={index}>
                    <div>
                      <img
                        src="/logo.png"
                        className={styles.logo}
                        alt="logo"
                      />
                    </div>
                    <div>
                      <p className={styles.nombre}>{item.nombre}</p>
                      <p className={styles.descripcion}>
                        {item.descripcion}
                      </p>
                      <p className={styles.preciooriginal}>
                        ${item.preciooriginal}
                      </p>
                      <p className={styles.precioxpagina}>
                        ${item.precioxpagina}
                      </p>
                      <p className={styles.cantdisponible}>
                        {item.cantdisponible}
                      </p>
                    </div>

                  </li>
                    {mostrarPagar(item)}
                  </div>
                ))}
                
            </ul>
            
          </>
        ) : (
          <p>¡Aquí aparecerá la comida que agregues al carrito!</p>
        )}
      </div>
    </div>
  );

};

export default Carrito;
