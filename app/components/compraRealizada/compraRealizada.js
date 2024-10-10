import React, { useState, useEffect } from 'react';
import styles from './compraRealizada.module.css';

const CompraRealizada = () => {
    const [codigo, setCodigo] = useState('XX-XX-XX');

    // formato XX-XX-XX
    const generarCodigoAleatorio = () => {
        const generarDosDigitos = () => {
            return Math.floor(Math.random() * 90 + 10); 
        };
        return `${generarDosDigitos()}-${generarDosDigitos()}-${generarDosDigitos()}`;
    };

    // Generar el código al cargar el componente
    useEffect(() => {
        const codigoGenerado = generarCodigoAleatorio();
        setCodigo(codigoGenerado);
    }, []);

    return (
      <div className={styles.divGeneral}>
        <div className={styles.divCodigo}>
            <p className={styles.numeroCodigo}>{codigo}</p>
            <p className={styles.parrafo}>
              Muestra este código al delivery o al empleado del local para retirar su pedido.
              Puedes visualizar el código vía mail.<br/> ¡Gracias y que tengas una deliciosa comida!
            </p>
        </div>
      </div>
    );
};

export default CompraRealizada;
