import styles from './title-with-image.module.scss';

interface TitleWithImageProps {
  title: string;
  description: string;
  image: string;
  className: string;
  children?: React.ReactNode;
}

export default function TitleWithImage({
  title,
  description,
  image,
  className,
  children,
}: TitleWithImageProps): JSX.Element {
  return (
    <div className={`${className} ${styles.header}`}>
      <div className={styles['header-title']}>
        <h1>{title}</h1>
        <h2>{description}</h2>
        {children}
      </div>
      <div className={styles['header-image']}>
        <img src={image} alt={title} />
      </div>
    </div>
  );
}
