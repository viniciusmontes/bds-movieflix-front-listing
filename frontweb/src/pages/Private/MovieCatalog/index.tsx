import './styles.css';
import { Link } from 'react-router-dom';
import GenreFilter from './GenreFilter';
import { useEffect, useState } from 'react';
import { Genre } from 'types/genre';
import { requestBackend } from 'util/requests';
import { Movie } from 'types/movie';
import MovieCard from './MovieCard';
import { SpringPage } from 'types/vendor/spring';

const MovieCatalog = () => {

  const [page, setPage] = useState<SpringPage<Movie>>();

  

  useEffect(() => {
    requestBackend({
      url: '/movies',
      withCredentials: true,
      params: { page: 0, size: 12 },
    }).then((response) => {
      setPage(response.data);
    });
  }, []);

  return (
    <>
      <div className="movie-catalog-container">
        <div className="movie-catalog-content">
          <h1>Tela de listagem de filmes</h1>
          <GenreFilter />

          {page?.content.map((movies) => (
            <div key={movies.id} className="movies-container">
              <MovieCard movie={movies} />
            </div>
          ))}

          <Link to="/movies/1">
            Acessar /movies/1<br></br>
          </Link>
          <Link to="/movies/2">Acessar /movies/2</Link>
        </div>
      </div>
    </>
  );
};

export default MovieCatalog;
