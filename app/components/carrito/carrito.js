'use client';

import React, { useEffect, useState } from 'react';
import styles from './carrito.module.css';

const Carrito = () => {
  const [cartItems, setCartItems] = useState({});
  const [productos, setProductos] = useState([]);
  const [nombrelocal, setNombreLocal] = useState(null);

  // Efecto para cargar datos de la tienda y productos
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cartItems')) || {};
    setCartItems(savedCart);

    const fetchNombreLocal = async () => {
      const selectedTiendaId = localStorage.getItem('selectedTiendaId');
      console.log('Tienda ID:', selectedTiendaId);
      if (selectedTiendaId) {
        try {
          const response = await fetch('http://localhost:3000/infoTiendas');
          const data = await response.json();
          const tienda = data.find(tienda => tienda.id == selectedTiendaId);
          if (tienda) {
            setNombreLocal(tienda.nombrelocal);
          }
        } catch (error) {
          console.error('Error fetching tienda data:', error);
        }
      }
    };

    fetchNombreLocal();

    const fetchProductos = async () => {
      const selectedTiendaId = localStorage.getItem('selectedTiendaId');
      if (selectedTiendaId) {
        try {
          const response = await fetch(`http://localhost:3000/productos/${selectedTiendaId}`);
          if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
          }
          const result = await response.json();
          setProductos(result);
        } catch (err) {
          console.error('Error al obtener los productos:', err);
        }
      }
    };

    fetchProductos();
  }, []);

  const updateCartInLocalStorage = (updatedCart) => {
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  // Incrementar cantidad de un producto en el carrito
  const handleIncrement = (id) => {
    setCartItems(prevCartItems => {
      const updatedCart = {
        ...prevCartItems,
        [id]: (prevCartItems[id] || 0) + 1,
      };
      updateCartInLocalStorage(updatedCart);
      return updatedCart;
    });
  };

  // Decrementar cantidad de un producto en el carrito
  const handleDecrement = (id) => {
    setCartItems(prevCartItems => {
      const updatedCart = {
        ...prevCartItems,
        [id]: Math.max((prevCartItems[id] || 0) - 1, 0),
      };
      updateCartInLocalStorage(updatedCart);
      return updatedCart;
    });
  };

  // Eliminar producto del carrito
  const handleRemove = (id) => {
    const newCartItems = { ...cartItems };
    delete newCartItems[id];
    setCartItems(newCartItems);
    updateCartInLocalStorage(newCartItems);
  };

  const productosFiltrados = Object.entries(cartItems).filter(([id, cantidad]) => cantidad > 0);

  const productosPorId = productos.reduce((acc, producto) => {
    acc[producto.id] = producto;
    return acc;
  }, {});

  return (
    <div className={styles.contenedor}>
      <h1 className={styles.titulo}>Carrito de compras</h1>
      <ul className={styles.lista}>
        {productosFiltrados.length > 0 ? (
          productosFiltrados.map(([id, cantidad]) => {
            const producto = productosPorId[id];

            return (
              <li key={id} className={styles.itemLista}>
                <div className={styles.divcarrito}>
                <span className={styles.infoProducto}>
                  <strong>Nombre del paquete:</strong> {producto?.nombre || 'No disponible'} <br />
                  <strong>Cantidad:</strong> {cantidad} <br />
                  <strong>Precio por página:</strong> ${producto?.precioxpagina || 'No disponible'} <br />
                  <strong>Nombre del local:</strong> {nombrelocal}
                </span>
                <div className={styles.controlesCantidad}>
                  <button className={styles.botonCantidad} onClick={() => handleDecrement(id)}>-</button>
                  <span className={styles.numeroCantidad}>{cantidad}</span>
                  <button className={styles.botonCantidad} onClick={() => handleIncrement(id)}>+</button>
                </div>
                <button className={styles.botonEliminar} onClick={() => handleRemove(id)}>Eliminar</button>
                </div>
                
              </li>
            );
          })
        ) : (
          <p className={styles.mensajeVacio}>El carrito está vacío</p>
        )}
      </ul>
    </div>
  );
};

export default Carrito;
