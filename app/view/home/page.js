
import styles from "./home.module.css";
import Direccion from "../../components/header/Direccion/index.js";
import Carrito from "../../components/header/Carrito/index.js";
import Perfil from "../../components/header/Perfil/index.js";
import Filtro from "../../components/header/Filtro/index.js";
import Buscador from "../../components/header/Buscador/index.js";
import Card from "../../components/Body-main/Card/index.js"; 

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
            <div className="header">
                <div className="header-top">
                  <Perfil />
                  <Direccion />
                  <Carrito />
                </div>
                <div className="header-bottom">
                  <Buscador />
                  <Filtro />
                </div>
              </div>
              <div className="main-content">
                <Card />
              </div>
            </div>
    </main>
  );
}
