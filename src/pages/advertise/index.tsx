import { FieldValues, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import { RootState } from 'store';
import { registerItem } from 'store/reducers/items';

import Button from 'components/button';
import Header from 'components/header';

import { ItemModel } from 'interfaces/item';

import styles from './advertise.module.scss';

export default function Advertise(): JSX.Element {
  const { categoryName = '' } = useParams();
  const { register, formState, handleSubmit } = useForm({
    defaultValues: {
      title: '',
      description: '',
      photo: '',
      category: categoryName,
      price: NaN,
    },
  });
  const { errors } = formState;

  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.categories);

  function registerProduct(data: FieldValues) {
    const values = { ...data, id: uuid() };

    dispatch(registerItem(values as ItemModel));
  }

  return (
    <div className={styles.container}>
      <Header
        title="Anuncie aqui!"
        description="Anuncie seu produto no melhor site do Brasil!"
      />
      <form className={styles.form} onSubmit={handleSubmit(registerProduct)}>
        <input
          className={errors.title ? styles['input-error'] : ''}
          placeholder="Nome do produto"
          alt="Nome do produto"
          {...register('title', { required: 'O campo nome é obrigatório' })}
        />
        {errors.title && (
          <span className={styles['message-error']}>
            {errors.title.message}
          </span>
        )}
        <input
          className={errors.description ? styles['input-error'] : ''}
          placeholder="Descrição do produto"
          alt="Descrição do produto"
          {...register('description', {
            required: 'O campo descrição é obrigatório',
          })}
        />
        {errors.description && (
          <span className={styles['message-error']}>
            {errors.description?.message}
          </span>
        )}
        <input
          className={errors.photo ? styles['input-error'] : ''}
          placeholder="URL da imagem do produto"
          alt="URL da imagem do produto"
          {...register('photo', { required: 'O campo imagem é obrigatório' })}
        />
        {errors.photo && (
          <span className={styles['message-error']}>
            {errors.photo?.message}
          </span>
        )}
        <select
          className={errors.category ? styles['input-error'] : ''}
          {...register('category', {
            required: 'O campo categoria é obrigatório',
          })}
          disabled={!!categoryName}
        >
          <option value="" disabled>
            Selecione a categoria
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.category && (
          <span className={styles['message-error']}>
            {errors.category?.message}
          </span>
        )}
        <input
          className={errors.price ? styles['input-error'] : ''}
          type="number"
          placeholder="Preço do produto"
          {...register('price', {
            required: 'O campo preço é obrigatório',
            valueAsNumber: true,
          })}
        />
        {errors.price && (
          <span className={styles['message-error']}>
            {errors.price?.message}
          </span>
        )}
        <Button type="submit">Cadastrar produto</Button>
      </form>
    </div>
  );
}
