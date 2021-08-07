import { gql, useQuery } from '@apollo/client';
import { getFirstResult } from '../utils/graphql';

const noticeQuery = gql`
  query noticesAboutBookReleased {
    noticesAboutBookReleased {
      _id
      bookId
      isRead
      book {
        name
        img
      }
      author {
        nickname
        email
      }
    }
  }
`;

const useNotice = () => {
  const { loading, data, error, ...rest } = useQuery(noticeQuery, { fetchPolicy: 'cache-and-network' });
  return [getFirstResult(data) || [], { loading, error, ...rest }];
};

export default useNotice;
