'use client';

import React from 'react';
import Styles from './subtotal.module.css';
import { useRouter } from 'next/navigation'; 

const Subtotal = ({ total }) => {
  const router = useRouter();

  const handleIrAPagar = () => {
    router.push('/view/metodosAPagar');  
  };

  return (
    <div className={Styles.totalContainer}>
      <h2 className={Styles.total}>Total: ${total.toFixed(2)}</h2>
      <button className={Styles.botonPagar} onClick={handleIrAPagar}>
        Ir a pagar
      </button>
    </div>
  );
};

export default Subtotal;
