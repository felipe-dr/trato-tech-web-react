import classNames from 'classnames';
import { memo, useState } from 'react';
import {
  AiFillCloseCircle,
  AiFillEdit,
  AiFillHeart,
  AiFillMinusCircle,
  AiFillPlusCircle,
  AiOutlineCheck,
  AiOutlineHeart,
} from 'react-icons/ai';
import { FaCartPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from 'store';
import { changeCart, changeQuantity } from 'store/reducers/cart';
import { changeFavorite, changeItem, deleteItem } from 'store/reducers/items';

// eslint-disable-next-line import/no-named-as-default
import Input from 'components/input';

import { ItemModel } from 'interfaces/item';

import styles from './item.module.scss';

type ItemProps = ItemModel;

const iconProps = {
  size: 24,
  color: '#041833',
};

const quantityProps = {
  size: 32,
  color: '#1875E8',
};

function Item(props: ItemProps) {
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
  const [editionMode, setEditMode] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>(title);
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

  const editModeComponent = (
    <>
      {editionMode ? (
        <AiOutlineCheck
          className={styles['item-action']}
          {...iconProps}
          onClick={() => {
            setEditMode(false);
            dispatch(changeItem({ id, item: { title: newTitle } }));
          }}
        />
      ) : (
        <AiFillEdit
          className={styles['item-action']}
          {...iconProps}
          onClick={() => setEditMode(true)}
        />
      )}
    </>
  );

  return (
    <div className={classNames(styles.item, { [styles['item-cart']]: cart })}>
      <AiFillCloseCircle
        className={`${styles['item-action']} ${styles['item-delete']}`}
        {...iconProps}
        onClick={() => dispatch(deleteItem(id))}
      />
      <div className={styles['item-image']}>
        <img src={photo} alt={title} />
      </div>
      <div className={styles['item-description']}>
        <div className={styles['item-title']}>
          {editionMode ? (
            <Input
              value={newTitle}
              onChange={(event) => setNewTitle(event.target.value)}
            />
          ) : (
            <h2>{title}</h2>
          )}
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
              <>
                <FaCartPlus
                  className={styles['item-action']}
                  {...iconProps}
                  color={hasInCart ? '#1875e8' : iconProps.color}
                  onClick={solveCart}
                />
                {editModeComponent}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Item);
