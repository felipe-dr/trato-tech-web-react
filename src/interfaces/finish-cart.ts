import { PaymentMethodModel } from './payment-method';

export interface FinishCartModel {
  totalValue: number;
  paymentMethod: Partial<PaymentMethodModel>;
}
