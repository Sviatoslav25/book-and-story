import { gql, useMutation } from '@apollo/client';

const updateStoryMutation = gql`
  mutation updateStory($storyId: ID!, $input: StoryUpdateInput!) {
    updateStory(storyId: $storyId, input: $input) {
      _id
    }
  }
`;

const useUpdateStory = (options) => {
  const [updateStory, rest] = useMutation(updateStoryMutation, options);
  return [updateStory, rest];
};

export default useUpdateStory;
