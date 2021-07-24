import { gql, useMutation } from '@apollo/client';
import { BOOKS } from '../constants/settings';

const deleteStoryMutation = gql`
  mutation deleteStory($storyId: ID!) {
    deleteStory(storyId: $storyId)
  }
`;

const deleteBookMutation = gql`
  mutation deleteBook($bookId: ID!) {
    deleteBook(bookId: $bookId)
  }
`;

const useDeleteItem = (nameItem, options) => {
  const [deleteItem, rest] = useMutation(nameItem === BOOKS ? deleteBookMutation : deleteStoryMutation, options);
  return [deleteItem, rest];
};

export default useDeleteItem;
