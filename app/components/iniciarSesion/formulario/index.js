"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './formulario.module.css';

const Formulario = () => {
    const [nombre, setNombre] = useState('');
    const [contrasena, setContrasena] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:3000/iniciarSesion/${nombre}/${contrasena}`);
            if (response.ok) {
                const data = await response.json();
                router.push('/view/home'); // Redirigir a la página de inicio si la autenticación es exitosa
            } else if (response.status === 404) {
                alert('Nombre no encontrado');
            } else if (response.status === 401) {
                alert('Contraseña incorrecta');
            } else {
                alert('Error en la autenticación');
            }
        } catch (error) {
            console.error('Error al conectar con la API:', error);
            alert('Error en la conexión');
        }
    };

    return (
        <form className={styles.formulario} onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder="Nombre" 
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className={styles.input} 
            />
            <input 
                type="password" 
                placeholder="Contraseña" 
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                className={styles.input} 
            />
            <div className={styles.extra}>
                <a href="#" className={styles.olvidaste}>¿Olvidaste tu contraseña?</a>
                <button type="submit" className={styles.boton}>Iniciar sesión</button>
            </div>
        </form>
    );
};

export default Formulario;
