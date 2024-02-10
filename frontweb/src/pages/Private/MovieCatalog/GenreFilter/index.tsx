import { Genre } from 'types/genre';
import { useEffect, useState } from 'react';
import { requestBackend } from 'util/requests';

import './styles.css';



const GenreFilter = () => {

    const [genres, setGenre] = useState<Genre[]>([]);


  useEffect(() => {
    requestBackend({ url: '/genres', withCredentials: true }).then(
      (response) => {
        setGenre(response.data);
      }
    );
  }, []);

  return (
    <div className="genre-filter-container">
      <select name="genre" id="genre">
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GenreFilter;
