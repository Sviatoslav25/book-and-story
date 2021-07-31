import { gql, useMutation } from '@apollo/client';
import { BOOKS } from '../constants/settings';

const removeStoryFromFavoritesMutation = gql`
  mutation removeStoryFromFavorites($storyId: ID!) {
    removeStoryFromFavorites(storyId: $storyId)
  }
`;

const removeBookFromFavoritesMutation = gql`
  mutation removeBookFromFavorites($bookId: ID!) {
    removeBookFromFavorites(bookId: $bookId)
  }
`;

const useRemoveItemFromFavorites = (nameItem, options) => {
  const [removeItem, rest] = useMutation(
    nameItem === BOOKS ? removeBookFromFavoritesMutation : removeStoryFromFavoritesMutation,
    options
  );
  return [removeItem, rest];
};

export default useRemoveItemFromFavorites;
