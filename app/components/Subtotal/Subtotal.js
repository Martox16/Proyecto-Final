import styles from './Subtotal.module.css'; // Importa los estilos desde Subtotal.module.css

function Subtotal({ amount }) {
  return (
    <div className={styles.subtotalContainer}>
      <div className={styles.subtotalContent}>
        <div className={styles.subtotalText}>
          <p className={styles.label}>Subtotal</p>
          <p className={styles.amount}>${amount}</p>
        </div>
        <button className={styles.payButton}>Ir A Pagar</button>
      </div>
    </div>
  );
}

export default Subtotal;
