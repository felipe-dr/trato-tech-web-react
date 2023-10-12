import { forwardRef } from 'react';

import styles from './select.module.scss';

interface SelectProps {
  placeholder: string;
  alt: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  children: React.ReactNode;
}

function Select(
  { value, onChange, children, ...rest }: SelectProps,
  ref: React.ForwardedRef<HTMLSelectElement>
): JSX.Element {
  return (
    <select
      className={styles.select}
      ref={ref}
      value={value}
      onChange={onChange}
      {...rest}
    >
      {children}
    </select>
  );
}

export default forwardRef(Select);
