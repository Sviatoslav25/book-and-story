import { Badge, Container, Nav, Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import useCurrentUser from '../../hooks/useCurrentUser';
import useLogout from '../../hooks/useLogout';
import paths from '../../router/paths';
import AuthManager from '../../services/AuthManager';
import ButtonWithSpinner from '../common/ButtonWithSpinner';
import useNoticeQuantity from '../../hooks/useNoticeQuantity';
import NoticeManager from '../../services/NoticeManager';

export default function AppLayout({ children }) {
  const [user] = useCurrentUser();
  const [logout, { loading: isLoading }] = useLogout({
    onError: (e) => {
      toast.error(e.message);
    },
    onCompleted: () => {
      AuthManager.logout();
    },
  });
  const [noticeQuantity, { refetch: refetchNoticeQuantity }] = useNoticeQuantity();

  useEffect(() => {
    const offSubscribe = NoticeManager.onNoticeQuantityChange(refetchNoticeQuantity);
    return () => {
      offSubscribe();
    };
  });

  const onLogout = () => {
    logout({ variables: { token: AuthManager.getRefreshToken() } });
  };

  return (
    <>
      <Navbar className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <Navbar.Brand as={Link} to={paths.home}>
            Book and story
          </Navbar.Brand>
          <Navbar.Collapse className="collapse navbar-collapse" id="responsive-navbar-nav">
            <Nav className="navbar-nav me-auto">
              <Nav.Link as={Link} to={paths.home}>
                Home
              </Nav.Link>
              <Nav.Link as={Link} to={paths.myBooks}>
                My Books
              </Nav.Link>
              <Nav.Link as={Link} to={paths.myStories}>
                my Stories
              </Nav.Link>
              <Nav.Link as={Link} to={paths.favorite}>
                Favorites
              </Nav.Link>
              <Nav.Link as={Link} to={paths.users}>
                Users
              </Nav.Link>
            </Nav>
            <Nav className="d-flex">
              <Nav.Link as={Link} to={paths.myProfile}>
                {user?.email}
              </Nav.Link>
              <Nav.Link as={Link} to={paths.notices} style={noticeQuantity === 0 ? {} : { color: '#2EE22E' }}>
                <FontAwesomeIcon icon={faExclamationCircle} size="lg" />
                <Badge bg="secondary">{noticeQuantity}</Badge>
              </Nav.Link>
              <ButtonWithSpinner loading={isLoading} variant="outline-secondary" onClick={onLogout}>
                logout
              </ButtonWithSpinner>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
      <Container>{children}</Container>
    </>
  );
}
