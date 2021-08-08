import React from 'react';
import { Container, Alert } from 'react-bootstrap';
import NoticeCard from '../components/notices/NoticeCard';
import { BOOKS, STORIES } from '../constants/settings';
import useNotice from '../hooks/useNotice';

export default function Notices() {
  const [
    noticesForBooks,
    { loading: isLoadingNoticesForBooks, error: errorForBooks, refetch: refetchNoticeForBooks },
  ] = useNotice(BOOKS);
  const [
    noticesForStories,
    { loading: isLoadingNoticesForStories, error: errorForStories, refetch: refetchNoticeForStories },
  ] = useNotice(STORIES);

  if (errorForBooks || errorForStories) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">{refetchNoticeForBooks?.message || errorForStories?.message}</Alert>
      </Container>
    );
  }

  if (
    (isLoadingNoticesForBooks || isLoadingNoticesForStories) &&
    (!noticesForBooks.length || !noticesForStories.length)
  ) {
    return <Container className="mt-4">Loading...</Container>;
  }

  return (
    <Container className="mt-5">
      {noticesForBooks.map((notice) => {
        return <NoticeCard refetch={refetchNoticeForBooks} notice={notice} key={notice._id} nameItem={BOOKS} />;
      })}
      {noticesForStories.map((notice) => {
        return <NoticeCard refetch={refetchNoticeForStories} notice={notice} key={notice._id} nameItem={STORIES} />;
      })}
    </Container>
  );
}
