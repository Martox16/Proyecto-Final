'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './formulario.module.css';

const Formulario = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        fechaVencimiento: '',
        CVV: '',
        numeroTarjeta: '',
        nombreTitularTarjeta: '',
        tipo: 'Tarjeta',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'numeroTarjeta') {
            // Elimina todos los caracteres no numéricos
            let numericValue = value.replace(/\D/g, '');
            
            // Aplicar el formato con guiones solo si hay números para mostrar
            if (numericValue.length > 0) {
                numericValue = numericValue.match(/.{1,4}/g).join('-'); // Divide en grupos de 4 dígitos
            }
            
            setFormData({ ...formData, [name]: numericValue });
        } else if (name === 'fechaVencimiento') {
            const formattedDate = value.replace(/\D/g, '').slice(0, 4);
            const year = formattedDate.slice(0, 2);
            const month = formattedDate.slice(2, 4);
            const dateDisplay = `${year}${month ? '/' : ''}${month}`;

            setFormData({ ...formData, [name]: dateDisplay });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem('userId');

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

        const [yearSuffix, month] = formData.fechaVencimiento.split('/');
        const year = parseInt(`20${yearSuffix}`, 10);
        const monthInt = parseInt(month, 10);

        // Validación del año y mes
        if (yearSuffix < 24 || monthInt < 1 || monthInt > 12) {
            alert('La fecha de vencimiento debe tener un año igual o superior a 24 y un mes entre 01 y 12.');
            return;
        }

        const fechaVencimiento = `20${yearSuffix}-${month}-01`;

        if (!/^\d{4}-\d{2}-\d{2}$/.test(fechaVencimiento)) {
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
                    fechaVencimiento,
                    userId,
                }),
            });

            if (response.ok) {
                router.push('/view/tarjetasDispo');
            } else {
                const errorText = await response.text();
                console.error('Error al guardar la tarjeta:', response.statusText);
                alert(`Error: ${response.statusText} - ${errorText}`);
            }
        } catch (error) {
            console.error('Error de red:', error);
            alert(`Error de red: ${error.message}`);
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
                    maxLength={19} 
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
                    placeholder="Fecha de Vencimiento (AA/MM)"
                    value={formData.fechaVencimiento}
                    onChange={handleChange}
                    required
                    maxLength={5}
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
                    value={formData.tipo}
                />
                <button type="submit">Guardar Tarjeta</button>
            </form>
        </div>
    );
};

export default Formulario;
