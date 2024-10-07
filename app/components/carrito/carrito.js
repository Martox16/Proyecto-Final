'use client';

import React, { useEffect, useState } from 'react';
import styles from './carrito.module.css';
import Subtotal from '../Subtotal/Subtotal'; 
import { useRouter } from 'next/navigation'; 

const Carrito = () => {
  const [cartItems, setCartItems] = useState({});
  const [productos, setProductos] = useState([]);
  const [nombrelocal, setNombreLocal] = useState(null);
  const [total, setTotal] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cartItems')) || {};
    setCartItems(savedCart);

    const fetchNombreLocal = async () => {
      const selectedTiendaId = localStorage.getItem('selectedTiendaId');
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

  useEffect(() => {
    const totalCalculado = Object.entries(cartItems).reduce((acc, [id, cantidad]) => {
      const producto = productos.find(prod => prod.id == id);
      return acc + (producto?.precioxpagina || 0) * cantidad;
    }, 0);
    setTotal(totalCalculado);
  }, [cartItems, productos]);

  const updateCartInLocalStorage = (updatedCart) => {
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

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

      {productosFiltrados.length > 0 && <Subtotal total={total} />} {/* Subtotal componente */}
    </div>
  );
};

export default Carrito;
