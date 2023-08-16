import TitleWithImage from 'components/title-with-image';
import TitleWithoutImage from 'components/title-without-image';

import styles from './header.module.scss';

interface HeaderProps {
  title: string;
  description: string;
  image?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function Header({
  title,
  description,
  image,
  className = '',
  children,
}: HeaderProps) {
  return (
    <header className={`${styles.header}`}>
      {title && !image && (
        <TitleWithoutImage title={title} description={description}>
          {children}
        </TitleWithoutImage>
      )}
      {title && image && (
        <TitleWithImage
          title={title}
          description={description}
          image={image}
          className={className}
        >
          {children}
        </TitleWithImage>
      )}
    </header>
  );
}
