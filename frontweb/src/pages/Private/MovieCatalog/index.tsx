import './styles.css';
import { Link } from 'react-router-dom';
import GenreFilter, { GenreFilterData } from './GenreFilter';
import { useCallback, useEffect, useState } from 'react';
import { requestBackend } from 'util/requests';
import { Movie } from 'types/movie';
import MovieCard from './MovieCard';
import { SpringPage } from 'types/vendor/spring';
import { AxiosRequestConfig } from 'axios';
import Pagination from 'components/Pagination';

type ControlComponents = {
  activePage: number;
  genreFilterData: GenreFilterData;
};

const MovieCatalog = () => {
  const [page, setPage] = useState<SpringPage<Movie>>();

  const [controlComponents, setControlComponents] = useState<ControlComponents>(
    { activePage: 0, genreFilterData: { genre: null } }
  );

  const handlePageChange = (pageNumber: number) => {
    setControlComponents({
      activePage: pageNumber,
      genreFilterData: controlComponents.genreFilterData,
    });
  };

  const handleSubmitFilter = (data: GenreFilterData) => {
    setControlComponents({ activePage: 0, genreFilterData: data });
  };

  const getMovies = useCallback(() => {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: '/movies',
      withCredentials: true,
      params: {
        page: controlComponents.activePage,
        size: 4,
        genreId: controlComponents.genreFilterData.genre?.id,
      },
    };
    requestBackend(config).then((response) => {
      setPage(response.data);
    });
  }, [controlComponents]);

  useEffect(() => {
    getMovies();
  }, [getMovies]);

  return (
    <>
      <div className="container my-4 movie-catalog-container">
        <GenreFilter onSubmitFilter={handleSubmitFilter} />

        <div className="row movie-catalog-content">
          {page?.content.map((movies) => (
            <div
              key={movies.id}
              className="col-sm-6 col-lg-6 col-xl-3 movies-container"
            >
              <Link to={`/movies/${movies.id}`}>
                <MovieCard movie={movies} />
              </Link>
            </div>
          ))}

          <Pagination
            pageCount={page ? page.totalPages : 0}
            range={3}
            onChange={handlePageChange}
            forcePage={page?.number}
          />
        </div>
      </div>
    </>
  );
};

export default MovieCatalog;
