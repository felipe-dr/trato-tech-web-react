import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

import styles from './footer.module.scss';

/**
 * A constante que não desempenha ação de estado, está definida externamente ao
 * componente, afim de evitar a redefinição quando o componente for construído.
 */
const iconProps = {
  color: '#fff',
  size: 24,
};

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        <FaFacebook {...iconProps} />
        <FaTwitter {...iconProps} />
        <FaInstagram {...iconProps} />
      </div>
      <span>Desenvolvido por Alura.</span>
    </footer>
  );
}
