import React, { useEffect, useState } from 'react';
import styles from './producto.module.css';

const Paquete = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [cantidad, setCantidad] = useState({});

  useEffect(() => {
    const selectedTiendaId = localStorage.getItem('selectedTiendaId');
    if (selectedTiendaId) {
      fetchData(selectedTiendaId);
    }
    // Cargar cantidades del carrito almacenadas en Local Storage al cargar el componente
    const savedCart = JSON.parse(localStorage.getItem('cartItems')) || {};
    setCantidad(savedCart);
  }, []);

  const fetchData = async (idLocal) => {
    try {
      const response = await fetch(`http://localhost:3000/productos/${idLocal}`);
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to fetch data: ${response.status} - ${errorMessage}`);
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
    }
  };

  const handleIncrement = (item) => {
    const newCantidad = {
      ...cantidad,
      [item.id]: (cantidad[item.id] || 0) + 1,
    };
    setCantidad(newCantidad);
    localStorage.setItem('cartItems', JSON.stringify(newCantidad)); // Guardar el carrito en Local Storage
  };

  const handleDecrement = (item) => {
    const newCantidad = {
      ...cantidad,
      [item.id]: Math.max((cantidad[item.id] || 0) - 1, 0),
    };
    setCantidad(newCantidad);
    localStorage.setItem('cartItems', JSON.stringify(newCantidad)); // Actualizar el carrito en Local Storage
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.cardsContainer}>
      <ul>
        {data.map(item => (
          <li key={item.id} className={styles.card}>
            <div className={styles.cardInner}>
              <img src="/logo.png" alt="FoodSave" className={styles.logo} />
              <div className={styles.cardContent}>
                <h3 className={styles.h3}>{item.nombre}</h3>
                <p className={styles.p}>{item.descripcion}</p>
                <div className={styles.cardPrice}>
                  <span className={styles.priceDiscount}>${item.preciooriginal}</span>
                  <span className={styles.price}>${item.precioxpagina}</span>
                </div>
              </div>
            </div>
            <div className={styles.cardQuantity}>
              <button
                onClick={() => handleDecrement(item)}
                className={styles.btnDecrease}
              >
                -
              </button>
              <span className={styles.quantity}>{cantidad[item.id] || 0}</span>
              <button
                onClick={() => handleIncrement(item)}
                className={styles.btnIncrease}
              >
                +
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Paquete;
