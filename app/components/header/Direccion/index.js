'use client';

import React, { useState } from 'react';
import './direccion.modules.css';

export default function Direccion() {
    const [mostrarOpciones, setMostrarOpciones] = useState(false);
    const [direccionSeleccionada, setDireccionSeleccionada] = useState("La Pampa 3270");

    const direcciones = ["La Pampa 3270", "Vallejos 4364", "Yatay 240","Rio 587", "Corrientes 546", "Agregar Dirección", "Editar Dirección"];

    const handleClick = (direccion) => {
        setDireccionSeleccionada(direccion);
        setMostrarOpciones(false);
    };

    // Filtrar las direcciones para no mostrar la seleccionada
    const direccionesFiltradas = direcciones.filter(direccion => direccion !== direccionSeleccionada);

    return (
        <div className="direccion-container">
            <button onClick={() => setMostrarOpciones(!mostrarOpciones)} className="Adress-button">
                {direccionSeleccionada}
            </button>
            <div className={`direccion-opciones ${mostrarOpciones ? 'show' : ''}`}>
                {direccionesFiltradas.map((direccion, index) => (
                    <button
                        key={index}
                        onClick={() => handleClick(direccion)}
                        className="Adress-button">
                        {direccion}
                    </button>
                ))}
            </div>
        </div>
    );
}
