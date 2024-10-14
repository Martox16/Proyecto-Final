"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './formulario.module.css';

const Formulario = () => {
    const [comentario, setComentario] = useState('');
    const [userId, setUserId] = useState(null);
    const [selectedTiendaId, setSelectedTiendaId] = useState(null);
    const cantEstrellas = 3; // Valor predeterminado para cantEstrellas

    useEffect(() => {
        // Obtener el ID de usuario y de la tienda desde localStorage
        const storedUserId = localStorage.getItem('userId');
        const storedTiendaId = localStorage.getItem('selectedTiendaId');

        setUserId(storedUserId);
        setSelectedTiendaId(storedTiendaId);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar que el ID de usuario y de la tienda estén disponibles
        if (!userId || !selectedTiendaId) {
            alert('Faltan datos de usuario o tienda');
            return;
        }

        try {
            const reseniaData = {
                idLocal: selectedTiendaId, // ID de la tienda
                idUsuario: userId, // ID del usuario
                cantEstrellas: cantEstrellas, // Estrellas predeterminadas
                infoReseña: comentario, // Comentario del usuario
            };

            // Cambiar la URL a la correcta
            const response = await axios.post('http://localhost:3000/agregarResenias', reseniaData);

            if (response.status === 200) {
                alert('Reseña agregada exitosamente');
                setComentario('');
            } else {
                alert('Hubo un error al agregar la reseña');
            }
        } catch (error) {
            console.error('Error al enviar la reseña:', error);
            alert('Hubo un problema al enviar la reseña');
        }
    };

    return (
        <form className={styles.formulario} onSubmit={handleSubmit}>
            <label>
                Comentario:
                <textarea
                    value={comentario}
                    onChange={(e) => setComentario(e.target.value)}
                    required
                />
            </label>
            <button type="submit">Enviar Reseña</button>
        </form>
    );
};

export default Formulario;
