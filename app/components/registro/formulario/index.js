"use client";  // Asegurando que es un Client Component

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './formulario.module.css';

const Formulario = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        telefono: '',
        nombre: '',
        apellido: '',
        fechaNac: '',
        email: ''
    });

    const router = useRouter();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleNextStep = () => {
        if (validateStep()) {
            setStep(step + 1);
        }
    };

    const handlePrevStep = () => {
        setStep(step - 1);
    };

    const validateStep = () => {
        switch (step) {
            case 1:
                if (!formData.username) {
                    alert('El nombre de usuario es obligatorio.');
                    return false;
                }
                break;
            case 2:
                if (!formData.password || !formData.confirmPassword) {
                    alert('Debes completar ambos campos de contraseña.');
                    return false;
                }
                if (formData.password !== formData.confirmPassword) {
                    alert('Las contraseñas no coinciden.');
                    return false;
                }
                break;
            case 3:
                if (!formData.telefono) {
                    alert('El número de teléfono es obligatorio.');
                    return false;
                }
                break;
            case 4:
                if (!formData.nombre || !formData.apellido) {
                    alert('El nombre y apellido son obligatorios.');
                    return false;
                }
                break;
            case 5:
                if (!formData.fechaNac) {
                    alert('La fecha de nacimiento es obligatoria.');
                    return false;
                }
                break;
            case 6:
                if (!formData.email) {
                    alert('El correo electrónico es obligatorio.');
                    return false;
                }
                break;
            default:
                return true;
        }
        return true;
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
          const response = await fetch('/registro', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),  // Aquí estás enviando el JSON
          });
  
          const data = await response.json();
          if (response.ok) {
              // Simulamos el registro exitoso y redirigimos
              localStorage.setItem('userId', data.id);
              router.push('/view/home');
          } else {
              alert('Error en el registro: ' + data.mensaje);
          }
      } catch (error) {
          console.error('Error de conexión:', error);
          alert('Error al conectar con la API');
      }
  };

    return (
        <form className={styles.formulario} onSubmit={handleSubmit}>
            {step === 1 && (
                <>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Nombre de usuario"
                        className={styles.input}
                        required
                    />
                    <button type="button" onClick={handleNextStep} className={styles.boton}>
                        Continuar
                    </button>
                </>
            )}

            {step === 2 && (
                <>
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
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Repetir Contraseña"
                        className={styles.input}
                        required
                    />
                    <div className={styles.extra}>
                        <button type="button" onClick={handlePrevStep} className={styles.botonChico}>
                            Atrás
                        </button>
                        <button type="button" onClick={handleNextStep} className={styles.boton}>
                            Continuar
                        </button>
                    </div>
                </>
            )}

            {step === 3 && (
                <>
                    <input
                        type="tel"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        placeholder="Teléfono"
                        className={styles.input}
                        required
                    />
                    <div className={styles.extra}>
                        <button type="button" onClick={handlePrevStep} className={styles.botonChico}>
                            Atrás
                        </button>
                        <button type="button" onClick={handleNextStep} className={styles.boton}>
                            Continuar
                        </button>
                    </div>
                </>
            )}

            {step === 4 && (
                <>
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
                    <div className={styles.extra}>
                        <button type="button" onClick={handlePrevStep} className={styles.botonChico}>
                            Atrás
                        </button>
                        <button type="button" onClick={handleNextStep} className={styles.boton}>
                            Continuar
                        </button>
                    </div>
                </>
            )}

            {step === 5 && (
                <>
                    <input
                        type="date"
                        name="fechaNac"
                        value={formData.fechaNac}
                        onChange={handleChange}
                        className={styles.input}
                        required
                    />
                    <div className={styles.extra}>
                        <button type="button" onClick={handlePrevStep} className={styles.botonChico}>
                            Atrás
                        </button>
                        <button type="button" onClick={handleNextStep} className={styles.boton}>
                            Continuar
                        </button>
                    </div>
                </>
            )}

            {step === 6 && (
                <>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className={styles.input}
                        required
                    />
                    <div className={styles.extra}>
                        <button type="button" onClick={handlePrevStep} className={styles.botonChico}>
                            Atrás
                        </button>
                        <button type="submit" className={styles.boton}>
                            Registrar
                        </button>
                    </div>
                </>
            )}
        </form>
    );
};

export default Formulario;
