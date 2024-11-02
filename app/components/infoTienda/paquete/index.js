"use client";

import React, { useEffect, useState } from 'react';
import styles from './tusTarjetas.module.css';

const TusTarjetas = () => {
    const [tarjetas, setTarjetas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTarjetas = async () => {
            const userId = localStorage.getItem('userId');
            if (userId) {
                try {
                    const response = await fetch(`http://localhost:3000/mostrarTarjetasPorId/${userId}`);
                    if (response.ok) {
                        const data = await response.json();
                        setTarjetas(data); // Guarda las tarjetas en el estado
                    } else {
                        console.error('Error al cargar las tarjetas');
                    }
                } catch (error) {
                    console.error('Error en la solicitud:', error);
                } finally {
                    setLoading(false); // Finaliza la carga
                }
            } else {
                console.log('ID de usuario no encontrado en localStorage');
                setLoading(false);
            }
        };

        fetchTarjetas();
    }, []);

    return (
        <div className={styles.container}>
            {loading ? (
                <p className={styles.loadingMessage}>Cargando tarjetas...</p>
            ) : tarjetas.length > 0 ? (
                <h3 className={styles.cardCount}>Tienes {tarjetas.length} tarjetas disponibles</h3>
            ) : (
                <h3 className={styles.noCardsMessage}>No tienes tarjetas</h3>
            )}
        </div>
    );
};

export default TusTarjetas;
