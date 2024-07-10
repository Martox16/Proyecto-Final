import Image from "next/image";
import styles from "./page.module.css";
import Principal from './view/home/page'


export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
      <Principal/>
      </div>
    </main>
  );
}




