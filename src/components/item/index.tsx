import { UUID } from 'crypto';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { FaCartPlus } from 'react-icons/fa';
import { useDispatch } from 'react-redux';

import { AppDispatch } from 'store';
import { changeFavorite } from 'store/reducers/items';

import styles from './item.module.scss';

interface ItemProps {
  id: UUID;
  title: string;
  description: string;
  photo: string;
  price: number;
  favorite: boolean;
}

const iconProps = {
  size: 24,
  color: '#041833',
};

export default function Item(props: ItemProps) {
  const { id, title, description, photo, price, favorite } = props;
  const dispatch = useDispatch<AppDispatch>();

  function solveFavorite() {
    dispatch(changeFavorite(id));
  }

  return (
    <div className={styles.item}>
      <div className={styles['item-image']}>
        <img src={photo} alt={title} />
      </div>
      <div className={styles['item-description']}>
        <div className={styles['item-title']}>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <div className={styles['item-info']}>
          <div className={styles['item-price']}>R$ {price.toFixed(2)}</div>
          <div className={styles['item-actions']}>
            {favorite ? (
              <AiFillHeart
                className={styles['item-action']}
                {...iconProps}
                color="#ff0000"
                onClick={solveFavorite}
              />
            ) : (
              <AiOutlineHeart
                className={styles['item-action']}
                {...iconProps}
                onClick={solveFavorite}
              />
            )}
            <FaCartPlus
              className={styles['item-action']}
              {...iconProps}
              color={false ? '#1875e8' : iconProps.color}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
