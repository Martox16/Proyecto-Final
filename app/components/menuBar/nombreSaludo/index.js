'use client';
import React, { useState, useEffect } from 'react';
import styles from './nombreSaludo.module.css';

function NombreSaludo() {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const id = 1; // Reemplaza esto con el ID del usuario que desees buscar

    useEffect(() => {
        const fetchNombreApellido = async () => {
            try {
                const response = await fetch(`http://localhost:3000/infoPerfil/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setNombre(data.nombre);
                    setApellido(data.apellido);
                } else {
                    console.error('Error al obtener el nombre y apellido');
                }
            } catch (error) {
                console.error('Error al conectar con la API:', error);
            }
        };

        fetchNombreApellido();
    }, [id]);

    return (
        <div className={styles.saludoContainer}>
            {nombre && apellido ? (
                <>
                    <span className={styles.hola}>Hola,</span>
                    <span className={styles.nombre}>{nombre} {apellido}</span>
                </>
            ) : (
                <p>Cargando...</p>
            )}
        </div>
    );
}

export default NombreSaludo;
