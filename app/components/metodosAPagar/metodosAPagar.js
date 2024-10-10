'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import styles from './metodosAPagar.module.css';

// JSON
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

const cuponesValidos = {
  "DESCUENTO10": 10,
  "DESCUENTO20": 20
};

const MetodosAPagar = () => {
  const router = useRouter();
  const [direccion, setDireccion] = useState('');
  const [nombreLocal, setNombreLocal] = useState('');
  const [editable, setEditable] = useState(false); // Controla si se puede editar la dirección
  const [direccionTemporal, setDireccionTemporal] = useState(''); // Dirección temporal durante la edición
  const [envioSeleccionado, setEnvioSeleccionado] = useState(null); // Envío seleccionado
  const [pagoSeleccionado, setPagoSeleccionado] = useState(null);
  const [subtotal, setSubtotal] = useState(1000); 
  const [descuento, setDescuento] = useState(0);
  const [cupon, setCupon] = useState('');
  const [cuponAplicado, setCuponAplicado] = useState(false); 

  // Cargar datos del JSON al iniciar
  useEffect(() => {
    const local = datosLocal[0];
    const direccionCompleta = `${local.calle}, ${local.ciudad}, ${local.pais} - ${local.detalle}`;
    setDireccion(direccionCompleta);
    setDireccionTemporal(direccionCompleta);
    setNombreLocal(local.nombreLocal);
  }, []);

  // Manejar el click en "Cambiar"
  const handleCambiarDireccion = () => {
    setEditable(true); // Habilita la edición
  };

  // Manejar "Cancelar" la edición
  const handleCancelar = () => {
    setEditable(false); // Deshabilita la edición
    setDireccionTemporal(direccion); // Restaurar la dirección original
  };

  // Manejar "Guardar" los cambios
  const handleGuardar = () => {
    setDireccion(direccionTemporal); // Guardar la dirección temporal como definitiva
    setEditable(false); // Deshabilitar la edición
  };

  // Manejar la selección de envío
  const handleSeleccionEnvio = (metodo) => {
    setEnvioSeleccionado(metodo);
  };

  // Manejar la selección de método de pago
  const handleSeleccionPago = (metodo) => {
    setPagoSeleccionado(metodo);
  };

  // Manejar el botón "Ir a Pagar"
  const handleIrAPagar = () => {
    if (envioSeleccionado && pagoSeleccionado) {
      router.push('/view/compraRealizada');
    }
  };

  const handleCuponChange = (e) => {
    setCupon(e.target.value.toUpperCase()); // Convertir a mayúsculas
  };

  const handleAplicarCupon = () => {
    if (cuponesValidos[cupon]) {
      setDescuento(cuponesValidos[cupon]); // Aplicar descuento
      setCuponAplicado(true);
    } else {
      alert('Cupón inválido');
    }
  };



  return (
    <div className={styles.container}>
      {/* Dirección de entrega */}
      <div className={styles.direccion}>
        <h2 className={styles.titulo}>Dirección de entrega</h2>
        <button className={styles.botonCambiar} onClick={handleCambiarDireccion}>Cambiar</button>
      </div>

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

      {/* Nombre del local */}
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

      {/* Campo de cupón */}
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
          <span>XXXXX</span>
        </div>
        <div className={styles.item}>
          <span>Descuento:</span>
          <span>XXXXXX</span>
        </div>
        <div className={styles.item}>
          <span>Costo de envío:</span>
          <span>XXXXX</span>
        </div>
        <div className={styles.subtotal}>
          <span>Subtotal:</span>
          <span>XXXXXX</span>
        </div>
      </div>

      {/* Botón para ir a pagar */}
      <button
        className={styles.botonPagar}
        onClick={handleIrAPagar}
        disabled={!envioSeleccionado || !pagoSeleccionado} // Deshabilita si no se seleccionaron las opciones
      >
        Ir A Pagar
      </button>
    </div>
  );
};

export default MetodosAPagar;
