'use client'; // Asegúrate de que esto esté al principio
import React, { useEffect, useState } from 'react';
import '../Buscador/index';
import Card from '../../Body-main/Card';

const Filtro = () => {
  const [locales, setLocales] = useState([]);
  const [filtroEstrellas, setFiltroEstrellas] = useState('');
  const [resultados, setResultados] = useState(null);
  const [error, setError] = useState(null);
  const [mostrarFiltro, setMostrarFiltro] = useState(false);

  const obtenerLocales = async () => {
    try {
      const response = await fetch('http://localhost:3000/infoTiendas');
      if (!response.ok) {
        throw new Error('Error al obtener los locales');
      }
      const data = await response.json();
      setLocales(data);
    } catch (error) {
      console.error('Error al obtener los locales:', error);
      setError(error.message);
    }
  };

  useEffect(() => {
    obtenerLocales();
  }, []);

  const manejarFiltroEstrellas = (event) => {
    const estrellas = event.target.value;
    setFiltroEstrellas(estrellas);
    filtrarResultados(estrellas);
  };

  const filtrarResultados = (estrellas) => {
    const nuevosResultados = locales.filter((local) => {
      const coincideEstrellas = estrellas === '' || local.cantestrellas === parseInt(estrellas);
      return coincideEstrellas;
    });
    setResultados(nuevosResultados);
  };

  const toggleFiltro = (event) => {
    event.stopPropagation(); 
    setMostrarFiltro((prevMostrarFiltro) => !prevMostrarFiltro);
  };

  return (
    <div className="buscador">
      <div className="icono-filtro" onClick={toggleFiltro}>
        <img src="/filtrar.png" alt="Filtrar" className="icono-imagen" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
      </div>

      {mostrarFiltro && (
        <div className="filtro-estrellas">
          <select className="select-filtro" value={filtroEstrellas} onChange={manejarFiltroEstrellas}>
            <option value="">Todas las estrellas</option>
            <option value="1">1 estrella</option>
            <option value="2">2 estrellas</option>
            <option value="3">3 estrellas</option>
            <option value="4">4 estrellas</option>
            <option value="5">5 estrellas</option>
          </select>
        </div>
      )}

      <div className="resultados">
        {error ? (
          <div className="error">{error}</div>
        ) : resultados === null ? (
          <></>
        ) : resultados.length > 0 ? (
          <>
            <p>Resultado/s encontrado/s</p>
            {resultados.map((local) => (
              <div key={local.id} className="resultado">
                <div className="card">
                  <div className="imageContainer">
                    <img src={local.foto} className="imagenPanaderia" alt={`Imagen de ${local.nombrelocal}`} />
                    <h1 className="nameCard">{local.nombrelocal}</h1>
                  </div>
                  <div className="cardFooter">
                    <div className="footerItem">
                      <img src="/estrella.png" className="estrella" alt="Icono de estrella" />
                      <h2 className="textCardFooter">{local.cantestrellas}</h2>
                    </div>
                    <div className="footerItem">
                      <h2 className="textCardFooter">{local.distancia} KM</h2>
                    </div>
                    <div className="footerItem">
                      <h2 className="textCardFooter">{local.precio}$</h2>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="no-resultados">No se encontraron resultados</div>
        )}
      </div>
    </div>
  );
};

export default Filtro;
