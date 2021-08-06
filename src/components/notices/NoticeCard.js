import React from 'react';
import { Card, Col, Image, Row } from 'react-bootstrap';
import { generatePath, Link } from 'react-router-dom';
import paths from '../../router/paths';

export default function NoticeCard({ notice }) {
  return (
    <Row>
      <Col className="mt-3">
        <Link
          title="Read"
          to={generatePath(paths.book, { id: notice.bookId })}
          style={{ color: 'inherit', textDecoration: 'inherit' }}
        >
          <Card>
            <Card.Body style={{ display: 'grid', gridTemplateColumns: '100px 1fr' }}>
              <div>
                <Image
                  src={notice.book.img}
                  alt="Profile photo"
                  roundedCircle
                  style={{
                    maxWidth: '80px',
                    height: 'auto',
                    objectFit: 'cover',
                  }}
                />
              </div>
              <div>
                <Card.Title>
                  <strong>Book name:</strong> {notice.book.name}
                </Card.Title>
                <Card.Text>
                  <strong>Author:</strong> {notice.author.nickname || notice.author.email || 'none'}
                </Card.Text>
              </div>
            </Card.Body>
          </Card>
        </Link>
      </Col>
    </Row>
  );
}
