"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './formulario.module.css';

const Formulario = () => {
    const [comentario, setComentario] = useState('');
    const [userId, setUserId] = useState(null);
    const [selectedTiendaId, setSelectedTiendaId] = useState(null);

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
                idUsuario: userId,
                idLocal: selectedTiendaId,
                infoReseña: comentario,
            };

            const response = await axios.post('/api/agregarResenias', reseniaData);

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
