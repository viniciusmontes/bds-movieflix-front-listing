import { Review } from 'util/review';
import  StarImage from 'assets/images/star.png'
import './styles.css';

type Props = {
  review: Review[];
};

const ReviewListing = ({ review }: Props) => {
  return (
    <div className="base-card review-card">
      {review.map((review) => (
        <div key={review.id}>
          <h1>
            {' '}
            <img src={StarImage} alt="" />
            {review.user.name}
          </h1>
          <div className="review-card-top-container" key={review.id}>
            <p>{review.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewListing;
