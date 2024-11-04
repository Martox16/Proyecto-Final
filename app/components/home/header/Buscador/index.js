'use client'; // Asegúrate de que esto esté al principio
import React, { useEffect, useState } from 'react';
import './buscador.modules.css';
import Card from '../../Body-main/Card'; // Asegúrate de que el componente Card esté importado correctamente

const Buscador = () => {
  const [locales, setLocales] = useState([]);
  const [busqueda, setBusqueda] = useState('');
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

  const manejarBusqueda = (event) => {
    const valor = event.target.value;
    setBusqueda(valor);

    // Filtra los locales que coincidan con la búsqueda
    const nuevosResultados = locales.filter((local) => {
      const regex = new RegExp(valor, 'i'); // 'i' hace la búsqueda insensible a mayúsculas
      return regex.test(local.nombrelocal); // Asegúrate de que 'nombrelocal' sea la propiedad correcta
    });

    // Verifica si hay coincidencias exactas
    const coincidenciasExactas = nuevosResultados.filter((local) =>
      local.nombrelocal.toLowerCase() === valor.toLowerCase()
    );

    // Combina coincidencias exactas y las demás (sin duplicados)
    const resultadosFinales = [
      ...coincidenciasExactas,
      ...nuevosResultados.filter(local => !coincidenciasExactas.includes(local)),
    ];
    setResultados(resultadosFinales);
  };

  return (
    <div className="buscador">
      <input
        type="text"
        placeholder="Buscar..."
        className="input-buscador"
        value={busqueda}
        onChange={manejarBusqueda}
      />
      <div className="resultados">
        {error ? (
          <div className="error">{error}</div>
        ) : busqueda.length > 0 && resultados.length > 0 ? ( 
          <>
            <p>Resultado/s encontrado/s</p>
            {resultados.map((local) => (
              <div key={local.id} className="resultado">
                <div className="card" onClick={() => handleCardClick(local.id)}>
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
        ) : busqueda.length > 0 ? (
          <div className="no-resultados">No se encontraron resultados</div>
        ) : null // No mostrar nada si no hay búsqueda
        }
      </div>
    </div>
  );
  
};

export default Buscador;
