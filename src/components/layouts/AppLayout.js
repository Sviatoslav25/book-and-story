import { Container, Nav, Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import useCurrentUser from '../../hooks/useCurrentUser';
import useLogout from '../../hooks/useLogout';
import paths from '../../router/paths';
import AuthManager from '../../services/AuthManager';
import ButtonWithSpinner from '../common/ButtonWithSpinner';

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

  const onLogout = () => {
    logout({ variables: { token: AuthManager.getRefreshToken() } });
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand as={Link} to={paths.home}>
          Book and story
        </Navbar.Brand>
        <Nav className="mr-auto">
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
        <Nav>
          <Nav.Link as={Link} to={paths.myProfile} className="mr-2 mt-1">
            {user?.email}
          </Nav.Link>
          <Nav.Link as={Link} to={paths.notices} className="mr-2 mt-1">
            <FontAwesomeIcon icon={faExclamationCircle} />
          </Nav.Link>
          <ButtonWithSpinner loading={isLoading} variant="outline-secondary" onClick={onLogout}>
            logout
          </ButtonWithSpinner>
        </Nav>
      </Navbar>
      <Container>{children}</Container>
    </>
  );
}
