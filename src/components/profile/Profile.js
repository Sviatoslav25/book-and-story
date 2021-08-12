import { faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Container, Alert, Row, Col, ListGroupItem, ListGroup, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PROFILE_PHOTO } from '../../constants/settings';
import useFollowersQuantity from '../../hooks/useFollowersQuantity';
import useFollowingQuantity from '../../hooks/useFollowingQuantity';
import paths from '../../router/paths';

export default function Profile({ error, isLoading, profile, isMyProfile }) {
  const [followersQuantity, { loading: isLoadingFollowerQuantity }] = useFollowersQuantity(profile.userId, {
    onError: (e) => {
      toast.error(e.message);
    },
  });
  const [followingQuantity, { loading: isLoadingFollowingQuantity }] = useFollowingQuantity(profile.userId, {
    onError: (e) => {
      toast.error(e.message);
    },
  });
  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">{error.message}</Alert>
      </Container>
    );
  }

  if (isLoading && !profile) {
    return <Container className="mt-4">Loading...</Container>;
  }
  return (
    <Container className="mt-4">
      <>
        <Row>
          <Col lg="3" md="3" sm="4" xs="5">
            <Card bg="dark" text="white">
              <Card.Img
                src={profile.profilePhoto || PROFILE_PHOTO}
                variant="top"
                style={{ maxWidth: 'auto', maxHeight: '400px', borderRadius: '50%' }}
                className="p-4"
              />
              <Card.Body>
                <Card.Title style={{ textAlign: 'center' }}>{profile.nickname || 'none'}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col lg="9" md="9" sm="8" xs="7">
            <Card>
              <Card.Body>
                <Card.Title
                  style={{ fontSize: '25px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
                >
                  <div>
                    {profile.nickname || 'none'}
                    {isLoadingFollowerQuantity ? (
                      <Spinner style={{ marginLeft: '40px' }} animation="border" variant="secondary" />
                    ) : (
                      <span style={{ marginLeft: '40px', fontSize: '20px' }}>{`Followers: ${
                        followersQuantity === null ? '' : followersQuantity
                      }`}</span>
                    )}
                    {isLoadingFollowingQuantity ? (
                      <Spinner style={{ marginLeft: '40px' }} animation="border" variant="secondary" />
                    ) : (
                      <span style={{ marginLeft: '40px', fontSize: '20px' }}>{`Following: ${
                        followingQuantity === null ? '' : followingQuantity
                      }`}</span>
                    )}
                  </div>
                  {isMyProfile && (
                    <Link style={{ cursor: 'pointer' }} to={paths.editProfile}>
                      <FontAwesomeIcon title="Edit profile information" icon={faCog} />
                    </Link>
                  )}
                </Card.Title>
                <ListGroup className="list-group-flush">
                  <ListGroupItem>Full name: {profile.fullName || 'none'}</ListGroupItem>
                  <ListGroupItem>Email: {profile.email || 'none'}</ListGroupItem>
                  <ListGroupItem>Phone number: {profile.phoneNumber || 'none'}</ListGroupItem>
                  <ListGroupItem>About myself: {profile.aboutMyself || 'none'}</ListGroupItem>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </>
    </Container>
  );
}
