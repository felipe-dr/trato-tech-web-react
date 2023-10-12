import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { loadPayment } from 'store/reducers/cart';

import Button from 'components/button';
import Header from 'components/header';
import Select from 'components/select';

import styles from './payment.module.scss';

export default function Payment(): JSX.Element {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadPayment());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <Header title="Pagamento" description={''} />
      <div className={styles.data}>
        <p className={styles.method}>
          Olá usuário! Escolhada a forma de pagamento:{' '}
        </p>
        <Select placeholder="Forma de pagamento" alt="Forma de pagamento">
          <option value="-">Forma de pagamento</option>
        </Select>
        <div className={styles.content}>
          <p>Total com taxas: R$ 0.00</p>
        </div>
        <div className={styles.finish}>
          <Button>Finalizar Compra</Button>
        </div>
      </div>
    </div>
  );
}
