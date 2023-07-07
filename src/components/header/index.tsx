import styles from './header.module.scss';

interface HeaderProps {
  title: string;
  description: string;
  image: string;
  className?: string;
}

export default function Header({
  title,
  description,
  image,
  className = '',
}: HeaderProps) {
  return (
    <header className={`${styles.header} ${className}`}>
      <div className={styles['header-text']}>
        <h1>{title}</h1>
        <h2>{description}</h2>
      </div>
      <div className={styles['header-image']}>
        <img src={image} alt={title} />
      </div>
    </header>
  );
}
