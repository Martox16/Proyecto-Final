import React, { useState, useEffect } from 'react';
import './card.modules.css';

function Card() {
    const [tiendas, setTiendas] = useState([]);

    useEffect(() => {
        const apiUrl = 'http://localhost:3000/infoTiendas'; // URL de tu API de tiendas
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                console.log('Datos de la API:', data); // Verifica los datos que devuelve la API en la consola
                const randomIndices = getRandomIndices(data.length, 5);
                const randomTiendas = randomIndices.map(index => data[index]);
                setTiendas(randomTiendas); // Establece las tiendas aleatorias obtenidas desde la API
            })
            .catch(error => console.error('Error al obtener datos de la API:', error));
    }, []);

    function getRandomIndices(max, count) {
        const indices = [];
        while (indices.length < count) {
            const randomIndex = Math.floor(Math.random() * max);
            if (!indices.includes(randomIndex)) {
                indices.push(randomIndex);
            }
        }
        return indices;
    }

    return (
        <div className="cardContainer">
            {tiendas.map(tienda => (
                <div key={tienda.id} className="card">
                    <div className="imageContainer">
                        <img src={tienda.foto} className="imagenPanaderia" alt={`Imagen de la tienda ${tienda.nombre}`} />
                        <h1 className="nameCard">{tienda.nombre}</h1>
                    </div>
                    <div className="cardFooter">
                        <div className="footerItem">
                            <img src="/estrella.png" className="estrella" alt="Icono de estrella" />
                            <h2 className="textCardFooter">{tienda.cantestrellas}</h2>
                        </div>
                        <div className="footerItem">
                            <h2 className="textCardFooter">{tienda.distancia} KM</h2> {/* Ajusta según los datos reales */}
                        </div>
                        <div className="footerItem">
                            <h2 className="textCardFooter">{tienda.precio}$</h2> {/* Ajusta según los datos reales */}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Card;
