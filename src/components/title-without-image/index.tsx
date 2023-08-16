import styles from './title-without-image.module.scss';

interface TitleWithoutImageProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

export default function TitleWithoutImage({
  title,
  description,
  children,
}: TitleWithoutImageProps): JSX.Element {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <h2 className={styles.description}>{description}</h2>
      <h2>{description}</h2>
      {children}
    </div>
  );
}
