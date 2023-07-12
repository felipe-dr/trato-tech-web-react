import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { RootState } from 'store';

import Header from 'components/header';
import Item from 'components/item';

import styles from './category.module.scss';

export default function Category() {
  const { categoryName } = useParams();
  const { category, items } = useSelector((state: RootState) => ({
    category: state.categories.find((categ) => categ.id === categoryName),
    items: state.items.filter((item) => item.category === categoryName),
  }));

  return (
    <div>
      <Header
        title={category?.name as string}
        description={category?.description as string}
        image={category?.header}
      />
      <div className={styles.items}>
        {items.map((item) => (
          <Item key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}
