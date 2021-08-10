import React, { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import paths from '../../router/paths';
import { EmailValidator, PasswordValidator } from '../../utils/validators/Validator';
import ButtonWithSpinner from '../common/ButtonWithSpinner';

export default function AuthForm({ Submit, isLoginForm, isLoading }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValidatedEmail, setIsValidatedEmail] = useState(true);
  const [isValidatedPassword, setIsValidatedPassword] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isConfirmPasswordEqualPassword, setIsConfirmPasswordEqualPassword] = useState(true);
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

  const isValidEmail = (e) => {
    setIsValidatedEmail(EmailValidator(e.target.value));
  };

  const isValidPassword = (e) => {
    setIsValidatedPassword(PasswordValidator(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLoginForm) {
      if (password !== confirmPassword) {
        toast.error('Password and confirm password should match');
        return;
      }
    }
    Submit({ email, password });
  };

  const onChangeConfirmPassword = (e) => {
    if (!isConfirmPasswordEqualPassword) {
      setIsConfirmPasswordEqualPassword(password === e.target.value);
    }
    setConfirmPassword(e.target.value);
  };

  const checkConfirmPassword = (e) => {
    setIsConfirmPasswordEqualPassword(password === e.target.value);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Card.Title>
        {isLoginForm ? 'Sign in' : 'Sing up'}
        <Link to={isLoginForm ? paths.signUp : paths.login} style={{ float: 'right' }}>
          <Button variant="outline-info">{isLoginForm ? 'Sign up' : 'Sign in'}</Button>
        </Link>
      </Card.Title>
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
      {!isLoginForm ? (
        <Form.Group controlId="formRepeatPassword">
          <Form.Label>Repeat Password</Form.Label>
          <Form.Control
            style={isConfirmPasswordEqualPassword ? {} : { border: '3px solid red' }}
            value={confirmPassword}
            onChange={onChangeConfirmPassword}
            onBlur={checkConfirmPassword}
            type="password"
            placeholder="Repeat Password"
          />
        </Form.Group>
      ) : null}
      <ButtonWithSpinner
        className="mt-2"
        loading={isLoading}
        disabled={!isValidatedEmail || !isValidatedPassword || !email || !password || isLoading || false}
        variant="primary"
        type="submit"
        block
      >
        {isLoginForm ? 'Login' : 'Sign up'}
      </ButtonWithSpinner>
    </Form>
  );
}
