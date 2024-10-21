"use client"; 

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import styles from './accesibilidad.module.css';



function AccesibilidadView() {
    const router = useRouter(); // Inicializa el hook useRouter

    // Función para manejar el clic en la flecha de atrás
    const handleClick = () => {
        router.back(); // Navega hacia atrás
    };

    return (
        <div>
            <a className={styles.botonFlecha} onClick={handleClick}>
                <img src="/flechaAtras.png" className={styles.fotoFlecha} alt="Flecha" />
            </a>
        <div className={styles.div}>
        <h1 className={styles.name}>Accesibilidad</h1>
            <div className={styles.card}>
                <h1 className={styles.name}>Para Todos</h1>
                <p className={styles.p}>
                    En Foodsave, nos comprometemos a hacer que nuestra plataforma sea accesible para todos,
                    incluidos aquellos con discapacidades. Hemos implementado diversas características para garantizar
                    que nuestra aplicación y sitio web sean fáciles de usar.
                </p>
            </div>
            <div className={styles.card}> 
                <h1 className={styles.name}>Tecnologías Asistivas</h1>
                <p className={styles.p}>
                    Nuestra plataforma es compatible con lectores de pantalla y tecnologías de asistencia,
                    facilitando la navegación para personas con discapacidades visuales.
                </p>
            </div>  
            <div className={styles.card}> 
                <h1 className={styles.name}>Diseño Inclusivo</h1>
                <p className={styles.p}>
                    Hemos diseñado nuestra interfaz con colores contrastantes y tamaños de fuente ajustables
                    para mejorar la legibilidad.
                </p>
            </div> 
            <div className={styles.card}>
                <h1 className={styles.name}>Navegación por Teclado</h1>
                <p className={styles.p}>
                    Puedes navegar completamente por nuestra plataforma utilizando solo el teclado,
                    lo que permite a las personas con movilidad reducida utilizar nuestros servicios sin dificultades.
                </p>
             </div>     
         </div> 

        </div>
    );
}

export default AccesibilidadView;
