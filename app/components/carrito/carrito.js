'use client';

import React, { useState, useEffect } from 'react';
import styles from './carrito.module.css';
import Subtotal from '../Subtotal/Subtotal';

const Carrito = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cantidad, setCantidad] = useState({});
  const [error, setError] = useState(null);
  const [subtotal, setSubtotal] = useState(0);

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

        // Inicializa las cantidades en 0
        const initialQuantities = {};
        data.forEach(item => {
          initialQuantities[item.id] = 0;
        });
        setCantidad(initialQuantities);

        setItems(data);
      } catch (error) {
        console.error('Error al conectar con la API:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarritoItems();
  }, []);

  useEffect(() => {
    const nuevoSubtotal = items.reduce((total, item) => {
      return total + item.precioxpagina * (cantidad[item.id] || 0);
    }, 0);
    setSubtotal(nuevoSubtotal);
  }, [items, cantidad]);

  const handleIncrement = (id) => {
    setCantidad(prevState => ({
      ...prevState,
      [id]: (prevState[id] || 0) + 1,
    }));
  };

  const handleDecrement = (id) => {
    setCantidad(prevState => ({
      ...prevState,
      [id]: Math.max((prevState[id] || 0) - 1, 0),
    }));
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }



  return (
    <div>
      <div className={styles.content}>
        {loading ? (
          <p>Cargando...</p>
        ) : items.length > 0 ? (
          <>
            <ul className={styles.list}>
              {items.map((item, index) => (
                <div key={item.id}>
                  <li className={styles.li}>
                    <div>
                      <img
                        src="/logo.png"
                        className={styles.logo}
                        alt="logo"
                      />
                    </div>
                    <div className={styles.container}>
                      <p className={styles.nombre}>{item.nombre}</p>
                      <p className={styles.descripcion}>{item.descripcion}</p>
                      <p className={styles.preciooriginal}>${item.preciooriginal}</p>
                      <p className={styles.precioxpagina}>${item.precioxpagina}</p>
                      <div className={styles.cardQuantity}>
                        <button
                          onClick={() => handleDecrement(item.id)}
                          className={styles.btnDecrease}
                        >
                          -
                        </button>
                        <span className={styles.quantity}>{cantidad[item.id]}</span>
                        <button
                          onClick={() => handleIncrement(item.id)}
                          className={styles.btnIncrease}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </li>
                  {index === items.length - 1 && <Subtotal amount={subtotal} />}
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
