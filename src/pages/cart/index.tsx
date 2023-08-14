import { UUID } from 'crypto';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'store';
import { resetCart } from 'store/reducers/cart';

import Button from 'components/button';
import Header from 'components/header';
import Item from 'components/item';

import styles from './cart.module.scss';

interface CartItem {
  title: string;
  description: string;
  photo: string;
  favorite?: boolean;
  price: number;
  id: UUID;
  category: string;
  quantity: number;
}

export default function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => {
    const typedArray: CartItem[] = [];
    const regexp = new RegExp(state.search, 'i');
    let total = 0;

    const cartReduce = state.cart.reduce((items, cartItem) => {
      const item = state.items.find(
        (stateItem) => stateItem.id === cartItem.id
      );

      if (item) {
        if (item.title.match(regexp)) {
          items.push({
            ...item,
            quantity: cartItem.quantity,
          });
        }

        total += item.price * cartItem.quantity;
      }

      return items;
    }, typedArray);

    return {
      cartReduce,
      total,
    };
  });

  return (
    <div>
      <Header
        title="Carrinho de compras"
        description="Confira produtos que você adicionou ao carrinho."
      />
      <div className={styles.cart}>
        {cart.cartReduce.map((item) => (
          <Item key={item.id} {...item} cart />
        ))}
        <div className={styles.total}>
          <strong>Resumo da compra</strong>
          <span>
            Subtotal: <strong> R$ {cart.total.toFixed(2)} </strong>
          </span>
        </div>
        <Button type="submit" onClick={() => dispatch(resetCart())}>
          Finalizar compra
        </Button>
      </div>
    </div>
  );
}
