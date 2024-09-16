'use client';
// pages/carrito.js
import React, { useEffect, useState } from 'react';

const Carrito = () => {
  const [cartItems, setCartItems] = useState({});

  useEffect(() => {
    // Cargar los ítems del carrito desde Local Storage
    const savedCart = JSON.parse(localStorage.getItem('cartItems')) || {};
    setCartItems(savedCart);
  }, []);

  const handleRemove = (id) => {
    const newCartItems = { ...cartItems };
    delete newCartItems[id]; // Eliminar producto del carrito
    setCartItems(newCartItems);
    localStorage.setItem('cartItems', JSON.stringify(newCartItems)); // Actualizar Local Storage
  };

  return (
    <div>
      <h1>Carrito de compras</h1>
      <ul>
        {Object.keys(cartItems).length > 0 ? (
          Object.entries(cartItems).map(([id, quantity]) => (
            <li key={id}>
              Producto {id} - Cantidad: {quantity}
              <button onClick={() => handleRemove(id)}>Eliminar</button>
            </li>
          ))
        ) : (
          <p>El carrito está vacío</p>
        )}
      </ul>
    </div>
  );
};

export default Carrito;
