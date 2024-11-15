'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './metodosAPagar.module.css';

const cuponesValidos = {
  "DESCUENTO10": 10,
  "DESCUENTO20": 20,
  "PR1MERAC0MPRA": 20,
  "2DAC0MPRA": 10
};

const MetodosAPagar = () => {
  const router = useRouter();

  const [direccion, setDireccion] = useState('');
  const [nombreLocal, setNombreLocal] = useState('');
  const [productos, setProductos] = useState([]);
  const [subtotal, setSubtotal] = useState(1000);
  const [envioSeleccionado, setEnvioSeleccionado] = useState(null);
  const [pagoSeleccionado, setPagoSeleccionado] = useState(null);
  const [descuento, setDescuento] = useState(0);
  const [cupon, setCupon] = useState('');
  const [cuponAplicado, setCuponAplicado] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const selectedTiendaId = localStorage.getItem('selectedTiendaId');
        const savedCart = JSON.parse(localStorage.getItem('cartItems')) || {};

        // Obtener datos del local
        const tiendaResponse = await fetch('http://localhost:3000/infoTiendas');
        const tiendaData = await tiendaResponse.json();
        const tienda = tiendaData.find(tienda => tienda.id == selectedTiendaId);
        if (tienda) setNombreLocal(tienda.nombrelocal);

        // Obtener productos
        const productosResponse = await fetch(`http://localhost:3000/productos/${selectedTiendaId}`);
        const productosData = await productosResponse.json();
        setProductos(productosData);

        // Calcular subtotal
        const subtotalCalculado = Object.entries(savedCart).reduce((acc, [id, cantidad]) => {
          const producto = productosData.find(prod => prod.id == id);
          return acc + (producto?.precioxpagina || 0) * cantidad;
        }, 0);
        setSubtotal(subtotalCalculado);

        // Obtener dirección del cliente desde la nueva API
        const direccionResponse = await fetch(`http://localhost:3000/direccion/${idusuario}`);
        const direccionData = await direccionResponse.json();
        setDireccion(direccionData.direccion);
        } catch (error) {
        console.error('Error fetching data:', error);
        }
    };

    fetchData();
  }, []);

  const handleSeleccionEnvio = (metodo) => setEnvioSeleccionado(metodo);
  const handleSeleccionPago = (metodo) => setPagoSeleccionado(metodo);
  const handleCuponChange = (e) => setCupon(e.target.value.toUpperCase());

  const handleAplicarCupon = () => {
    if (cuponesValidos[cupon]) {
      setDescuento(cuponesValidos[cupon]);
      setCuponAplicado(true);
    } else {
      alert('Cupón inválido');
    }
  };

  const handleIrAPagar = () => {
    if (envioSeleccionado && pagoSeleccionado) {
      router.push('/view/compraRealizada');
    }
  };

  const totalAntesDeDescuento = subtotal + (envioSeleccionado === 'Delivery' ? 2000 : 0);
  const totalConDescuento = totalAntesDeDescuento - (totalAntesDeDescuento * (descuento / 100));

  return (
    <div className={styles.container}>

      <div className={styles.divLocal}>
        <h2 className={styles.tituloLocal}>Nombre del local</h2>
        <p className={styles.nombreLocal}>{nombreLocal}</p>
      </div>

      <div className={styles.envio}>
        <h2 className={styles.titulo2}>Envío</h2>
        <div className={styles.envioOpciones}>
          <button
            className={`${styles.botonEnvio} ${envioSeleccionado === 'Delivery' ? styles.seleccionado : ''}`}
            onClick={() => handleSeleccionEnvio('Delivery')}
          >
            <img src="/delivery.png" alt="Delivery" className={styles.iconoEnvio} />
            <p className={styles.p}>Delivery</p>
          </button>
          <button
            className={`${styles.botonEnvio} ${envioSeleccionado === 'Local' ? styles.seleccionado : ''}`}
            onClick={() => handleSeleccionEnvio('Local')}
          >
            <img src="/local.png" alt="Local" className={styles.iconoEnvio} />
            <p className={styles.p}>Local</p>
          </button>
        </div>
      </div>

      <div className={styles.metodoPago}>
        <h2 className={styles.titulo2}>Método De Pago</h2>
        <div className={styles.pagoOpciones}>
          <button
            className={`${styles.botonPago} ${pagoSeleccionado === 'Efectivo' ? styles.seleccionado : ''}`}
            onClick={() => handleSeleccionPago('Efectivo')}
          >
            <img src="/precio.png" alt="Efectivo" className={styles.iconoEnvio} />
            <p className={styles.p}>Efectivo</p>
          </button>
          <button
            className={`${styles.botonPago} ${pagoSeleccionado === 'Tarjeta' ? styles.seleccionado : ''}`}
            onClick={() => handleSeleccionPago('Tarjeta')}
          >
            <img src="/tarjeta.png" alt="Tarjeta" className={styles.iconoEnvio} />
            <p className={styles.p}>Tarjeta</p>
          </button>
        </div>
      </div>

      <div className={styles.cuponContainer}>
        <h2 className={styles.titulo2}>Cupón de descuento</h2>
        <input
          type="text"
          className={styles.inputCupon}
          value={cupon}
          onChange={handleCuponChange}
          placeholder="Ingresa tu cupón"
          disabled={cuponAplicado}
        />
        <button className={styles.botonAplicarCupon} onClick={handleAplicarCupon} disabled={cuponAplicado}>
          Aplicar
        </button>
      </div>

      <div className={styles.resumen}>
        <h2 className={styles.titulo2}>Resumen</h2>
        <div className={styles.item}>
          <span>Costo de productos:</span>
          <span>${subtotal}</span>
        </div>
        <div className={styles.item}>
          <span>Descuento:</span>
          <span>{descuento}%</span>
        </div>
        <div className={styles.item}>
          <span>Costo de envío:</span>
          <span>${envioSeleccionado === 'Delivery' ? 2000 : 0}</span>
        </div>
        <div className={styles.subtotal}>
          <span>Total final:</span>
          <span>${totalConDescuento}</span>
        </div>
      </div>

      <div className={styles.botonContainer}>
        <button
          className={styles.botonIrAPagar}
          onClick={handleIrAPagar}
          disabled={!envioSeleccionado || !pagoSeleccionado}
        >
          Pagar
        </button>
      </div>
    </div>
  );
};

export default MetodosAPagar;
