import { gql, useQuery } from '@apollo/client';
import { getFirstResult } from '../utils/graphql';

const storyQuery = gql`
  query story($id: ID!) {
    story(id: $id) {
      _id
      name
      shortDescription
      story
      genre
    }
  }
`;

const useStoryById = (storyId, options) => {
  const { loading, data, error, ...rest } = useQuery(storyQuery, {
    variables: { id: storyId },
    fetchPolicy: 'cache-and-network',
    ...options,
  });
  return [getFirstResult(data), { loading, error, ...rest }];
};

export default useStoryById;
