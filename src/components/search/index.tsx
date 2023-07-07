import styles from './search.module.scss';

export default function Search() {
  return (
    <div className={styles.search}>
      <input className={styles.input} placeholder="O que você procura?" />
    </div>
  );
}