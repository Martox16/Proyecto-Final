'use client'; // Todos los hooks de estado deben estar arriba.

import React, { useState } from 'react';
import styles from './filtro.module.css';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

function Filtro() {
  // Estado para los filtros
  const [estrellas, setEstrellas] = useState(0);
  const [rangoPrecio, setRangoPrecio] = useState('0-299');
  const [distancia, setDistancia] = useState('0-2km');
  const [abierto, setAbierto] = useState(false);

  // Función para aplicar filtros
  const aplicarFiltros = () => {
    // Aquí deberías hacer la lógica para buscar con los filtros aplicados
    console.log('Filtros aplicados:', { estrellas, rangoPrecio, distancia });
    // Puedes realizar la búsqueda y actualizar la lista de elementos que estás mostrando
  };

  return (
    <div>
      <a className={styles.botonFiltro} onClick={() => setAbierto(!abierto)}>
        <AdjustmentsHorizontalIcon style={{ width: 35, height: 'auto' }} />
      </a>

      {abierto && (
        <div className={styles.filtrosMenu}>
          <div>
            <label className={styles.label}>Cantidad de Estrellas:</label>
            <select className={styles.select} value={estrellas} onChange={(e) => setEstrellas(Number(e.target.value))}>
              <option value={0}>Seleccionar</option>
              {[1, 2, 3, 4, 5].map((estrella) => (
                <option key={estrella} value={estrella}>
                  {estrella} Estrella{estrella > 1 ? 's' : ''}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={styles.label}>Rango de Precio:</label>
            <select className={styles.select} value={rangoPrecio} onChange={(e) => setRangoPrecio(e.target.value)}>
              <option value="0-299">$0 a $299</option>
              <option value="300-599">$300 a $599</option>
              <option value="600-999">$600 a $999</option>
              <option value="1000+">$1000 o más</option>
            </select>
          </div>

          <div>
            <label className={styles.label}>Distancia:</label>
            <select className={styles.select} value={distancia} onChange={(e) => setDistancia(e.target.value)}>
              <option value="0-2km">0 a 2 km</option>
              <option value="3-5km">3 km a 5 km</option>
              <option value="6-10km">6 km a 10 km</option>
              <option value="10km+">10 km o más</option>
            </select>
          </div>

          <button className={styles.button}  onClick={aplicarFiltros}>Aplicar Filtros</button>
        </div>
      )}
    </div>
  );
}

export default Filtro;
