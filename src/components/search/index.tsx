import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { RootState } from 'store';
import { changeSearch, resetSearch } from 'store/reducers/search';

import styles from './search.module.scss';

export default function Search() {
  const search = useSelector((state: RootState) => state.search);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(resetSearch());
  }, [dispatch, location.pathname]);

  return (
    <div className={styles.search}>
      <input
        className={styles.input}
        placeholder="O que você procura?"
        value={search}
        onChange={(event) => dispatch(changeSearch(event.target.value))}
      />
    </div>
  );
}
