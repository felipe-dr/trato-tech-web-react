import classNames from 'classnames';
import { RiShoppingCart2Line, RiShoppingCartFill } from 'react-icons/ri';

import { ReactComponent as Logo } from '../../assets/logo.svg';
import styles from './navbar.module.scss';

const iconeProps = {
  color: '#fff',
  size: 24,
};

export default function Navbar(): JSX.Element {
  return (
    <nav className={styles.nav}>
      <Logo className={styles.logo} />
      <div className={styles.links}>
        <div>
          <a
            href="/"
            className={classNames(styles.link, {
              [styles.selected]: window.location.pathname === '/',
            })}
          >
            Página inicial
          </a>
        </div>
      </div>
      <div className={styles.busca}></div>
      <div className={styles.icones}>
        <a href="/carrinho">
          {window.location.pathname === '/carrinho' ? (
            <RiShoppingCartFill {...iconeProps} />
          ) : (
            <RiShoppingCart2Line {...iconeProps} />
          )}
        </a>
      </div>
    </nav>
  );
}
