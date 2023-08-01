import classNames from 'classnames';
import { RiShoppingCart2Line, RiShoppingCartFill } from 'react-icons/ri';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { ReactComponent as Logo } from 'assets/logo.svg';

import Search from 'components/search';

import styles from './navbar.module.scss';

const iconeProps = {
  color: '#fff',
  size: 24,
};

export default function Navbar(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className={styles.nav}>
      <Logo className={styles.logo} onClick={() => navigate('/')} />
      <div className={styles.links}>
        <div>
          <Link
            to="/"
            className={classNames(styles.link, {
              [styles.selected]: location.pathname === '/',
            })}
          >
            Página inicial
          </Link>
        </div>
      </div>
      <div className={styles.search}>
        <Search />
      </div>
      <div className={styles.icons}>
        <Link to="/carrinho">
          {location.pathname === '/carrinho' ? (
            <RiShoppingCartFill {...iconeProps} />
          ) : (
            <RiShoppingCart2Line {...iconeProps} />
          )}
        </Link>
      </div>
    </nav>
  );
}
