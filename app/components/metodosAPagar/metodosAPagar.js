'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './metodosAPagar.module.css';

// Datos de ejemplo de dirección y local
const datosLocal = [
  {
    id: 1,
    pais: "Argentina",
    ciudad: "Buenos Aires",
    calle: "Avenida Corrientes",
    detalle: "Piso 3, Dpto 5",
    referencia: "Cerca del Obelisco",
    nombreLocal: "Tienda Central"
  }
];

// Cupones de descuento válidos (en porcentaje)
const cuponesValidos = {
  "DESCUENTO10": 10,
  "DESCUENTO20": 20,
  "PR1MERAC0MPRA": 20,
  "2DAC0MPRA": 10
};

const MetodosAPagar = () => {
  const router = useRouter();
  
  // Estados locales
  const [direccion, setDireccion] = useState('');
  const [nombreLocal, setNombreLocal] = useState('');
  const [editable, setEditable] = useState(false);
  const [direccionTemporal, setDireccionTemporal] = useState('');
  const [envioSeleccionado, setEnvioSeleccionado] = useState(null);
  const [pagoSeleccionado, setPagoSeleccionado] = useState(null);
  const [subtotal, setSubtotal] = useState(1000); 
  const [descuento, setDescuento] = useState(0);
  const [cupon, setCupon] = useState('');
  const [cuponAplicado, setCuponAplicado] = useState(false);

  // Cargar datos de ejemplo al iniciar
  useEffect(() => {
    const local = datosLocal[0];
    const direccionCompleta = `${local.calle}, ${local.ciudad}, ${local.pais} - ${local.detalle}`;
    setDireccion(direccionCompleta);
    setDireccionTemporal(direccionCompleta);
    setNombreLocal(local.nombreLocal);
  }, []);

  // Manejar el click en "Cambiar" para editar la dirección
  const handleCambiarDireccion = () => {
    setEditable(true);
  };

  // Cancelar edición
  const handleCancelar = () => {
    setEditable(false);
    setDireccionTemporal(direccion); // Restaurar la dirección original
  };

  // Guardar la dirección editada
  const handleGuardar = () => {
    setDireccion(direccionTemporal);
    setEditable(false);
  };

  // Seleccionar método de envío
  const handleSeleccionEnvio = (metodo) => {
    setEnvioSeleccionado(metodo);
  };

  // Seleccionar método de pago
  const handleSeleccionPago = (metodo) => {
    setPagoSeleccionado(metodo);
  };

  // Aplicar cupón de descuento
  const handleCuponChange = (e) => {
    setCupon(e.target.value.toUpperCase());
  };

  const handleAplicarCupon = () => {
    if (cuponesValidos[cupon]) {
      setDescuento(cuponesValidos[cupon]);
      setCuponAplicado(true);
    } else {
      alert('Cupón inválido');
    }
  };

  // Manejar el botón de ir a pagar
  const handleIrAPagar = () => {
    if (envioSeleccionado && pagoSeleccionado) {
      router.push('/view/compraRealizada');
    }
  };

  // Calcular el total con descuento (aplicando porcentaje sobre total)
  const totalAntesDeDescuento = subtotal + (envioSeleccionado === 'Delivery' ? 2000 : 0);
  const totalConDescuento = totalAntesDeDescuento - (totalAntesDeDescuento * (descuento / 100));

  return (
    <div className={styles.container}>
      {/* Dirección de entrega */}
      {envioSeleccionado === 'Delivery' && (
        <div className={styles.direccion}>
          <h2 className={styles.titulo}>Dirección de entrega</h2>
          <button className={styles.botonCambiar} onClick={handleCambiarDireccion}>Cambiar</button>
        </div>
      )}

      {/* Mostrar dirección solo si el envío es "Delivery" */}
      {envioSeleccionado === 'Delivery' && (
        <div>
          {editable ? (
            <>
              <input
                type="text"
                value={direccionTemporal}
                onChange={(e) => setDireccionTemporal(e.target.value)}
                className={styles.inputDireccion}
              />
              <div>
                <button className={styles.botonGuardar} onClick={handleGuardar}>Guardar</button>
                <button className={styles.botonCancelar} onClick={handleCancelar}>Cancelar</button>
              </div>
            </>
          ) : (
            <p className={styles.ubicacion}>{direccion}</p>
          )}
        </div>
      )}

      {/* Mostrar el nombre del local siempre */}
      <div className={styles.divLocal}>
        <h2 className={styles.tituloLocal}>Nombre del local</h2>
        <p className={styles.nombreLocal}>{nombreLocal}</p>
      </div>

      {/* Envío */}
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

      {/* Método de Pago */}
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

      {/* Cupón de descuento */}
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
        <button
          className={styles.botonAplicarCupon}
          onClick={handleAplicarCupon}
          disabled={cuponAplicado}
        >
          {cuponAplicado ? 'Cupón Aplicado' : 'Aplicar Cupón'}
        </button>
      </div>

      {/* Resumen */}
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

      {/* Botón para ir a pagar */}
      <div className={styles.botonContainer}>
        <button
          className={styles.botonIrAPagar}
          onClick={handleIrAPagar}
          disabled={!envioSeleccionado || !pagoSeleccionado}
        >
          Ir a pagar
        </button>
      </div>
    </div>
  );
};

export default MetodosAPagar;
