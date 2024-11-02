"use client"; // Asegúrate de que esto esté en la parte superior del archivo

import React, { useEffect, useState } from 'react';
import styles from './tusTarjetas.module.css';

const TusTarjetas = () => {
    const [tarjetas, setTarjetas] = useState([]);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        fetch(`http://localhost:3000/mostrarTarjetasPorId/${userId}`)
            .then((res) => res.json())
            .then((data) => setTarjetas(data))
            .catch((error) => console.error('Error al cargar las tarjetas:', error));
    }, []);

    const handleEditar = (id) => {
        console.log(`Editar ${id}`);
        // Aquí puedes agregar la lógica para editar la tarjeta
    };

    const handleEliminar = (id) => {
        console.log(`Eliminar ${id}`);
        // Aquí puedes agregar la lógica para eliminar la tarjeta
    };

    const detectarTipoTarjeta = (numeroTarjeta) => {
        const firstDigit = numeroTarjeta[0];
        const firstTwoDigits = numeroTarjeta.slice(0, 2);
        const firstFourDigits = numeroTarjeta.slice(0, 4);

        if (firstDigit === '4') {
            return 'Visa';
        } else if (['51', '52', '53', '54', '55'].includes(firstTwoDigits)) {
            return 'MasterCard';
        } else if (['34', '37'].includes(firstTwoDigits)) {
            return 'American Express';
        } else if (firstFourDigits === '6011' || 
                   (numeroTarjeta.startsWith('644') && numeroTarjeta.length >= 16) || 
                   (numeroTarjeta.startsWith('65') && numeroTarjeta.length >= 16)) {
            return 'Discover';
        } else if (numeroTarjeta.startsWith('3528') || 
                   (parseInt(firstTwoDigits) >= 35 && parseInt(firstTwoDigits) <= 38)) {
            return 'JCB';
        } else if (['300', '301', '302', '303', '304', '305', '36', '38', '39'].includes(firstTwoDigits)) {
            return 'Diners Club';
        } else if (firstDigit === '6' && numeroTarjeta.length >= 16) {
            return 'UnionPay';
        } else {
            return 'Tarjeta';
        }
    };

    return (
        <div className={styles.container}>
            {tarjetas.length > 0 ? (
                tarjetas.map((tarjeta) => (
                    <div className={styles.tarjeta} key={tarjeta.id}>
                        <div className={styles.detalles}>
                            <div className={styles.tipo}>
                                {detectarTipoTarjeta(tarjeta.numeroTarjeta)}
                            </div>
                            <div className={styles.numero}>
                                **** **** **** {tarjeta.numeroTarjeta.slice(-4)}
                            </div>
                        </div>
                        <div className={styles.acciones}>
                            <button className={styles.editar} onClick={() => handleEditar(tarjeta.id)}>Editar</button>
                            <button className={styles.eliminar} onClick={() => handleEliminar(tarjeta.id)}>Eliminar</button>
                        </div>
                    </div>
                ))
            ) : (
                <p>No tiene tarjetas</p>
            )}
        </div>
    );
};

export default TusTarjetas;
