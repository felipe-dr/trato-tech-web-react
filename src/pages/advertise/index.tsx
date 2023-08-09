import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { RootState } from 'store';

import Button from 'components/button';
import Header from 'components/header';

import styles from './advertise.module.scss';

interface Categories {
  name: string;
  id: string;
}

export default function Advertise(): JSX.Element {
  const categories: Categories[] = [];
  const { register, handleSubmit } = useForm();

  useSelector((state: RootState) =>
    state.categories.map(({ name, id }) => categories.push({ name, id }))
  );

  function registerProduct() {}

  return (
    <div className={styles.container}>
      <Header
        title="Anuncie aqui!"
        description="Anuncie seu produto no melhor site do Brasil!"
      />
      <form className={styles.form} onSubmit={handleSubmit(registerProduct)}>
        <input
          placeholder="Nome do produto"
          alt="Nome do produto"
          {...register('name')}
        />
        <input
          placeholder="Descrição do produto"
          alt="Descrição do produto"
          {...register('description')}
        />
        <input
          placeholder="URL da imagem do produto"
          alt="URL da imagem do produto"
          {...register('image')}
        />
        <select {...register('category')}>
          <option value="" disabled>
            Selecione a categoria
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Preço do produto"
          {...register('price')}
        />
        <Button type="submit">Cadastrar produto</Button>
      </form>
    </div>
  );
}
