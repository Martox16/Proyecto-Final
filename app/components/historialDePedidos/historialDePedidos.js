'use client';
import React, { useEffect, useState } from 'react';
import styles from './historialDePedidos.module.css';
import { useRouter } from 'next/navigation';

const HistorialDePedidos = () => {
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    const idusuario = typeof window !== "undefined" ? localStorage.getItem('userId') : null;

    const handleClick = () => {
        router.back();
    };

    useEffect(() => {
        if (!idusuario) {
            setError('No se encontró el ID del usuario en localStorage');
            setLoading(false);
            return;
        }

        const fetchPedidos = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/historialPedidos/${idusuario}`);
                if (!response.ok) {
                    throw new Error('Error al obtener el historial de pedidos');
                }
                const data = await response.json();
                setPedidos(data);
            } catch (error) {
                setError('Error al cargar el historial de pedidos');
            } finally {
                setLoading(false);
            }
        };

        fetchPedidos();
    }, [idusuario]);

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <a className={styles.botonFlecha} onClick={handleClick}>
                <img src="/flechaAtras.png" className={styles.fotoFlecha} alt="Flecha" />
            </a>
            <h1 className={styles.name}>Historial de pedidos</h1>
            {pedidos.length > 0 ? (
                <div className={styles.pedidosList}>
                    {pedidos.map((pedido) => (
                        <div key={pedido.id} className={styles.pedidoItem}>
                            <p><strong>Fecha:</strong> {pedido.fecha}</p>
                            <p><strong>Productos:</strong> {pedido.productos.map((producto) => producto.nombre).join(', ')}</p>
                            <p><strong>Total:</strong> ${pedido.total}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No tienes pedidos previos.</p>
            )}
        </div>
    );
};

export default HistorialDePedidos;

/*json y funciona:
'use client';
import React, { useEffect, useState } from 'react';
import styles from './historialDePedidos.module.css';
import { useRouter } from 'next/navigation';

const HistorialDePedidos = () => {
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    const idusuario = typeof window !== "undefined" ? localStorage.getItem('userId') : null;

    const handleClick = () => {
        router.back();
    };

    useEffect(() => {
        if (!idusuario) {
            setError('No se encontró el ID del usuario en localStorage');
            setLoading(false);
            return;
        }

        // Datos de prueba estáticos para el historial de pedidos
        const dataDePrueba = [
            {
                id: 1,
                fecha: "2023-08-12",
                productos: [
                    { nombre: "Camiseta", cantidad: 2, precio: 15.00 },
                    { nombre: "Pantalones", cantidad: 1, precio: 35.00 }
                ],
                total: 65.00
            },
            {
                id: 2,
                fecha: "2023-09-15",
                productos: [
                    { nombre: "Zapatos", cantidad: 1, precio: 50.00 },
                    { nombre: "Gorra", cantidad: 2, precio: 10.00 }
                ],
                total: 70.00
            },
            {
                id: 3,
                fecha: "2023-10-03",
                productos: [
                    { nombre: "Bolso", cantidad: 1, precio: 45.00 }
                ],
                total: 45.00
            },
            {
                id: 4,
                fecha: "2023-11-02",
                productos: [
                    { nombre: "Bufanda", cantidad: 3, precio: 12.00 },
                    { nombre: "Guantes", cantidad: 1, precio: 8.00 }
                ],
                total: 44.00
            },
            {
                id: 5,
                fecha: "2023-12-22",
                productos: [
                    { nombre: "Reloj", cantidad: 1, precio: 150.00 }
                ],
                total: 150.00
            }
        ];

        // Asignar los datos de prueba a `pedidos`
        setPedidos(dataDePrueba);
        setLoading(false);
    }, [idusuario]);

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <a className={styles.botonFlecha} onClick={handleClick}>
                <img src="/flechaAtras.png" className={styles.fotoFlecha} alt="Flecha" />
            </a>
            <h1 className={styles.name}>Historial de pedidos</h1>
            {pedidos.length > 0 ? (
                <div className={styles.pedidosList}>
                    {pedidos.map((pedido) => (
                        <div key={pedido.id} className={styles.pedidoItem}>
                            <p><strong>Fecha:</strong> {pedido.fecha}</p>
                            <p><strong>Productos:</strong> {pedido.productos.map((producto) => producto.nombre).join(', ')}</p>
                            <p><strong>Total:</strong> ${pedido.total}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No tienes pedidos previos.</p>
            )}
        </div>
    );
};

export default HistorialDePedidos;


*/ 