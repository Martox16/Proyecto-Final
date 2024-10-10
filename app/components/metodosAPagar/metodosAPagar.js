'use client';
import React from 'react';
import { useRouter } from 'next/navigation'; 
import styles from './metodosAPagar.module.css';

const metodosAPagar = () => {
  const router = useRouter();
  const handleIrAPagar = () => {
    router.push('/view/compraRealizada');  
  };
  
    return (
        <div className={styles.container}>
          <div className={styles.direccion}>
            <h2 className={styles.titulo}>Dirección de entrega</h2>
            <button className={styles.botonCambiar}>Cambiar</button>
          </div>
          <div>
          <p className={styles.ubicacion}>XXXX</p>
          </div>
        
          <div className={styles.divLocal}>
            <h2 className={styles.tituloLocal}>Nombre del local</h2>
            <p className={styles.nombreLocal}>XXXXXXXXXX</p>
          </div>
          
    
          {/* Envío */}
          <div className={styles.envio}>
            <h2 className={styles.titulo2}>Envío</h2>
            <div className={styles.envioOpciones}>
            <button className={styles.botonEnvio}>
                <img src="/delivery.png" alt="Delivery" className={styles.iconoEnvio} />
                <p className={styles.p}>Delivery</p>
            </button>
            <button className={styles.botonEnvio}>
                <img src="/local.png" alt="Local" className={styles.iconoEnvio} />
                <p className={styles.p}>Local</p>
            </button>
            </div>
          </div>
    
          {/* Método de Pago */}
          <div className={styles.metodoPago}>
            <h2 className={styles.titulo2}>Método De Pago</h2>
            <div className={styles.pagoOpciones}>
            <button className={styles.botonPago}>
                <img src="/precio.png" alt="Efectivo" className={styles.iconoEnvio} />
                <p className={styles.p}>Efectivo</p>
            </button>
            <button className={styles.botonPago}>
                <img src="/tarjeta.png" alt="Tarjeta" className={styles.iconoEnvio} />
                <p className={styles.p}>Tarjeta</p>
            </button>
            <button className={styles.botonPago}>
                <img src="/agregarTarjeta.png" alt="Agregar tarjeta" className={styles.iconoEnvio} />
            </button>
            </div>

            <div >
            <div className={styles.cupon}> 
            <img src="/cupon.png" alt="Cupón" className={styles.iconocupon} />
            <p className={styles.p}>Aplicar cupón: </p>
            </div>
            <input type="text" placeholder="Cupon:" className={styles.cuponInput} />
          </div>
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
    
          <button className={styles.botonPagar} onClick={handleIrAPagar}>Ir A Pagar</button>
        </div>
      );
};

export default metodosAPagar;

