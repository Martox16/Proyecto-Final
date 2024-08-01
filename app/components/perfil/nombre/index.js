'use client';
import React, { useState, useEffect } from 'react';


function Nombre() {
    const [nombre, setNombre] = useState('');
    const id = 1; // Reemplaza esto con el ID del usuario que desees buscar

    useEffect(() => {
        const fetchNombre = async () => {
            try {
                const response = await fetch(`http://localhost:3000/infoPerfil/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setNombre(data.nombre);
                } else {
                    console.error('Error al obtener el nombre');
                }
            } catch (error) {
                console.error('Error al conectar con la API:', error);
            }
        };

        fetchNombre();
    }, [id]);

    return (
        <div>
            {nombre ? <h1>Nombre: {nombre}</h1> : <p>Cargando...</p>}
        </div>
    );
}

export default Nombre;
