"use client";
import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import Logo from '../../../../public/Logo-FoodSave.svg'
const Paquete = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [cantidad, setCantidad] = useState({});
  useEffect(() => {
    const selectedTiendaId = localStorage.getItem('selectedTiendaId');
    if (selectedTiendaId) {
      fetchData(selectedTiendaId);
    }
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
      // Cargar cantidades del carrito desde localStorage o inicializar en 0
      const savedCart = JSON.parse(localStorage.getItem('cartItems')) || {};
      const initialCantidad = {};
      result.forEach(item => {
        initialCantidad[item.id] = savedCart[item.id] || 0; // Si ya hay cantidad en el carrito, úsala
      });
      setCantidad(initialCantidad);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
    }
  };
  // Guardar el estado del carrito en localStorage cuando cambia la cantidad
  const updateCartInLocalStorage = (updatedCantidad) => {
    localStorage.setItem('cartItems', JSON.stringify(updatedCantidad));
  };
  const handleIncrement = (id) => {
    setCantidad(prevState => {
      const updatedCantidad = {
        ...prevState,
        [id]: prevState[id] + 1,
      };
      updateCartInLocalStorage(updatedCantidad);
      return updatedCantidad;
    });
  };
  const handleDecrement = (id) => {
    setCantidad(prevState => {
      const updatedCantidad = {
        ...prevState,
        [id]: Math.max(prevState[id] - 1, 0), // Mínimo 0
      };
      updateCartInLocalStorage(updatedCantidad);
      return updatedCantidad;
    });
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
          </li>
        ))}
      </ul>
    </div>
  );
        }; export default Paquete;
