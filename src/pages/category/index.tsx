import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { AppDispatch, RootState } from 'store';
import { loadCategory } from 'store/reducers/categories';

import Button from 'components/button';
import Header from 'components/header';
import Item from 'components/item';

import styles from './category.module.scss';

export default function Category() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { categoryName } = useParams();
  const { category, items } = useSelector((state: RootState) => {
    const regexp = new RegExp(state.search, 'i');

    return {
      category: state.categories.find((categ) => categ.id === categoryName),
      items: state.items.filter(
        (item) => item.category === categoryName && item.title.match(regexp)
      ),
    };
  });

  useEffect(() => {
    dispatch(loadCategory(categoryName as string));
  }, [dispatch, categoryName]);

  return (
    <div>
      <Header
        title={category?.name as string}
        description={category?.description as string}
        image={category?.header}
      >
        <Button onClick={() => navigate(`/anuncie/${categoryName}`)}>
          Quero anunicar
        </Button>
      </Header>
      <div className={styles.items}>
        {items.map((item) => (
          <Item key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}
