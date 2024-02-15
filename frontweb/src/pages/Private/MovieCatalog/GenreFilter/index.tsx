import { Genre } from 'types/genre';
import { useEffect, useState } from 'react';
import { requestBackend } from 'util/requests';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';

import './styles.css';

export type GenreFilterData = {
  genre: Genre | null;
};

type Props = {
  onSubmitFilter: (data: GenreFilterData) => void;
};

const GenreFilter = ({ onSubmitFilter }: Props) => {
  
  const [selectGenre, setSelectGenre] = useState<Genre[]>([]);

  const { handleSubmit, setValue, getValues, control } =
    useForm<GenreFilterData>();

  const onSubmit = (formData: GenreFilterData) => {
    onSubmitFilter(formData);
  };

  const handleChangeGenre = (value: Genre) => {
    setValue('genre', value);
    const obj: GenreFilterData = {
      genre: getValues('genre'),
    };
    onSubmitFilter(obj);
  };

  useEffect(() => {
    requestBackend({ url: '/genres', withCredentials: true }).then(
      (response) => {
        setSelectGenre(response.data);
      }
    );
  }, []);

  return (
    <div className="genre-filter-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="genre-filter-select">
          <Controller
            name="genre"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={selectGenre}
                placeholder="Genero"
                isClearable
                classNamePrefix='genre-filter-select'
                onChange={(value) => handleChangeGenre(value as Genre)}
                getOptionLabel={(genre: Genre) => genre.name}
                getOptionValue={(genre: Genre) => String(genre.id)}
              />
            )}
          />
        </div>
      </form>
    </div>
  );
};

export default GenreFilter;
