import { ChangeEventHandler, forwardRef } from 'react';

import styles from './input.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export function Input(
  { value, onChange, ...rest }: InputProps,
  ref: React.ForwardedRef<HTMLInputElement>
): JSX.Element {
  return (
    <input
      className={styles.input}
      ref={ref}
      value={value}
      onChange={onChange}
      {...rest}
    />
  );
}

export default forwardRef(Input);
