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

      // Inicializar la cantidad por cada ítem
      const initialCantidad = {};
      result.forEach(item => {
        initialCantidad[item.id] = 0; // Valor inicial es 0
      });
      setCantidad(initialCantidad);

    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
    }
  };

  const handleIncrement = (id) => {
    setCantidad(prevState => ({
      ...prevState,
      [id]: prevState[id] + 1,
    }));
  };

  const handleDecrement = (id) => {
    setCantidad(prevState => ({
      ...prevState,
      [id]: Math.max(prevState[id] - 1, 0), // Mínimo 0
    }));
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <ul className={styles.cardContainer}>
        {data.map(item => (
          <li key={item.id} className={styles.card}>
            <img src="/Logo.png" alt="FoodSave" className={styles.logo} />
            <div className={styles.separator}>  
            </div>
            <div className={styles.content}>
              <h3 className={styles.h3}>{item.nombre}</h3>
              <p className={styles.p}>{item.descripcion}</p>
              <div className={styles.pricing}>
                <span className={styles.originalPrice}>${item.preciooriginal}</span>
                <span className={styles.discountedPrice}>${item.precioxpagina}</span>
              </div>
              <div className={styles.controls}>
                <button
                  onClick={() => handleDecrement(item.id)}
                  className={styles.decrementButton}
                >
                  -
                </button>
                <span className={styles.span}>{cantidad[item.id]}</span>
                <button
                  onClick={() => handleIncrement(item.id)}
                  className={styles.incrementButton}
                >
                  +
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Paquete;
