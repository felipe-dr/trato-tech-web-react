import classNames from 'classnames';
import { UUID } from 'crypto';
import {
  AiFillHeart,
  AiFillMinusCircle,
  AiFillPlusCircle,
  AiOutlineHeart,
} from 'react-icons/ai';
import { FaCartPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from 'store';
import { changeCart, changeQuantity } from 'store/reducers/cart';
import { changeFavorite } from 'store/reducers/items';

import styles from './item.module.scss';

interface ItemProps {
  id: UUID;
  title: string;
  description: string;
  photo: string;
  price: number;
  favorite: boolean;
  cart?: boolean;
  quantity?: number;
}

const iconProps = {
  size: 24,
  color: '#041833',
};

const quantityProps = {
  size: 32,
  color: '#1875E8',
};

export default function Item(props: ItemProps) {
  const {
    id,
    title,
    description,
    photo,
    price,
    favorite,
    cart,
    quantity = 0,
  } = props;
  const dispatch = useDispatch<AppDispatch>();
  const hasInCart = useSelector((state: RootState) =>
    state.cart.some((cartItem) => cartItem.id === id)
  );

  function solveFavorite() {
    dispatch(changeFavorite(id));
  }

  function solveCart() {
    dispatch(changeCart(id));
  }

  return (
    <div className={classNames(styles.item, { [styles['item-cart']]: cart })}>
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
            {cart ? (
              <div className={styles['item-cart__quantity']}>
                Quantidade:
                <AiFillMinusCircle
                  onClick={() => {
                    if (quantity >= 1) {
                      dispatch(changeQuantity({ id, quantity: -1 }));
                    }
                  }}
                  {...quantityProps}
                />
                <span>{String(quantity || 0).padStart(2, '0')}</span>
                <AiFillPlusCircle
                  onClick={() => dispatch(changeQuantity({ id, quantity: +1 }))}
                  {...quantityProps}
                />
              </div>
            ) : (
              <FaCartPlus
                className={styles['item-action']}
                {...iconProps}
                color={hasInCart ? '#1875e8' : iconProps.color}
                onClick={solveCart}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
