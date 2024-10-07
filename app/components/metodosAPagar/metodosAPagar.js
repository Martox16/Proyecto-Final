import React from 'react';
import styles from './metodosAPagar.module.css';

const metodosAPagar = () => {
    return (
        <div className={styles.container}>
          <div className={styles.direccion}>
            <h2 className={styles.titulo}>Dirección de entrega</h2>
            <p className={styles.ubicacion}>La Pampa 5370</p>
            <button className={styles.botonCambiar}>Cambiar</button>
          </div>
    
          {/* Envío */}
          <div className={styles.envio}>
            <h2>Envío</h2>
            <div className={styles.envioOpciones}>
            <button className={styles.botonEnvio}>
                <img src="/delivery.png" alt="Delivery" className={styles.iconoEnvio} />
                Delivery
            </button>
            <button className={styles.botonEnvio}>
                <img src="/local.png" alt="Local" className={styles.iconoEnvio} />
                Local
            </button>
            </div>
          </div>
    
          {/* Método de Pago */}
          <div className={styles.metodoPago}>
            <h2>Método De Pago</h2>
            <div className={styles.pagoOpciones}>
            <button className={styles.botonEnvio}>
                <img src="/precio.png" alt="Efectivo" className={styles.iconoEnvio} />
                Efectivo
            </button>
            <button className={styles.botonEnvio}>
                <img src="/tarjeta.png" alt="Tarjeta" className={styles.iconoEnvio} />
                Tarjeta
            </button>
            <button className={styles.botonEnvio}>
                <img src="/agregarTarjeta.png" alt="Agregar tarjeta" className={styles.iconoEnvio} />
                +
            </button>
            </div>
            <img src="/cupon.png" alt="Cupón" className={styles.iconoEnvio} />
            <input type="text" placeholder="Cupon:" className={styles.cuponInput} />
          </div>
    
          {/* Resumen */}
          <div className={styles.resumen}>
            <h2>Resumen</h2>
            <div className={styles.item}>
              <span>Costo de productos:</span>
              <span>$24.000</span>
            </div>
            <div className={styles.item}>
              <span>Descuento:</span>
              <span>$12.000</span>
            </div>
            <div className={styles.item}>
              <span>Costo de envío:</span>
              <span>$500</span>
            </div>
            <div className={styles.subtotal}>
              <span>Subtotal:</span>
              <span>$12.500</span>
            </div>
            
          </div>
    
          <button className={styles.botonPagar}>Ir A Pagar</button>
        </div>
      );
};

export default metodosAPagar;
