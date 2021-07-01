import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import paths from '../../router/paths';
import AuthManager from '../../services/AuthManager';

export default function AppLayout({ children }) {
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
        </Nav>
        <Button
          variant="outline-secondary"
          onClick={() => {
            AuthManager.logout();
          }}
        >
          logout
        </Button>
      </Navbar>
      <Container>{children}</Container>
    </>
  );
}
