import './styles.css';
import { Link } from 'react-router-dom';
import GenreFilter, { GenreFilterData } from './GenreFilter';
import { useCallback, useEffect, useState } from 'react';
import { Genre } from 'types/genre';
import { requestBackend } from 'util/requests';
import { Movie } from 'types/movie';
import MovieCard from './MovieCard';
import { SpringPage } from 'types/vendor/spring';
import { AxiosRequestConfig } from 'axios';
import Pagination from 'components/Pagination';

type ControlComponents = {
  activePage: number;
};

const MovieCatalog = () => {
  
  const [page, setPage] = useState<SpringPage<Movie>>();

  const [controlComponents, setControlComponents] = useState<ControlComponents>(
    { activePage: 0}
  );

  const getMovies = useCallback(() => {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: '/movies',
      withCredentials: true,
      params: {
        page: controlComponents.activePage,
        size: 3,
      },
    };
    requestBackend(config).then((response) => {
      setPage(response.data);
      console.log(page);
    });
  }, [controlComponents]);

  useEffect(() => {
    getMovies();
  }, [getMovies]);

  const handlePageChange = (pageNumber: number) => {
    setControlComponents({
      activePage: pageNumber
    });
  };

  const handleSubmitFilter = (data: GenreFilterData) => {
    setControlComponents({ activePage: 0});
  };

  return (
    <>
      <div className="movie-catalog-container">
        <div className="movie-catalog-content">
          <h1>Tela de listagem de filmes</h1>

          

          {page?.content.map((movies) => (
            <div key={movies.id} className="movies-container">
              <MovieCard movie={movies} />
            </div>
          ))}

          <Pagination
            pageCount={page ? page.totalPages : 0}
            range={3}
            onChange={handlePageChange}
            forcePage={page?.number}
          />

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
