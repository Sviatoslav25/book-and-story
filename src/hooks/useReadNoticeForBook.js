import { gql, useMutation } from '@apollo/client';

const readNoticeForBooksMutation = gql`
  mutation readNoticeForBooks($noticeId: ID!) {
    readNoticeForBooks(noticeId: $noticeId)
  }
`;

const useReadNoticeForBook = (props) => {
  const [readNoticeForBook, rest] = useMutation(readNoticeForBooksMutation, props);
  return [readNoticeForBook, rest];
};

export default useReadNoticeForBook;
