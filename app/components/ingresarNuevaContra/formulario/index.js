"use client"; // Asegúrate de usar esto en componentes que usan hooks
import React from 'react';
import emailjs from 'emailjs-com';

const Formulario = () => {
    const sendEmail = (e) => {
        e.preventDefault();

        const btn = document.getElementById('button');
        btn.value = 'Sending...';

        // Generar un código aleatorio de 4 dígitos
        const code = Math.floor(1000 + Math.random() * 9000).toString();

        const serviceID = 'service_7ug75l3'; // Tu Service ID
        const templateID = 'template_dnwfcud'; // Tu Template ID
        const userID = 'enlZDClIHncmv_Ghu'; // Tu Public Key

        // Obtener el email ingresado
        const emailToSend = e.target.reply_to.value; // Email ingresado

        // Crear un objeto de parámetros para enviar a EmailJS
        const templateParams = {
            reply_to: emailToSend, // Establecer el email que ingresó el usuario
            message: code, // El código generado
        };

        emailjs.send(serviceID, templateID, templateParams, userID)
            .then(() => {
                btn.value = 'Send Email';
                alert('Correo enviado! Tu código es: ' + code);
            }, (err) => {
                btn.value = 'Send Email';
                alert('Error al enviar: ' + JSON.stringify(err));
            });
    };

    return (
        <form onSubmit={sendEmail} id="form">
            <div className="field">
                <label htmlFor="reply_to">Tu Email</label>
                <input type="email" name="reply_to" id="reply_to" required />
            </div>

            <input type="submit" id="button" value="Send Email" />
        </form>
    );
};

export default Formulario;
