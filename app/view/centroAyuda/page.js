'use client';
import React from 'react';
import styles from "./centroAyuda.module.css";
import { useRouter } from 'next/navigation'; 

const topicos = [
    {
        title: 'Cómo registrarme',
        description: 'Sigue estos pasos para crear una cuenta en FoodSave.',
    },
    {
        title: 'Pasos para hacer un pedido',
        description: 'Aprende cómo realizar un pedido de manera fácil y rápida.',
    },
    {
        title: 'Métodos de pago',
        description: 'Conoce los métodos de pago que aceptamos.',
    },
    {
        title: 'Política de devolución',
        description: 'Infórmate sobre nuestra política de devolución y reembolsos.',
    },
    {
        title: 'Contactar soporte',
        description: 'Descubre cómo puedes contactar a nuestro soporte al cliente.',
    },
    {
        title: 'Cómo actualizar mi perfil',
        description: 'Instrucciones para actualizar tu información personal en FoodSave.',
    },
    {
        title: 'Preguntas frecuentes',
        description: 'Encuentra respuestas a las preguntas más comunes que recibimos.',
    },
    {
        title: 'Problemas de acceso',
        description: 'Soluciones a problemas comunes de acceso a tu cuenta.',
    },
    {
        title: 'Rastreo de pedidos',
        description: 'Aprende a rastrear tus pedidos en tiempo real.',
    },
    {
        title: 'Opciones de entrega',
        description: 'Conoce las diferentes opciones de entrega que ofrecemos.',
    },
    {
        title: 'Cómo dejar una reseña',
        description: 'Pasos para dejar una reseña sobre tu experiencia con FoodSave.',
    },
    {
        title: 'Configuración de notificaciones',
        description: 'Aprende a configurar tus preferencias de notificación.',
    },
    {
        title: 'Seguridad de la cuenta',
        description: 'Consejos para mantener tu cuenta segura y protegida.',
    },
];

const CarritoPage = () => {
    const router = useRouter();
    const handleClick = () => {
        router.back();
    };
    
    return (
    <div>
        <a className={styles.botonFlecha} onClick={handleClick}>
            <img src="/flechaAtras.png" className={styles.fotoFlecha} alt="Flecha" />
        </a>
        <h1 className={styles.name} > Centro de ayuda</h1>
        <div className={styles.cardContainer}>
                {topicos.map((topicos, index) => (
                    <div key={index} className={styles.card}>
                        <h2 className={styles.h2}>{topicos.title}</h2>
                        <p className={styles.p}>{topicos.description}</p>
                        <a href="#" className={styles.link}>Leer más</a>
                    </div>
                ))}
            </div>
    </div>
  );
};

export default CarritoPage;

