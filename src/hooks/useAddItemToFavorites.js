import { gql, useMutation } from '@apollo/client';
import { BOOKS } from '../constants/settings';

const addBookToFavoritesMutation = gql`
  mutation addBookToFavorites($bookId: ID!) {
    addBookToFavorites(bookId: $bookId)
  }
`;

const addStoryToFavoritesMutation = gql`
  mutation addStoryToFavorites($storyId: ID!) {
    addStoryToFavorites(storyId: $storyId)
  }
`;

const useAddItemToFavorites = (nameItem, options) => {
  const [addItemToFavorites, rest] = useMutation(
    nameItem === BOOKS ? addBookToFavoritesMutation : addStoryToFavoritesMutation,
    options
  );
  return [addItemToFavorites, rest];
};

export default useAddItemToFavorites;
