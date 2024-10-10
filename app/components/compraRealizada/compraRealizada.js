import React from 'react';
import styles from './compraRealizada.module.css';

const compraRealizada = () => {
    return (
      <div className={styles.divGeneral}>
        <div className={styles.divCodigo}>
            <p className={styles.numeroCodigo}>XX-XX-XX</p>
            <p className={styles.parrafo}>Muestra este código al delivery o al empleado del local para retirar su pedido.
            Puedes visualizar el código vía mail.<br/> ¡Gracias y que tengas una deliciosa comida!</p>
        </div>
      </div>
    );
  };
  
  export default compraRealizada;