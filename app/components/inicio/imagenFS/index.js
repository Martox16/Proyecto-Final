// components/inicio/ImagenFS/index.js
import React from 'react';
import styles from './imagenFS.module.css';

const ImagenFS = () => {
  return (
    <div className={styles.imagenContainer}>
      <img src="/logo.png" alt="Food Save Logo" className={styles.imagenFS} />
    </div>
  );
};

export default ImagenFS;
