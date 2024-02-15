import { Movie } from 'types/movie';
import './styles.css';

type Props = {
  movie: Movie;
};

const MovieCard = ({ movie }: Props) => {
  return (
    <div className="movie-card-container">
      <div className="movie-card-image-container">
        <img src={movie.imgUrl} alt={movie.title} />
      </div>
      <div className="movie-card-content-container">
        <h1>{movie.title}</h1>
        <span>{movie.year}</span>
        <p>{movie.subTitle}</p>
      </div>
    </div>
  );
};

export default MovieCard;
