import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'store';
import { finishPayment, loadPayment } from 'store/reducers/cart';

import Button from 'components/button';
import Header from 'components/header';
import Select from 'components/select';

import { PaymentMethodModel } from 'interfaces/payment-method';

import styles from './payment.module.scss';

export default function Payment(): JSX.Element {
  const [paymentMethod, setPaymentMethod] = useState<
    Partial<PaymentMethodModel>
  >({
    name: '-',
  });
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const total = useSelector((state: RootState) => state.cart.total);
  const rate = paymentMethod.rate ? paymentMethod.rate : 1;
  const totalValue = paymentMethod.name === '-' ? total : total * rate;

  // eslint-disable-next-line consistent-return
  function changePaymentMethod(event: React.ChangeEvent<HTMLSelectElement>) {
    if (event.target.value === '-') return setPaymentMethod({ name: '-' });

    setPaymentMethod(
      user.cards?.find(
        (card) =>
          (card?.id as number) === (event.target.value as unknown as number)
      ) || { name: '' }
    );
  }

  function finish() {
    dispatch(finishPayment({ totalValue, paymentMethod }));
  }

  useEffect(() => {
    dispatch(loadPayment());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <Header title="Pagamento" description={''} />
      <div className={styles.data}>
        <p className={styles.method}>
          Olá {user.name}! Escolhada a forma de pagamento:{' '}
        </p>
        <Select
          value={paymentMethod.id as unknown as string}
          onChange={changePaymentMethod}
          placeholder="Forma de pagamento"
          alt="Forma de pagamento"
        >
          <option value="-">Forma de pagamento</option>
          {user.cards?.map((card) => (
            <option key={card?.id} value={card?.id}>
              {card?.name}
            </option>
          ))}
        </Select>
        <div className={styles.content}>
          {paymentMethod.name !== '-' && (
            <>
              <p>
                A forma de pagamento {paymentMethod.name} tem taxa de{' '}
                {paymentMethod.rate}x
              </p>
              <p>
                O saldo deste cartão é de R${' '}
                {paymentMethod?.balance?.toFixed(2)}
              </p>
            </>
          )}
          <p>Total com taxas: R$ {totalValue.toFixed(2)}</p>
        </div>
        <div className={styles.finish}>
          <Button
            disabled={totalValue === 0 || paymentMethod.name === '-'}
            onClick={finish}
          >
            Finalizar Compra
          </Button>
        </div>
      </div>
    </div>
  );
}
