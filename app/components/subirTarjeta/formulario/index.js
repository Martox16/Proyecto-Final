'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Importa useRouter para la redirección
import styles from './formulario.module.css'; // Asegúrate de que este archivo CSS exista

const Formulario = () => {
    const router = useRouter(); // Inicializa useRouter
    const [formData, setFormData] = useState({
        fechaVencimiento: '',
        CVV: '',
        numeroTarjeta: '',
        nombreTitularTarjeta: '',
        tipo: 'Tarjeta', // Tipo de tarjeta predeterminado
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'numeroTarjeta') {
            // Formatear número de tarjeta con guiones
            const formattedValue = value.replace(/\D/g, '')
                .replace(/(.{4})/g, '$1-')
                .slice(0, 19); // Limita la longitud total a 19 (16 dígitos + 3 guiones)
            setFormData({ ...formData, [name]: formattedValue });
        } else if (name === 'fechaVencimiento') {
            // Formatear fecha como YYYY-MM-DD
            const formattedDate = value.replace(/\D/g, '') // Elimina cualquier caracter no numérico
                .slice(0, 8); // Limita la longitud a 8 caracteres (YYYYMMDD)

            // Agregar guiones en el formato YYYY-MM-DD
            const year = formattedDate.slice(0, 4);
            const month = formattedDate.slice(4, 6);
            const day = formattedDate.slice(6, 8);
            const dateWithDashes = `${year}${month.length > 0 ? '-' : ''}${month}${day.length > 0 ? '-' : ''}${day}`;

            setFormData({ ...formData, [name]: dateWithDashes });
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

        // Validar que la fecha esté en el formato correcto
        if (!/^\d{4}-\d{2}-\d{2}$/.test(formData.fechaVencimiento)) {
            alert('La fecha de vencimiento debe tener el formato YYYY-MM-DD.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/guardarTarjeta', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    userId,
                }),
            });

            if (response.ok) {
                // Redirige a la vista de tarjetas disponibles
                router.push('/view/tarjetasDispo');
            } else {
                const errorText = await response.text();
                console.error('Error al guardar la tarjeta:', response.statusText);
                alert(`Error: ${response.statusText} - ${errorText}`); // Mostrar error
            }
        } catch (error) {
            console.error('Error de red:', error);
            alert(`Error de red: ${error.message}`); // Mostrar error
        }
    };

    return (
        <div>
            <form className={styles.formContainer} onSubmit={handleSubmit} autoComplete="off">
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
                    placeholder="Fecha de Vencimiento (YYYY-MM-DD)"
                    value={formData.fechaVencimiento}
                    onChange={handleChange}
                    required
                    maxLength={10} // Longitud máxima para YYYY-MM-DD
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
                <input
                    type="hidden"
                    name="tipo"
                    value={formData.tipo} // Tipo de tarjeta está predeterminado
                />
                <button type="submit">Guardar Tarjeta</button>
            </form>
        </div>
    );
};

export default Formulario;
