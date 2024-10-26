"use client";
import React, { useState, useRef } from 'react';
import emailjs from 'emailjs-com';
import { useRouter } from 'next/navigation';
import styles from './Formulario.module.css'; // Importa el CSS modular

const Formulario = () => {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [verificationCode, setVerificationCode] = useState(['', '', '', '']); // Arreglo para 4 caracteres
    const [generatedCode, setGeneratedCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [emailToChange, setEmailToChange] = useState('');

    const inputRefs = useRef([]); // Referencias para los inputs de verificación

    const sendEmail = (e) => {
        e.preventDefault();
        const btn = document.getElementById('button');
        btn.value = 'Sending...';

        const code = Math.floor(1000 + Math.random() * 9000).toString();
        setGeneratedCode(code);

        const serviceID = 'service_7ug75l3';
        const templateID = 'template_dnwfcud';
        const userID = 'enlZDClIHncmv_Ghu';

        const emailInput = e.target.reply_to.value;
        setEmailToChange(emailInput);

        const templateParams = {
            reply_to: emailInput,
            message: code,
        };

        emailjs.send(serviceID, templateID, templateParams, userID)
            .then(() => {
                btn.value = 'Send Email';
                setStep(2); // Avanzar al paso de verificación
            }, (err) => {
                btn.value = 'Send Email';
                alert('Error al enviar: ' + JSON.stringify(err));
            });
    };

    const handleVerification = (e) => {
        e.preventDefault();
        const code = verificationCode.join('');
        if (code === generatedCode) {
            setStep(3);
        } else {
            alert('Código incorrecto, intenta de nuevo.');
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();

        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

        if (regex.test(newPassword)) {
            const response = await fetch('http://localhost:3000/actualizarPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    mail: emailToChange,
                    password: newPassword,
                }),
            });

            if (response.ok) {
                alert('Contraseña actualizada con éxito!');
                router.push('/view/iniciarSesion');
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message}`);
            }
        } else {
            setPasswordError('La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas y un número.');
        }
    };

    const handleChangeVerificationCode = (index, value) => {
        // Validar que solo se permita un dígito
        if (/^\d$/.test(value) || value === '') {
            const newCode = [...verificationCode];
            newCode[index] = value.slice(-1); // Asegurarse de que solo se tome un carácter
            setVerificationCode(newCode);

            // Mover el foco al siguiente input si hay un valor ingresado
            if (value && index < 3) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handleKeyDown = (index, e) => {
        // Manejar el evento de retroceso y de entrada de números
        if (e.key === 'Backspace') {
            // Si el cuadro actual está vacío, mover al anterior
            if (verificationCode[index] === '') {
                if (index > 0) {
                    inputRefs.current[index - 1].focus();
                }
            } else {
                // Permitir que se borre el número actual
                handleChangeVerificationCode(index, '');
            }
        }
    };

    return (
        <div className={styles.formulario}>
            {step === 1 && (
                <form onSubmit={sendEmail} id="form">
                    <div className={styles.field}>
                        <label htmlFor="reply_to">Tu Email</label>
                        <input
                            type="email"
                            name="reply_to"
                            id="reply_to"
                            required
                        />
                    </div>
                    <input type="submit" id="button" value="Enviar código" />
                </form>
            )}
            {step === 2 && (
                <form onSubmit={handleVerification}>
                    <label htmlFor="verification_code">Ingresa tu código de verificación</label>
                    <div className={styles.password}>
                        {verificationCode.map((code, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength="1"
                                ref={el => inputRefs.current[index] = el} // Asignar referencia
                                value={code}
                                onChange={(e) => handleChangeVerificationCode(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)} // Manejar tecla de retroceso
                                required
                                onFocus={(e) => e.target.select()} // Seleccionar el texto al enfocar
                            />
                        ))}
                    </div>
                    <input type="submit" value="Verificar Código" className={styles.verifyButton} />
                </form>
            )}
            {step === 3 && (
                <form onSubmit={handlePasswordChange}>
                    <div className={styles.field}>
                        <label htmlFor="new_password">Nueva Contraseña</label>
                        <input
                            type="password"
                            name="new_password"
                            id="new_password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                        {passwordError && <p className={styles.errorMessage}>{passwordError}</p>}
                    </div>
                    <input type="submit" value="Cambiar Contraseña" />
                </form>
            )}
        </div>
    );
};

export default Formulario;
