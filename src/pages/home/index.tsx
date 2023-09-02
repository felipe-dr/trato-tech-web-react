import instance from 'common/config/api';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import clock from 'assets/initial.png';

import { RootState } from 'store';
import { addCategories } from 'store/reducers/categories';
import { addItems } from 'store/reducers/items';

import Button from 'components/button';
import Header from 'components/header';

import styles from './home.module.scss';

export default function Home() {
  const categories = useSelector((state: RootState) => state.categories);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getCategories = useCallback(async () => {
    const response = await instance.get('/categories');

    dispatch(addCategories(response.data));
  }, [dispatch]);

  const getItems = useCallback(async () => {
    const response = await instance.get('/items');

    dispatch(addItems(response.data));
  }, [dispatch]);

  useEffect(() => {
    getCategories();
    getItems();
  }, [getCategories, getItems]);

  return (
    <div>
      <Header
        title="Classificados Tech"
        description="Compre diversos tipos de produtos no melhor site do Brasil!"
        image={clock}
        className={styles.header}
      >
        <Button onClick={() => navigate('/anuncie')}>Quero anunciar</Button>
      </Header>
      <div className={styles.categories}>
        <div className={styles['categories-title']}>
          <h1>Categorias</h1>
        </div>
        <div className={styles['categories-container']}>
          {categories.map((category, index) => (
            <Link key={index} to={`/categoria/${category.id}`}>
              <img src={category.thumbnail} alt={category.name} />
              <h1>{category.name}</h1>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
