"use client"; 

import React, { useState } from 'react';
import styles from './idioma.module.css';
import { useRouter } from 'next/navigation'; 

const translations = {
    es: { idioma: "Prueba el idioma aquí" },
    en: { idioma: "Try the language here" },
    zh: { idioma: "在这里尝试语言" },
    he: { idioma: "נסה את השפה כאן" },
    fr: { idioma: "Essayez la langue ici" },      
    de: { idioma: "Probieren Sie die Sprache hier" },   
    it: { idioma: "Prova la lingua qui" },      
    pt: { idioma: "Experimente o idioma aqui" },        
    ja: { idioma: "ここで言語を試してください" },        
    ko: { idioma: "여기에서 언어를 시도하십시오" },      
    ru: { idioma: "Попробуйте язык здесь" }, 
    tr: { idioma: "Burada dili deneyin" },
};

function Idioma() {
    const [language, setLanguage] = useState('es'); // Idioma por defecto
    const router = useRouter(); // Inicializa el hook useRouter

    const changeLanguage = (newLanguage) => {
        setLanguage(newLanguage); // Cambia el idioma
    };

    // Función para manejar el clic en la flecha de atrás
    const handleClick = () => {
        router.back(); // Navega hacia atrás
    };

    return (
        <div>
            <a className={styles.botonFlecha} onClick={handleClick}>
                <img src="/flechaAtras.png" className={styles.fotoFlecha} alt="Flecha" />
            </a>
            <h1 className={styles.name}>Cambio de idioma</h1>
            <p className={styles.p}>{translations[language].idioma}</p>
            <div className={styles.divboton}>
            <button  className={styles.boton} onClick={() => changeLanguage('es')}>Español</button>
                <button className={styles.boton}  onClick={() => changeLanguage('en')}>English</button>
                <button className={styles.boton}  onClick={() => changeLanguage('zh')}>中文</button>
                <button className={styles.boton}  onClick={() => changeLanguage('he')}>עברית</button>
                <button className={styles.boton}  onClick={() => changeLanguage('fr')}>Français</button>
                <button className={styles.boton}  onClick={() => changeLanguage('de')}>Deutsch</button>
                <button className={styles.boton}  onClick={() => changeLanguage('it')}>Italiano</button>
                <button className={styles.boton}  onClick={() => changeLanguage('pt')}>Português</button>
                <button className={styles.boton}  onClick={() => changeLanguage('ja')}>日本語</button>
                <button className={styles.boton}  onClick={() => changeLanguage('ko')}>한국어</button>
                <button className={styles.boton}  onClick={() => changeLanguage('ru')}>Русский</button>
                <button className={styles.boton}  onClick={() => changeLanguage('tr')}>Türkçe</button>
            </div>
        </div>
    );
}

export default Idioma;
