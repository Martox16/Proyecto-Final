"use client"; // Asegúrate de usar esto en componentes que usan hooks
import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { useRouter } from 'next/navigation'; // Importación corregida

const Formulario = () => {
    const router = useRouter(); // Inicializar useRouter
    const [step, setStep] = useState(1);
    const [verificationCode, setVerificationCode] = useState('');
    const [generatedCode, setGeneratedCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [emailToChange, setEmailToChange] = useState(''); // Nuevo estado para almacenar el email

    const sendEmail = (e) => {
        e.preventDefault();

        const btn = document.getElementById('button');
        btn.value = 'Sending...';

        // Generar un código aleatorio de 4 dígitos
        const code = Math.floor(1000 + Math.random() * 9000).toString();
        setGeneratedCode(code); // Guardar el código generado para la verificación

        const serviceID = 'service_7ug75l3'; // Tu Service ID
        const templateID = 'template_dnwfcud'; // Tu Template ID
        const userID = 'enlZDClIHncmv_Ghu'; // Tu Public Key

        // Obtener el email ingresado
        const emailInput = e.target.reply_to.value; // Email ingresado
        setEmailToChange(emailInput); // Guardar el email en el estado

        // Crear un objeto de parámetros para enviar a EmailJS
        const templateParams = {
            reply_to: emailInput, // Establecer el email que ingresó el usuario
            message: code, // El código generado
        };

        emailjs.send(serviceID, templateID, templateParams, userID)
            .then(() => {
                btn.value = 'Send Email';
                setStep(2); // Cambiar a la vista de ingreso del código
            }, (err) => {
                btn.value = 'Send Email';
                alert('Error al enviar: ' + JSON.stringify(err));
            });
    };

    const handleVerification = (e) => {
        e.preventDefault();
        if (verificationCode === generatedCode) {
            setStep(3); // Cambiar a la vista de ingreso de nueva contraseña
        } else {
            alert('Código incorrecto, intenta de nuevo.');
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        
        // Validación de contraseña
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

        if (regex.test(newPassword)) {
            const response = await fetch('http://localhost:3000/actualizarPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    mail: emailToChange, // Usar el email del estado
                    password: newPassword,
                }),
            });

            if (response.ok) {
                alert('Contraseña actualizada con éxito!');
                router.push('/view/iniciarSesion'); // Redirigir a la página de inicio de sesión
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message}`);
            }
        } else {
            setPasswordError('La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas y un número.');
        }
    };

    return (
        <div>
            {step === 1 && (
                <form onSubmit={sendEmail} id="form">
                    <div className="field">
                        <label htmlFor="reply_to">Tu Email</label>
                        <input
                            type="email"
                            name="reply_to"
                            id="reply_to"
                            required
                        />
                    </div>
                    <input type="submit" id="button" value="Send Email" />
                </form>
            )}
            {step === 2 && (
                <form onSubmit={handleVerification}>
                    <div className="field">
                        <label htmlFor="verification_code">Ingresa tu código</label>
                        <input
                            type="text"
                            name="verification_code"
                            id="verification_code"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            required
                        />
                    </div>
                    <input type="submit" value="Verificar Código" />
                </form>
            )}
            {step === 3 && (
                <form onSubmit={handlePasswordChange}>
                    <div className="field">
                        <label htmlFor="new_password">Nueva Contraseña</label>
                        <input
                            type="password"
                            name="new_password"
                            id="new_password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                        {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
                    </div>
                    <input type="submit" value="Cambiar Contraseña" />
                </form>
            )}
        </div>
    );
};

export default Formulario;
