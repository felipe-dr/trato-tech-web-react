import styles from './title-with-image.module.scss';

interface TitleWithImageProps {
  title: string;
  description: string;
  image: string;
  className: string;
}

export default function TitleWithImage({
  title,
  description,
  image,
  className,
}: TitleWithImageProps): JSX.Element {
  return (
    <div className={`${className} ${styles.header}`}>
      <div className={styles['header-title']}>
        <h1>{title}</h1>
        <h2>{description}</h2>
      </div>
      <div className={styles['header-image']}>
        <img src={image} alt={title} />
      </div>
    </div>
  );
}
