// view/subirTarjeta/page.js
'use client';
import React from 'react';
import styles from './subirTarjeta.module.css';
import FlechaAtras from '../../components/componentesGenerales/flechaAtras/index.js';
import Formulario from '../../components/subirTarjeta/formulario/index.js'; // Asegúrate de que coincida con el nombre del archivo
import Titulo from '../../components/subirTarjeta/titulo/index.js';



const SubirTarjeta = () => {
    return (
        <div>
             <div className={styles.flechaContainer}>
                <FlechaAtras /> 
                <Titulo />
            </div>
            <Formulario />
        </div>
    );
};

export default SubirTarjeta;
