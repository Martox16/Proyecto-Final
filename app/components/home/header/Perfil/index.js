'use client'; // todos los que tienen useState hay que poner arriba esto.
import React from 'react';
import { useRouter } from 'next/navigation';
import './perfil.modules.css';

function Perfil() {
    const router = useRouter();

    const handlePerfilClick = () => {
        router.push('/view/perfil');
    };

    return (
        <a className="botonPerfil" onClick={handlePerfilClick}>
            <img src="/perfil.png" className="fotoPerfil" alt="Perfil" />
        </a>
    );
}

export default Perfil;
