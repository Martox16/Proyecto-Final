"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./card.modules.css";

function getRandomSubset(array, size) {
  const shuffled = array.slice().sort(() => 0.5 - Math.random());
  return shuffled.slice(0, size);
}

function Card() {
  const [panaderias, setPanaderias] = useState([]);
  const [confiterias, setConfiterias] = useState([]);
  const [recomendados, setRecomendados] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const apiUrl = "http://localhost:3000/infoTiendas"; // URL de tu API de tiendas
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log("Datos de la API de tiendas:", data); // Verifica los datos que devuelve la API en la consola

        // Filtrar las panaderías y confiterías
        const panaderias = data.filter((tienda) => !tienda.confiteria);
        const confiterias = data.filter((tienda) => tienda.confiteria);

        setPanaderias(getRandomSubset(panaderias, 5));
        setConfiterias(getRandomSubset(confiterias, 5));
      })
      .catch((error) => console.error("Error al obtener datos de la API:", error));

    // Obtener los recomendados
    const apiRecomendadosUrl = "http://localhost:3000/recomendados/1";
    fetch(apiRecomendadosUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log("Datos de Recomendados:", data);
        setRecomendados(getRandomSubset(data, 5));
      })
      .catch((error) => console.error("Error al obtener datos de la API de Recomendados:", error));
  }, []);

  const handleCardClick = (id) => {
    localStorage.setItem('selectedTiendaId', id); // Guardar el ID en el almacenamiento local
    router.push("/view/infoTienda");
  };

  const renderCards = (items) =>
    items.length > 0 ? (
      items.map((tienda) => (
        <div key={tienda.id} className="card" onClick={() => handleCardClick(tienda.id)}>
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
              <h2 className="textCardFooter">{tienda.distancia} KM</h2>
            </div>
            <div className="footerItem">
              <h2 className="textCardFooter">{tienda.precio}$</h2>
            </div>
          </div>
        </div>
      ))
    ) : (
      <p>No se encontraron tiendas.</p>
    );

  return (
    <div className="cardContainer">
      <div className="section">
        <h2>Panaderías</h2>
        <div className="cards">{renderCards(panaderias)}</div>
      </div>
      <div className="section">
        <h2>Confiterías</h2>
        <div className="cards">{renderCards(confiterias)}</div>
      </div>
      <div className="section">
        <h2>Recomendados</h2>
        <div className="cards">{renderCards(recomendados)}</div>
      </div>
    </div>
  );
}

export default Card;
