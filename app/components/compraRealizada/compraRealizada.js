'use client';
import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import styles from './compraRealizada.module.css';

const CompraRealizada = () => {
    const [codigo, setCodigo] = useState('XX-XX-XX');
    const [email, setEmail] = useState('');

    // Formato XX-XX-XX
    const generarCodigoAleatorio = () => {
        const generarDosDigitos = () => {
            return Math.floor(Math.random() * 90 + 10); 
        };
        return `${generarDosDigitos()}-${generarDosDigitos()}-${generarDosDigitos()}`;
    };

    // Generar el código al cargar el componente
    useEffect(() => {
        const codigoGenerado = generarCodigoAleatorio();
        setCodigo(codigoGenerado);

        // Obtener el email del perfil
        const obtenerEmail = async () => {
            const id = localStorage.getItem('userId');
            try {
                const response = await fetch(`http://localhost:3000/infoPerfil/${id}`);
                if (!response.ok) {
                    throw new Error('Error al obtener los datos del perfil');
                }
                const data = await response.json();
                setEmail(data.mail); // Suponiendo que el JSON tiene la propiedad 'mail'
            } catch (error) {
                console.error('Error al obtener el email:', error);
            }
        };

        obtenerEmail();
    }, []);

    // Función para enviar el código por email
    const enviarCodigoPorEmail = () => {
        const templateParams = {
            codigo: codigo, // El código generado
            to_email: email // Usar el email obtenido de la API
        };

        emailjs.send('service_7ug75l3', 'template_a732xpk', templateParams, 'enlZDClIHncmv_Ghu')
            .then((response) => {
                console.log('Éxito!', response.status, response.text);
                alert('Código enviado al correo exitosamente.'); // Notificación al usuario
            }, (err) => {
                console.log('Falló...', err);
                alert('Error al enviar el código.'); // Notificación al usuario en caso de error
            });
    };

    return (
        <div className={styles.divGeneral}>
            <div className={styles.divCodigo}>
                <p className={styles.numeroCodigo}>{codigo}</p>
                <p className={styles.parrafo}>
                    Muestra este código al delivery o al empleado del local para retirar su pedido.
                    Puedes visualizar el código vía mail.<br/> ¡Gracias y que tengas una deliciosa comida!
                </p>
                <button onClick={enviarCodigoPorEmail} className={styles.botonEnviar}>
                    Enviar al mail
                </button>
            </div>
        </div>
    );
};

export default CompraRealizada;
