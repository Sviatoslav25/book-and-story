import { gql, useMutation } from '@apollo/client';

const addStoriesMutation = gql`
  mutation createStory($input: StoryCreateInput!) {
    createStory(input: $input) {
      _id
    }
  }
`;

const useAddStory = (options) => {
  const [addStory, rest] = useMutation(addStoriesMutation, options);
  return [addStory, rest];
};

export default useAddStory;
