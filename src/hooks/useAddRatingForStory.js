import { gql, useMutation } from '@apollo/client';

const addRatingForStoryMutation = gql`
  mutation addRatingForStory($storyId: ID!, $rating: Int!) {
    addRatingForStory(storyId: $storyId, rating: $rating) {
      _id
    }
  }
`;

const useAddRatingForStory = (options) => {
  const [addRatingForStory, rest] = useMutation(addRatingForStoryMutation, options);
  return [addRatingForStory, rest];
};

export default useAddRatingForStory;
