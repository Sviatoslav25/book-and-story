import React from 'react';
import { Container, Alert } from 'react-bootstrap';
import NoticeCard from '../components/notices/NoticeCard';
import useNotice from '../hooks/useNotice';

export default function Notices() {
  const [notices, { loading: isLoading, error, refetch }] = useNotice();

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">{error.message}</Alert>
      </Container>
    );
  }

  if (isLoading && !notices) {
    return <Container className="mt-4">Loading...</Container>;
  }

  return (
    <Container className="mt-5">
      {notices.map((notice) => {
        return <NoticeCard refetch={refetch} notice={notice} key={notice._id} />;
      })}
    </Container>
  );
}
