'use client';

import React, { useEffect, useState } from 'react';
import styles from './carrito.module.css';

const Carrito = () => {
  const [cartItems, setCartItems] = useState({});
  const [productos, setProductos] = useState([]);
  const [nombreLocal, setNombreLocal] = useState(null);

  // Efecto para cargar datos de la tienda y productos
  useEffect(() => {
    // Cargar los ítems del carrito desde Local Storage
    const savedCart = JSON.parse(localStorage.getItem('cartItems')) || {};
    setCartItems(savedCart);

    // Obtener la información de la tienda
    const fetchNombreLocal = async () => {
      const selectedTiendaId = localStorage.getItem('selectedTiendaId');
      if (selectedTiendaId) {
        try {
          const response = await fetch('http://localhost:3000/infoTiendas');
          const data = await response.json();
          const tienda = data.find(tienda => tienda.id == selectedTiendaId);
          if (tienda) {
            setNombreLocal(tienda.nombre);
          }
        } catch (error) {
          console.error('Error fetching tienda data:', error);
        }
      }
    };

    fetchNombreLocal();

    // Obtener la información de los productos
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

  // Eliminar producto del carrito (solo frontend)
  const handleRemove = (id) => {
    const newCartItems = { ...cartItems };
    delete newCartItems[id]; // Eliminar producto del carrito en el estado
    setCartItems(newCartItems);
    localStorage.setItem('cartItems', JSON.stringify(newCartItems)); // Actualizar Local Storage
  };

  // Filtrar productos que están en el carrito y tienen una cantidad mayor a 0
  const productosFiltrados = Object.entries(cartItems).filter(([id, cantidad]) => cantidad > 0);

  // Crear un mapa de productos por ID para fácil acceso
  const productosPorId = productos.reduce((acc, producto) => {
    acc[producto.id] = producto;
    return acc;
  }, {});

  return (
    <div className={styles.contenedor}>
      <h1 className={styles.titulo}>Carrito de compras</h1>
      {nombreLocal && <h2 className={styles.nombreLocal}>{nombreLocal}</h2>}
      <ul className={styles.lista}>
        {productosFiltrados.length > 0 ? (
          productosFiltrados.map(([id, cantidad]) => {
            const producto = productosPorId[id];

            return (
              <li key={id} className={styles.itemLista}>
                <span className={styles.infoProducto}>
                  <strong>Nombre del paquete:</strong> {producto?.nombre || 'No disponible'} <br />
                  <strong>Cantidad:</strong> {cantidad} <br />
                  <strong>Precio por página:</strong> ${producto?.precioxpagina || 'No disponible'} <br />
                  <strong>Nombre del local:</strong> {nombreLocal}
                </span>
                <button className={styles.botonEliminar} onClick={() => handleRemove(id)}>Eliminar</button>
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
