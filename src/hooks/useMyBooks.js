import { gql, useQuery } from '@apollo/client';
import { getFirstResult } from '../utils/graphql';

const myBooksQuery = gql`
  query myBooks {
    myBooks {
      _id
      name
      description
      img
    }
  }
`;

const useMyBooks = () => {
  const { loading, data, error, ...rest } = useQuery(myBooksQuery, { fetchPolicy: 'cache-and-network' });
  return [getFirstResult(data) || [], { loading, error, ...rest }];
};

export default useMyBooks;
