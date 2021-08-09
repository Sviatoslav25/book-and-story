import { gql, useQuery } from '@apollo/client';
import { getFirstResult } from '../utils/graphql';
import { BOOKS } from '../constants/settings';

const noticesAboutBookReleasedQuery = gql`
  query noticesAboutBookReleased {
    noticesAboutBookReleased {
      _id
      bookId
      isRead
      book {
        name
        img
        isPrivate
      }
      author {
        nickname
        email
      }
    }
  }
`;

const noticesAboutStoryReleasedQuery = gql`
  query noticesAboutStoryReleased {
    noticesAboutStoryReleased {
      _id
      storyId
      isRead
      story {
        name
        isPrivate
      }
      author {
        nickname
        email
      }
    }
  }
`;

const useNotice = (nameItem, options) => {
  const { loading, data, error, ...rest } = useQuery(
    nameItem === BOOKS ? noticesAboutBookReleasedQuery : noticesAboutStoryReleasedQuery,
    {
      fetchPolicy: 'cache-and-network',
      ...options,
    }
  );
  return [getFirstResult(data) || [], { loading, error, ...rest }];
};

export default useNotice;
