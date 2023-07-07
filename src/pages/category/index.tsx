import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { RootState } from 'store';

import Header from 'components/header';

export default function Category() {
  const { categoryName } = useParams();
  const categoryStore = useSelector((state: RootState) =>
    state.categories.find((category) => category.id === categoryName)
  );

  return (
    <div>
      <Header
        title={categoryStore?.name as string}
        description={categoryStore?.description as string}
        image={categoryStore?.header}
      />
    </div>
  );
}
