// components/infoTienda/paquete/index.js
import React, { useEffect, useState } from 'react';

const Paquete = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [idLocal, setIdLocal] = useState(null);

  useEffect(() => {
    const selectedTiendaId = localStorage.getItem('selectedTiendaId');
    if (selectedTiendaId) {
      setIdLocal(selectedTiendaId);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (idLocal) {
        try {
          const response = await fetch(`http://localhost:3000/productos/${idLocal}`);
          if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Failed to fetch data: ${response.status} - ${errorMessage}`);
          }
          const result = await response.json();
          setData(result);
        } catch (err) {
          console.error('Fetch error:', err);
          setError(err.message);
        }
      }
    };

    fetchData();
  }, [idLocal]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Paquete</h2>
      <ul>
        {data.map(item => (
          <li key={item.id}>
            {item.nombre}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Paquete;
