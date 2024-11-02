'use client';
import React, { useState } from 'react';
import styles from './formulario.module.css'; // Asegúrate de que este archivo CSS exista

const Formulario = () => {
    const [formData, setFormData] = useState({
        fechaVencimiento: '',
        CVV: '',
        numeroTarjeta: '',
        nombreTitularTarjeta: '',
        tipo: 'Tarjeta', // Tipo de tarjeta predeterminado
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // Mensaje de error

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Formatear número de tarjeta con guiones
        if (name === 'numeroTarjeta') {
            const formattedValue = value.replace(/\D/g, '') // Elimina caracteres no numéricos
                .replace(/(.{4})/g, '$1-') // Agrega un guion cada 4 dígitos
                .slice(0, 19); // Limita la longitud total a 19 (16 dígitos + 3 guiones)
            setFormData({ ...formData, [name]: formattedValue });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Obtener el ID de usuario del localStorage
        const userId = localStorage.getItem('userId');

        // Validaciones
        if (!userId) {
            alert('ID de usuario no encontrado. Asegúrate de haber iniciado sesión.');
            return;
        }

        if (!/^\d{16}$/.test(formData.numeroTarjeta.replace(/-/g, ''))) {
            alert('El número de tarjeta debe tener exactamente 16 dígitos.');
            return;
        }

        if (!/^\d{3}$/.test(formData.CVV)) {
            alert('El CVV debe tener exactamente 3 dígitos.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/guardarTarjeta', { // URL actualizada
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...formData, userId }), // Incluye userId en la solicitud
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Tarjeta guardada:', result);
                setSuccessMessage('Tarjeta guardada exitosamente.');
                setErrorMessage(''); // Limpiar el mensaje de error
                // Resetea el formulario
                setFormData({
                    fechaVencimiento: '',
                    CVV: '',
                    numeroTarjeta: '',
                    nombreTitularTarjeta: '',
                    tipo: 'Tarjeta', // Resetea tipo a Tarjeta
                });
            } else {
                const errorText = await response.text(); // Obtiene el mensaje de error del servidor
                console.error('Error al guardar la tarjeta:', response.statusText);
                setErrorMessage(`Error: ${response.statusText} - ${errorText}`); // Mostrar error en la interfaz
            }
        } catch (error) {
            console.error('Error de red:', error);
            setErrorMessage(`Error de red: ${error.message}`); // Mostrar error en la interfaz
        }
    };

    return (
        <div>
            <form className={styles.formContainer} onSubmit={handleSubmit} autoComplete="off"> {/* Desactiva el autocompletado */}
                <input
                    type="text"
                    name="numeroTarjeta"
                    placeholder="Número de Tarjeta (16 dígitos)"
                    value={formData.numeroTarjeta}
                    onChange={handleChange}
                    required
                    maxLength={19} // Longitud máxima para incluir guiones
                />
                <input
                    type="text"
                    name="nombreTitularTarjeta"
                    placeholder="Nombre del Titular"
                    value={formData.nombreTitularTarjeta}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="fechaVencimiento"
                    placeholder="Fecha de Vencimiento (MM/AA)"
                    value={formData.fechaVencimiento}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="CVV"
                    placeholder="CVV (3 dígitos)"
                    value={formData.CVV}
                    onChange={handleChange}
                    required
                    maxLength={3}
                />
                {/* El campo tipo ya no es visible en el formulario */}
                <input
                    type="hidden"
                    name="tipo"
                    value={formData.tipo} // Tipo de tarjeta está predeterminado
                />
                <button type="submit">Guardar Tarjeta</button>
            </form>
            {successMessage && <p className={styles.successMessage}>{successMessage}</p>} {/* Mostrar mensaje de éxito */}
            {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>} {/* Mostrar mensaje de error */}
        </div>
    );
};

export default Formulario;
