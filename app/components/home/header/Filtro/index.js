'use client'; // Asegúrate de que esto esté al principio
import React, { useEffect, useState } from 'react';
import '../Buscador/index'; 
import Card from '../../Body-main/Card'; // Asegúrate de que el componente Card esté importado correctamente

const Filtro = () => {
  const [locales, setLocales] = useState([]);
  const [filtroEstrellas, setFiltroEstrellas] = useState('');
  const [resultados, setResultados] = useState([]);
  const [error, setError] = useState(null);

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

    // Filtra los locales por estrellas
    const nuevosResultados = locales.filter((local) => {
      const coincideEstrellas = estrellas === '' || local.cantestrellas === parseInt(estrellas);
      return coincideEstrellas;
    });

    setResultados(nuevosResultados);
  };

  return (
    <div className="buscador">
      <input
        type="number"
        placeholder="N Estrellas"
        className="input-buscador"
        value={filtroEstrellas}
        onChange={manejarFiltroEstrellas}
        min="1"
        max="5"
      />
      <div className="resultados">
        {error ? (
          <div className="error">{error}</div>
        ) : filtroEstrellas.length > 0 && resultados.length > 0 ? (
          <>
            <p>Resultado/s encontrado/s</p>
            {resultados.map((local) => (
              <div key={local.id} className="resultado">
                <div className="card">
                  <div className="imageContainer">
                    <img
                      src={local.foto}
                      className="imagenPanaderia"
                      alt={`Imagen de ${local.nombrelocal}`}
                    />
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
        ) : filtroEstrellas.length > 0 ? (
          <div className="no-resultados">No se encontraron resultados</div>
        ) : null}
      </div>
    </div>
  );
};

export default Filtro;
