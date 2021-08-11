import { gql, useQuery } from '@apollo/client';
import { getFirstResult } from '../utils/graphql';

const userStoriesQuery = gql`
  query userStories($userId: ID!) {
    userStories(userId: $userId) {
      _id
      name
      shortDescription
      rating
    }
  }
`;

const useUserStories = (userId) => {
  const { loading, data, error, ...rest } = useQuery(userStoriesQuery, {
    variables: { userId },
    fetchPolicy: 'cache-and-network',
  });
  return [getFirstResult(data) || [], { loading, error, ...rest }];
};

export default useUserStories;
