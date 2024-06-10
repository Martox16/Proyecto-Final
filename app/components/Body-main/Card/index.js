'use client'
import React, { useState } from 'react';
import './card.modules.css';

function card() {
    return (
        <div class="card">
            <img src="/don-roberto.png" class="imagenPanaderia" alt="imagen de panaderia Don Roberto"/>
            <h1 class="nameCard">Don Roberto</h1>
            <div class="cardFooter">
            <div>
            <img src="/estrella.png" className="estrella" alt="imagen de estrella"/>
            <h2 class="textCardFooter">5</h2>
            </div>
            <div><h2 class="textCardFooter">3,50 km</h2></div>
            <div><h2 class="textCardFooter">3000$</h2></div>
            </div>
        </div>
    );
}

export default card;