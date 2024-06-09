    'use client' //todos los que tienen usestate hay que poner arriba esto.

    import React, { useState } from 'react';
    import './direccion.modules.css';

    export default function Direccion() {
        const [mostrarOpciones, setMostrarOpciones] = useState(false);
        const [direccionSeleccionada, setDireccionSeleccionada] = useState("La Pampa 3270");

        const direcciones = ["La Pampa 3270", "Vallejos 4364", "Yatay 240", "Agregar Dirección", "Editar Dirección"];

        const handleClick = (direccion) => {
            setDireccionSeleccionada(direccion);
            setMostrarOpciones(false);
        };

        return (
            <div className="direccion-container">
                <button onClick={() => setMostrarOpciones(!mostrarOpciones)} className="Adress-button">
                    {direccionSeleccionada}
                </button>
                {mostrarOpciones && (
                    <div className="direccion-opciones">
                        {direcciones.map((direccion, index) => (
                            <button
                                key={index}
                                onClick={() => handleClick(direccion)}
                                className="Adress-button">
                                {direccion}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        );
    }

