import React from 'react';

import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import Authentication from '../helpers/Authentication';
import axios from 'axios';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: '' };

    this.submit = this.submit.bind(this);
  }

  submit(userInfo) {
    if (!!userInfo)
      Authentication.executeJwtAuthenticationService(
        userInfo.email,
        userInfo.password
      )
        .then(async response => {
          await Authentication.registerSuccessfulLoginForJwt(
            userInfo.email,
            response.data.token
          );
          await axios
            .get(`http://localhost:8080/api/userinfo`)
            .then(async res => {
              res = res.data;
              sessionStorage.setItem('userInfo', JSON.stringify(res));
              this.props.login();
              if (!!res && !!res.companyName)
                this.props.history.push(`/seller`);
              else this.props.history.push(`/`);
            })
            .catch(err => console.log(err));
        })
        .catch(err => {
          console.log(err);
          this.setState({ error: 'Invalid e-mail or password' });
        });
  }

  componentDidMount() {
    this.props.routeChange('Login');
  }

  render() {
    return (
      <div
        style={{
          backgroundColor: '#182C4A',
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0
        }}
      >
        <div
          className='d-flex justify-content-end'
          style={{ backgroundColor: '#384E6E' }}
        >
          <a style={{ color: '#fff', marginRight: '25px' }} href='/login'>
            Contact us
          </a>
        </div>
        <div className='d-flex justify-content-center'>
          <h1
            style={{ color: '#fff', fontSize: 50, cursor: 'pointer' }}
            onClick={() => this.props.history.push('/')}
          >
            HUMBO
          </h1>
        </div>
        <div
          style={{ backgroundColor: '#F6F3EF' }}
          className='d-flex justify-content-center py-3 px-5'
        >
          <div
            style={{ backgroundColor: '#F2EEEE', width: '85%', minWidth: 700 }}
            className='d-flex justify-content-center py-3 px-3'
          >
            <div
              style={{ backgroundColor: '#fff', width: '45%', minWidth: 300 }}
              className='border mr-3 container py-2'
            >
              <div className='d-flex justify-content-center mb-3'>Log in</div>
              <Formik
                onSubmit={this.submit}
                validate={values => {
                  let errors = {};
                  if (!values.email) {
                    errors.email = 'Required';
                  } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                      values.email
                    )
                  ) {
                    errors.email = '*Invalid email address';
                  }
                  if (values.password.length < 6) {
                    errors.password = 'Minimum 6 characters';
                  }
                  return errors;
                }}
                initialValues={{
                  email: '',
                  password: '',
                  remember: false
                }}
              >
                {({ handleSubmit, handleChange, values, touched, errors }) => (
                  <Form noValidate onSubmit={handleSubmit}>
                    {this.state.error ? (
                      <div style={{ color: '#f55', paddingBottom: 3 }}>
                        {this.state.error}
                      </div>
                    ) : null}
                    <Form.Group>
                      <Form.Control
                        placeholder='E-mail'
                        name='email'
                        value={values.email}
                        onChange={handleChange}
                        isInvalid={touched.email && !!errors.email}
                      />
                      <Form.Control.Feedback type='invalid'>
                        {errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                      <Form.Control
                        placeholder='Password'
                        type='password'
                        name='password'
                        value={values.password}
                        onChange={handleChange}
                        isInvalid={touched.password && !!errors.password}
                      />
                      <Form.Control.Feedback type='invalid'>
                        {errors.password}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Form.Row}>
                      <div className='col'>
                        <Form.Check
                          type='checkbox'
                          name='remember'
                          checked={values.remember}
                          onChange={handleChange}
                          label='Remember me'
                        />
                      </div>
                      <a href='/'>Forgot Password</a>
                    </Form.Group>
                    <div className='d-flex justify-content-center mb-3'>
                      <button type='submit' className='btn btn-success'>
                        Log in
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
            <div
              style={{ backgroundColor: '#fff', width: '45%', minWidth: 300 }}
              className='border ml-3 container'
            >
              <div className='d-flex justify-content-center mb-3 mt-5'>
                <h1>Become a member!</h1>
              </div>
              <div className='d-flex justify-content-around'>
                <button
                  type='button'
                  className='btn btn-primary'
                  onClick={() => this.props.history.push('register/seller')}
                >
                  Sell Stuff
                </button>
                <button
                  type='button'
                  className='btn btn-primary'
                  onClick={() => this.props.history.push('register/customer')}
                >
                  Buy Stuff
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
