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
                const response = await fetch(`http://localhost:3000/historialPedidos/${idusuario}`);
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
                    {pedidos.map((pedido, index) => (
                        <div key={index} className={styles.pedidoItem}>
                            <p><strong>Fecha:</strong> {new Date(pedido.fecha_compra).toLocaleDateString()}</p>
                            <p><strong>Producto:</strong> {pedido.item_comprado}</p>
                            <p><strong>Local:</strong> {pedido.nombre_local}</p>
                            <p><strong>Cantidad:</strong> {pedido.cantidad}</p>
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
