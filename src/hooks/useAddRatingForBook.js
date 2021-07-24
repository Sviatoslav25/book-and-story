import { gql, useMutation } from '@apollo/client';

const addRatingForBookMutation = gql`
  mutation addRatingForBook($bookId: ID!, $rating: Int!) {
    addRatingForBook(bookId: $bookId, rating: $rating) {
      _id
    }
  }
`;

const useAddRatingForBook = (props) => {
  const [addRatingForBook, rest] = useMutation(addRatingForBookMutation, props);
  return [addRatingForBook, rest];
};

export default useAddRatingForBook;
