import ReviewForm from 'components/ReviewForm';
import ReviewListing from 'components/ReviewListing';
import { useParams } from 'react-router';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import { useEffect, useState } from 'react';
import { Review } from 'util/review';
import { hasAnyRoles } from 'util/auth';
import { Movie } from 'types/movie';

import './styles.css';



type urlParams = {
  movieId: string;
};

const MovieDetails = () => {
  const { movieId } = useParams<urlParams>();

  const [movie, setMovie] = useState<Movie>();

  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    requestBackend({ url: `/movies/${movieId}`, withCredentials: true }).then(
      (response) => {
        setMovie(response.data);
      }
    );
  }, [movieId]);

  useEffect(() => {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: `/movies/${movieId}/reviews`,
      withCredentials: true,
    };
    requestBackend(config).then((response) => {
      setReviews(response.data);
    });
  }, [movieId]);

  const handleInsertReview = (review: Review) => {
    const clone = [...reviews];
    clone.push(review);
    setReviews(clone);
  };

  return (
    <div className="container movie-details-container">
      <div className="base-card movie-card-details-container">
        <div className="movie-card-details-image-container">
          <img src={movie?.imgUrl} alt={movie?.title} />
        </div>
        <div className="movie-card-details-content-container">
          <h1>{movie?.title}</h1>
          <span>{movie?.year}</span>
          <p>{movie?.subTitle}</p>
          <div className="movie-card-details-synopsis">
            <p>{movie?.synopsis}</p>
          </div>
        </div>
      </div>

      {hasAnyRoles(['ROLE_MEMBER']) && (
        <ReviewForm movieId={movieId} onInsertReview={handleInsertReview} />
      )}

      <ReviewListing review={reviews} />
    </div>
  );
};

export default MovieDetails;
