import { gql, useMutation } from '@apollo/client';

const addBookMutation = gql`
  mutation createBook($input: BookCreateInput!) {
    createBook(input: $input) {
      _id
    }
  }
`;

const useAddBook = (props) => {
  const [addBook, rest] = useMutation(addBookMutation, props);
  return [addBook, rest];
};

export default useAddBook;
