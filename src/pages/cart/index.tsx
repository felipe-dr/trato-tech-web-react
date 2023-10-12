import { UUID } from 'crypto';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { RootState } from 'store';

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
  const navigate = useNavigate();
  const cart = useSelector((state: RootState) => {
    const typedArray: CartItem[] = [];
    const regexp = new RegExp(state.search, 'i');
    const cartReduce = state.cart.data.reduce((items, cartItem) => {
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
      }

      return items;
    }, typedArray);

    return {
      cartReduce,
      total: state.cart.total,
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
        <Button type="submit" onClick={() => navigate('/pagamento')}>
          Finalizar compra
        </Button>
      </div>
    </div>
  );
}
