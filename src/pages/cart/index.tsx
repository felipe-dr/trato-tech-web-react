import { UUID } from 'crypto';
import { useSelector } from 'react-redux';

import { RootState } from 'store';

import Header from 'components/header';
import Item from 'components/item';

import styles from './cart.module.scss';

interface CartItem {
  title: string;
  description: string;
  photo: string;
  favorite: boolean;
  price: number;
  id: UUID;
  category: string;
  quantity: number;
}

export default function Cart() {
  const cart = useSelector((state: RootState) => {
    const typedArray: CartItem[] = [];

    const cartReduce = state.cart.reduce((items, cartItem) => {
      const item = state.items.find(
        (stateItem) => stateItem.id === cartItem.id
      );

      if (item) {
        items.push({
          ...item,
          quantity: cartItem.quantity,
        });
      }

      return items;
    }, typedArray);

    return cartReduce;
  });

  return (
    <div>
      <Header
        title="Carrinho de compras"
        description="Confira produtos que você adicionou ao carrinho."
      />
      <div className={styles.cart}>
        {cart.map((item) => (
          <Item key={item.id} {...item} cart />
        ))}
        <div className={styles.total}>
          <strong>Resumo da compra</strong>
          <span>
            Subtotal: <strong> R$ {(0.0).toFixed(2)} </strong>
          </span>
        </div>
      </div>
    </div>
  );
}
