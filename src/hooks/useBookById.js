import { gql, useQuery } from '@apollo/client';
import { getFirstResult } from '../utils/graphql';

const bookQuery = gql`
  query Book($id: ID!) {
    book(id: $id) {
      _id
      name
      description
      img
      otherAuthors
      genre
      pagesQuantity
      isPaid
      price
      bookURL
    }
  }
`;

const useBookById = (bookId, props) => {
  const { loading, data, error, ...rest } = useQuery(bookQuery, {
    variables: { id: bookId },
    fetchPolicy: 'cache-and-network',
    ...props,
  });
  return [getFirstResult(data), { loading, error, ...rest }];
};

export default useBookById;
