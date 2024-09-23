// components/inicio/ImagenFS/index.js
import React from 'react';
import styles from './imagenFS.module.css';
import Logo from '../../../../public/Logo-FoodSave.svg'
import Image from 'next/image';

const ImagenFS = () => {
  return (
    <div className={styles.imagenContainer}>
      <Image
        src={Logo}
        width={300}
        height={200}
      />
    </div>
  );
};

export default ImagenFS;
