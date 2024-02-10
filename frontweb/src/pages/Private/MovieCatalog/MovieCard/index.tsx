import { Movie } from 'types/movie';
import './styles.css';

type Props = {
  movie: Movie;
};

const MovieCard = ({ movie }: Props) => {
  return (
    <div className="movie-card-container">
      <img src={movie.imgUrl} alt={movie.title} />
      <h1>{movie.title}</h1>
      <span>{movie.year}</span>
      <p>{movie.subTitle}</p>
    </div>
  );
};

export default MovieCard;
