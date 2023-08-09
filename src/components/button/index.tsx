import styles from './button.module.scss';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  children: React.ReactNode;
}

export default function Button({
  type,
  children,
  onClick,
}: ButtonProps): JSX.Element {
  return (
    <button className={styles.button} type={type} onClick={onClick}>
      {children}
    </button>
  );
}
