import { gql, useMutation } from '@apollo/client';

const updateBookMutation = gql`
  mutation updateBook($bookId: ID!, $input: BookUpdateInput!) {
    updateBook(bookId: $bookId, input: $input) {
      _id
    }
  }
`;

const useUpdateBook = (options) => {
  const [updateBook, rest] = useMutation(updateBookMutation, options);
  return [updateBook, rest];
};

export default useUpdateBook;
