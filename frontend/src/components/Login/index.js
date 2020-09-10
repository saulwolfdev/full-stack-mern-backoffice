import React, { Fragment, useState } from 'react';
import api from '../../services/api';
import { Container, Button, Form, FormGroup, Input } from 'reactstrap';
import './form.css';
const Login = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [errormessage, setErrorMessage] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('result login ok', email, password);

    const response = await api.post('/login', { email, password });
    console.log(response);
    const user_id = response.data.user_id || false;
    const user = response.data.user || false;
    try {
      if (user && user_id) {
        localStorage.setItem('user', user);
        localStorage.setItem('user_id', user_id);
        history.push('/');
        console.log('login OK');
      } else {
        const { message } = response.data;
        setError(true);
        setErrorMessage(message);
        setTimeout(() => {
          setError(false);
          setErrorMessage('');
        }, 2000);
      }
    } catch (error) {
      setError(true);
      setErrorMessage('ERROR the server returned an error=> ', error);
    }
  };
  return (
    <Fragment>
      <Container>
        <h2>Login</h2>
        <p>
          Please <strong>Login</strong> into your account
        </p>
        <Form onSubmit={handleSubmit} className='form'>
          {error ? (
            <div className='event-validation' color='danger'>
              {errormessage}
            </div>
          ) : (
            ''
          )}
          <FormGroup className='form-group'></FormGroup>
          <FormGroup className='mb-2 mr-sm-2 mb-sm-0'>
            <Input
              type='email'
              name='email'
              id='email'
              placeholder='Your email'
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup className='mb-2 mr-sm-2 mb-sm-0'>
            <Input
              type='password'
              name='password'
              id='password'
              placeholder='Your password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Button color='primary'>Login</Button>
            <Button color='secondary' onClick={() => history.push('/register')}>
              Register
            </Button>
          </FormGroup>
        </Form>
      </Container>
    </Fragment>
  );
};

export default Login;
