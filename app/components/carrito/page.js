import { useState } from 'react';
import './carrito.modules.css';
const datosProductos = [
  {
    tienda: 'Don Roberto',
    items: [
      {
        nombre: 'Facturas 1',
        descripcion: 'Items de panadería como facturas',
        precioOriginal: 5000,
        precioEnDescuento: 3000,
        cantidadInicial: 1,
      },
      {
        nombre: 'Facturas 4',
        descripcion: 'Items de panadería como facturas',
        precioOriginal: 10000,
        precioEnDescuento: 5000,
        cantidadInicial: 3,
      },
    ],
  },
  {
    tienda: 'Starbucks',
    items: [
      {
        nombre: 'Facturas 2',
        descripcion: 'Items de panadería como facturas',
        precioOriginal: 12000,
        precioEnDescuento: 6000,
        cantidadInicial: 2,
      },
    ],
  },
];

const carrito = () => {
  const [productos, setProductos] = useState(datosProductos);

  const handleIncremento = (indiceTienda, indiceItem) => {

    const nuevosProductos = [...productos];

    nuevosProductos[indiceTienda].items[indiceItem].cantidadInicial += 1;

    setProductos(nuevosProductos);
  };


  const handleDecremento = (indiceTienda, indiceItem) => {

    const nuevosProductos = [...productos];

    if (nuevosProductos[indiceTienda].items[indiceItem].cantidadInicial > 1) {

      nuevosProductos[indiceTienda].items[indiceItem].cantidadInicial -= 1;

      setProductos(nuevosProductos);
    }
  };


  const calcularSubtotal = () => {

    return productos.reduce((total, tienda) => {
      return total + tienda.items.reduce((subtotalTienda, item) => {
        return subtotalTienda + item.precioDescuento * item.cantidadInicial;
      }, 0);
    }, 0);
  };


  return (
    <div className="carrito">
      <h2>Carrito</h2>

      {productos.map((tienda, indiceTienda) => (
        <div className="tienda" key={indiceTienda}>
          <h3>{tienda.tienda}</h3>

          {tienda.items.map((item, indiceItem) => (
            <div className="producto" key={indiceItem}>
              <img src="/foodsave.png" alt="Food Save" />
              <div className="detalle">
                <p>{item.nombre}</p>
                <p className="descripcion">{item.descripcion}</p>
                <p className="precio">

                  <span className="descuento">${item.precioOriginal}</span> ${item.precioDescuento}
                </p>

                <div className="cantidad">
                  <button className="menos" onClick={() => handleDecremento(indiceTienda, indiceItem)}>-</button>
                  <span>{item.cantidadInicial}</span>
                  <button className="mas" onClick={() => handleIncremento(indiceTienda, indiceItem)}>+</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}

      <div className="subtotal">
        <p>Subtotal: ${calcularSubtotal()}</p>
        <button className="pagar">Ir A Pagar</button>
      </div>
    </div>
  );
};

export default carrito;
