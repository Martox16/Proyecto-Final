'use client';
import React, { useState, useEffect } from 'react';
import './direccion.modules.css';

export default function Direccion() {
    const [mostrarOpciones, setMostrarOpciones] = useState(false);
    const [direccionSeleccionada, setDireccionSeleccionada] = useState("");
    const [direcciones, setDirecciones] = useState([]);

    useEffect(() => {
        const userId = '1'; // Supongamos que aquí tienes el ID de usuario
        const apiUrl = `http://localhost:3000/direccion/${userId}`; // Reemplaza 'puerto' con el puerto donde se ejecutan las APIs
        fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            setDirecciones(data);
            // Si hay direcciones cargadas, selecciona la primera por defecto
            if (data.length > 0) {
                setDireccionSeleccionada(data[0].ubicacion);
            }
        })
        .catch(error => console.error('Error:', error));
    }, []);

    const handleClick = (direccion) => {
        setDireccionSeleccionada(direccion);
        setMostrarOpciones(false);
    };

    // Función para manejar la acción de agregar dirección
    const handleAgregarDireccion = () => {
        // Aquí puedes manejar la lógica para agregar una nueva dirección
    };

    // Función para manejar la acción de editar dirección
    const handleEditarDireccion = () => {
        // Aquí puedes manejar la lógica para editar la dirección seleccionada
    };

    return (
        <div className="direccion-container">
            {direcciones.length > 0 && (
                <button onClick={() => setMostrarOpciones(!mostrarOpciones)} className="Adress-button">
                    {direccionSeleccionada ? direccionSeleccionada : "Selecciona una dirección"}
                </button>
            )}

            <div className={`direccion-opciones ${mostrarOpciones ? 'show' : ''}`}>
                {direcciones.map((direccion, index) => (
                    <button
                        key={index}
                        onClick={() => handleClick(direccion.ubicacion)}
                        className="Adress-button">
                        {direccion.ubicacion}
                    </button>
                ))}

                {direccionSeleccionada && (
                    <>
                        <button onClick={handleAgregarDireccion} className="Adress-button">
                            Agregar Dirección
                        </button>
                        <button onClick={handleEditarDireccion} className="Adress-button">
                            Editar Dirección
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
