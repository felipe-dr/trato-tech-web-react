import clock from 'assets/initial.png';

import Header from 'components/header';

import styles from './home.module.scss';

export default function Home() {
  return (
    <div>
      <Header
        title="Classificados Tech"
        description="Compre diversos tipos de produtos no melhor site do Brasil!"
        image={clock}
        className={styles.header}
      />
    </div>
  );
}
