'use client'
import React from 'react';
import './card.modules.css';

function Card() {
    return (
        <div className="card">
        <div className="imageContainer">
            <img src="/don-roberto.png" className="imagenPanaderia" alt="imagen de panaderia Don Roberto"/>
            <h1 className="nameCard">Don Roberto</h1>
        </div>
        <div className="cardFooter">
            <div className="footerItem">
                <img src="/estrella.png" className="estrella" alt="imagen de estrella"/>
                <h2 className="textCardFooter">5</h2>
            </div>
            <div className="footerItem">
                <h2 className="textCardFooter">3,50 KM</h2>
            </div>
            <div className="footerItem">
                <h2 className="textCardFooter">3000$</h2>
            </div>
        </div>
    </div>
    );
}

export default Card;
