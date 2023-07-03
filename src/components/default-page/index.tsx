import { Outlet } from 'react-router-dom';

import Footer from 'components/footer';
import Navbar from 'components/navbar';

import styles from './default-page.module.scss';

export default function DefaultPage() {
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles['container-outlet']}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
