'use client'; // todos los que tienen useState hay que poner arriba esto.
import React from 'react';
import { useRouter } from 'next/navigation';
import './perfil.modules.css';
import { UserCircleIcon } from "@heroicons/react/24/outline";

function Perfil() {
    const router = useRouter();

    const handlePerfilClick = () => {
        router.push('/view/menuBar');
    };

    return (
        <a className="botonPerfil" onClick={handlePerfilClick}>
            <UserCircleIcon/>
        </a>
    );
}

export default Perfil;
