import StarRatings from 'react-star-ratings';

export default function ChangeRatingStart({ ChangeRating }) {
  // const [rating, setRating] = useState(0);

  const onChangeRating = (newRating) => {
    ChangeRating(newRating);
  };

  return (
    <StarRatings
      starDimension="25px"
      starSpacing="8px"
      rating={0}
      changeRating={onChangeRating}
      starRatedColor="blue"
      numberOfStars={5}
      name="rating"
    />
  );
}
