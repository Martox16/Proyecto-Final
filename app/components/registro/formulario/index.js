    "use client";  // Asegurando que es un Client Component

    import React, { useState } from 'react';
    import { useRouter } from 'next/navigation';
    import styles from './formulario.module.css';

    const Formulario = () => {
        const [formData, setFormData] = useState({
            nombre: '',
            apellido: '',
            telefono: '',
            mail: '',
            password: '',
            username: '',
            fechaNac: '',
            vendedor: false // Campo siempre false
        });

        const router = useRouter();
        const [error, setError] = useState('');

        const handleChange = (e) => {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            });
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            setError('');  // Limpiamos errores previos

            try {
                // Enviamos la solicitud al backend con fetch
                const response = await fetch('http://localhost:3000/registro', { // Asegúrate que la URL sea correcta
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData), // Enviamos el estado formData
                });

                const data = await response.json();

                if (response.ok) {
                    // Si el registro es exitoso, redirigimos al home
                    localStorage.setItem('userId', data.id);
                    router.push('/view/home');
                } else {
                    // Si ocurre un error, mostramos el mensaje de error
                    setError(data.mensaje || 'Error en el registro');
                }
            } catch (error) {
                console.error('Error al conectar con la API:', error);
                setError('Error al conectar con la API');
            }
        };

        return (
            <form className={styles.formulario} onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Nombre"
                    className={styles.input}
                    required
                />
                <input
                    type="text"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                    placeholder="Apellido"
                    className={styles.input}
                    required
                />
                <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    placeholder="Teléfono"
                    className={styles.input}
                    required
                />
                <input
                    type="email"
                    name="mail"
                    value={formData.mail}
                    onChange={handleChange}
                    placeholder="Correo electrónico"
                    className={styles.input}
                    required
                />
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Nombre de usuario"
                    className={styles.input}
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Contraseña"
                    className={styles.input}
                    required
                />
                <input
                    type="date"
                    name="fechaNac"
                    value={formData.fechaNac}
                    onChange={handleChange}
                    className={styles.input}
                    required
                />

                {error && <p className={styles.error}>{error}</p>}

                <button type="submit" className={styles.boton}>
                    Registrarse
                </button>
            </form>
        );
    };

    export default Formulario;
