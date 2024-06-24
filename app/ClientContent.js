    'use client'; // Marca este componente como cliente

    import React from 'react';
    import Card from "./components/Body-main/Card/index.js";

    export default function ClientContent() {
    return (
        <div className="body">
        <div className="">
            {/* Renderiza múltiples componentes de Card */}
            {[...Array(3)].map((_, index) => (
            <Card key={index} />
            ))}
        </div>
        </div>
    );
    }
