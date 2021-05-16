import { useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import paths from '../router/paths';
import AuthManager from '../services/AuthManager';
import { EmailValidator, PasswordValidator } from '../utils/validators/Validator';

export default function SingUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [isValidatedEmail, setIsValidatedEmail] = useState(true);
  const [isValidatedPassword, setIsValidatedPassword] = useState(true);
  const [isRepeatPasswordEqualPassword, setIsRepeatPasswordEqualPassword] = useState(true);

  const onChangeEmail = (e) => {
    if (!isValidatedEmail) {
      setIsValidatedEmail(EmailValidator(e.target.value));
    }
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    if (!isValidatedPassword) {
      setIsValidatedPassword(PasswordValidator(e.target.value));
    }
    setPassword(e.target.value);
  };

  const onChangeRepeatPassword = (e) => {
    if (!isRepeatPasswordEqualPassword) {
      setIsRepeatPasswordEqualPassword(password === e.target.value);
    }
    setRepeatPassword(e.target.value);
  };

  const isValidEmail = (e) => {
    setIsValidatedEmail(EmailValidator(e.target.value));
  };

  const isValidPassword = (e) => {
    setIsValidatedPassword(PasswordValidator(e.target.value));
  };

  const checkRepeatPassword = (e) => {
    setIsRepeatPasswordEqualPassword(password === e.target.value);
  };

  const Submit = () => {
    AuthManager.login();
  };

  return (
    <Row className="mt-5">
      <Col lg={{ span: 6, offset: 3 }} md={{ span: 8, offset: 2 }} sm={{ span: 8 }}>
        <Card>
          <Card.Body>
            <Link to={paths.signUp} className="float-right">
              <Button variant="outline-primary">Sing up</Button>
            </Link>
            <Form onSubmit={Submit}>
              <Card.Title>Sign up</Card.Title>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  style={isValidatedEmail ? {} : { border: '3px solid red' }}
                  value={email}
                  onChange={onChangeEmail}
                  onBlur={isValidEmail}
                  type="email"
                  placeholder="Enter email"
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  style={isValidatedPassword ? {} : { border: '3px solid red' }}
                  value={password}
                  onChange={onChangePassword}
                  onBlur={isValidPassword}
                  type="password"
                  placeholder="Password"
                />
              </Form.Group>
              <Form.Group controlId="formRepeatPassword">
                <Form.Label>Repeat Password</Form.Label>
                <Form.Control
                  style={isRepeatPasswordEqualPassword ? {} : { border: '3px solid red' }}
                  value={repeatPassword}
                  onChange={onChangeRepeatPassword}
                  onBlur={checkRepeatPassword}
                  type="password"
                  placeholder="Repeat Password"
                />
              </Form.Group>
              <Button
                disabled={
                  !isValidatedEmail ||
                  !isValidatedPassword ||
                  !email ||
                  !password ||
                  !repeatPassword ||
                  !isRepeatPasswordEqualPassword ||
                  false
                }
                variant="primary"
                type="submit"
                block
              >
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
