import styles from './title-without-image.module.scss';

interface TitleWithoutImageProps {
  title: string;
  description: string;
}

export default function TitleWithoutImage({
  title,
  description,
}: TitleWithoutImageProps): JSX.Element {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <h2 className={styles.description}>{description}</h2>
    </div>
  );
}
