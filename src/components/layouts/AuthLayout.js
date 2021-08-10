import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import paths from '../../router/paths';

export default function AuthLayout({ children }) {
  return (
    <>
      <Navbar className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <Navbar.Brand as={Link} to={paths.home}>
            Book and story
          </Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link as={Link} to={paths.login}>
              Login
            </Nav.Link>
            <Nav.Link as={Link} to={paths.signUp}>
              Sign up
            </Nav.Link>
          </Nav>
        </div>
      </Navbar>
      <Container>{children}</Container>
    </>
  );
}
