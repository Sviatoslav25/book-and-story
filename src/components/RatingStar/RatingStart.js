import StarRatings from 'react-star-ratings';

export default function RatingStart({ rating }) {
  return (
    <StarRatings
      starDimension="20px"
      starSpacing="5px"
      rating={rating}
      starRatedColor="gold"
      numberOfStars={5}
      name="rating"
    />
  );
}
