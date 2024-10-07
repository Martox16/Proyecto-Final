// components/iniciarSesion/titulo/index.js
'use client'; // Marca este componente como Client Component

import React, { useEffect, useState } from 'react';
import styles from './titulo.module.css';

const Titulo = () => {
    const [nombrelocal, setNombre] = useState(null);
    const [id, setId] = useState(null);

    useEffect(() => {
        const selectedTiendaId = localStorage.getItem('selectedTiendaId');
        if (selectedTiendaId) {
            setId(selectedTiendaId);
        }
    }, []);

    useEffect(() => {
        if (id) {
            const apiUrl = `http://localhost:3000/infoTiendas`; // URL de tu API de tiendas
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    const tienda = data.find(tienda => tienda.id == id); // Encuentra la tienda con el ID seleccionado
                    if (tienda) { 
                        setNombre(tienda.nombrelocal);
                    } else {
                        console.error("Tienda no encontrada con el ID:", id);
                    }
                })
                .catch(error => console.error('Error fetching the tienda data:', error));
        }
    }, [id]);

    if (!nombrelocal) {
        return <div>Cargando nombre...</div>;
    }

    return (
        <h1 className={styles.titulo}>
            DEJA UNA RESEÑA SOBRE {nombrelocal}
        </h1>
    );
};

export default Titulo;
